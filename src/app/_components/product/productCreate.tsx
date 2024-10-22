"use client";
import { GETALL_CAT } from "@/apolloConfig/graphqlResolvers/categoryResolver";
import { CREATE_PRODUCT } from "@/apolloConfig/graphqlResolvers/productResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Button, Select, message } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

type product = {
  productName: string;
  categoryId: number;
};

function ProductCreateComp() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<{ id: number; categoryName: string }[]>([]);

  const { data: cData, error: cError, loading: cLoading } = useQuery(GETALL_CAT);
  const [createProductMutate, { data: cpData, error: cpError, loading: cpLoading }] = useMutation(CREATE_PRODUCT);

  useEffect(() => {
    if (cData && cData.categoryGetAll) {
      setCategories(cData.categoryGetAll);
    }
    if (cError) {
      message.error("Kategoriler yüklenirken bir hata oluştu.");
    }
  }, [cData, cError]);

  const onFinish = async (values: product) => {
    try {
      await createProductMutate({ variables: { input: values } });
      message.success("Ürün başarıyla oluşturuldu!");
      form.resetFields();
    } catch (error) {
      message.error("Ürün oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6">Ürün Oluşturma Formu</h1>

      {cLoading ? (
        <div className="flex justify-center items-center">
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 24 }}
                spin
              />
            }
          />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            label="Ürün Adı"
            name="productName"
            rules={[{ required: true, message: "Lütfen ürün adını giriniz" }]}
          >
            <Input placeholder="Ürün adı" />
          </Form.Item>

          <Form.Item
            label="Kategori"
            name="categoryId"
            rules={[{ required: true, message: "Lütfen kategori seçiniz" }]}
          >
            <Select placeholder="Kategori seç">
              {categories.map((cat) => (
                <Select.Option
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.categoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={cpLoading}
            >
              Ürün Oluştur
            </Button>
          </Form.Item>
        </Form>
      )}

      {cpError && <p className="text-red-500 mt-4">Ürün oluşturulurken bir hata oluştu.</p>}
    </div>
  );
}

export default ProductCreateComp;
