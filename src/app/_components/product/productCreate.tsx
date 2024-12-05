"use client";
import { GETALL_CAT, GETCATEGORYLEAFS } from "@/app/_apolloConfig/graphqlResolvers/categoryResolver";
import { CREATE_PRODUCT } from "@/app/_apolloConfig/graphqlResolvers/productResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Button, Select, Checkbox, message, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

type product = {
  productName: string;
  categoryId: number;
  image?: string;
  widths?: string;
  length?: string;
  thickness?: string;
  color?: string;
  origin?: string;
  surfaceTreatment?: string;
  description?: string;
  onAd?: boolean;
  location?: string;
  brand?: string;
};

function ProductCreateComp() {
  const [form] = Form.useForm();

  const { data: cData, error: cError, loading: cLoading } = useQuery(GETCATEGORYLEAFS);
  const [createProductMutate, { data: cpData, error: cpError, loading: cpLoading }] = useMutation(CREATE_PRODUCT);

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
        <div className="flex justify-center">
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
          <Row gutter={16}>
            {/* Sol taraf */}
            <Col
              xs={24}
              md={12}
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
                <Select
                  showSearch
                  placeholder="Kategori seç"
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
                >
                  {cData?.categoryLeafs.map((cat: any) => (
                    <Select.Option
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.fullPathName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Marka"
                name="brand"
              >
                <Input placeholder="Marka" />
              </Form.Item>

              <Form.Item
                label="Genişlik"
                name="widths"
              >
                <Input placeholder="Genişlik" />
              </Form.Item>

              <Form.Item
                label="Uzunluk"
                name="length"
              >
                <Input placeholder="Uzunluk" />
              </Form.Item>

              <Form.Item
                label="Kalınlık"
                name="thickness"
              >
                <Input placeholder="Kalınlık" />
              </Form.Item>

              <Form.Item
                label="Renk"
                name="color"
              >
                <Input placeholder="Renk" />
              </Form.Item>
            </Col>

            {/* Sağ taraf */}
            <Col
              xs={24}
              md={12}
            >
              <Form.Item
                label="Menşei"
                name="origin"
              >
                <Input placeholder="Menşei" />
              </Form.Item>

              <Form.Item
                label="Yüzey İşlemi"
                name="surfaceTreatment"
              >
                <Input placeholder="Yüzey İşlemi" />
              </Form.Item>

              <Form.Item
                label="Açıklama"
                name="description"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Açıklama"
                />
              </Form.Item>

              <Form.Item
                name="onAd"
                valuePropName="checked"
              >
                <Checkbox>İlana Koy</Checkbox>
              </Form.Item>

              <Form.Item
                label="Konum"
                name="location"
              >
                <Input placeholder="Konum" />
              </Form.Item>

              <Form.Item
                label="Görsel URL"
                name="image"
              >
                <Input placeholder="Görsel URL" />
              </Form.Item>
            </Col>
          </Row>

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
