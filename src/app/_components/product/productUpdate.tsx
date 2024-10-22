"use client";

import { GETALL_CAT } from "@/apolloConfig/graphqlResolvers/categoryResolver";
import { GET_PRODUCT, UPDATE_PRODUCT } from "@/apolloConfig/graphqlResolvers/productResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Select, Button, message, Spin } from "antd";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";

type Category = {
  id: number;
  categoryName: string;
};

type Product = {
  id: number;
  productName: string;
  category: {
    id: number;
    categoryName: string;
  };
};

function ProductUpdateComp({ productId }: { productId: string }) {
  const [form] = Form.useForm();

  // Ürün verisini almak için query
  const {
    data: pData,
    error: pError,
    loading: pLoading,
  } = useQuery(GET_PRODUCT, {
    variables: { input: { id: parseInt(productId) } },
  });

  // Kategori listesini almak için query
  const { data: cData, error: cError, loading: cLoading } = useQuery(GETALL_CAT);

  // Ürünü güncellemek için mutation
  const [updateProductMutation, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(UPDATE_PRODUCT);

  // Ürün verisi yüklendiğinde formu doldur
  useEffect(() => {
    if (pData?.getProduct) {
      form.setFieldsValue({
        productName: pData.getProduct.productName,
        categoryId: pData.getProduct.category.id,
      });
    }
    if (pError) {
      message.error("Ürün bilgisi alınırken bir hata oluştu.");
    }
  }, [pData, pError, form]);

  // Güncelleme formunun gönderilmesi
  const onFinish = async (values: { productName: string; categoryId: number }) => {
    try {
      await updateProductMutation({
        variables: {
          input: {
            id:  parseInt(productId),
            categoryId: values?.categoryId,
            productName: values?.productName,
          },
        },
      });
      message.success("Ürün başarıyla güncellendi!");
    } catch (err) {
      message.error("Ürün güncellenirken bir hata oluştu.");
    }
  };

  if (pLoading || cLoading) {
    return (
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
    );
  }

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">Ürün Güncelle</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
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
          rules={[{ required: true, message: "Lütfen bir kategori seçiniz" }]}
        >
          <Select placeholder="Kategori seç">
            {cData?.categoryGetAll.map((category: Category) => (
              <Select.Option
                key={category.id}
                value={category.id}
              >
                {category.categoryName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={updateLoading}
          >
            Güncelle
          </Button>
        </Form.Item>
      </Form>

      {updateError && <p className="text-red-500">Güncelleme sırasında bir hata oluştu.</p>}
    </div>
  );
}

export default ProductUpdateComp;
