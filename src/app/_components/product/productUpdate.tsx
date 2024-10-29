"use client";

import { GETALL_CAT, GETCATEGORYLEAFS } from "@/apolloConfig/graphqlResolvers/categoryResolver";
import { GET_PRODUCT, UPDATE_PRODUCT } from "@/apolloConfig/graphqlResolvers/productResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Select, Button, message, Spin, Row, Col, Checkbox } from "antd";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";

type Category = {
  id: number;
  fullPathName: string;
};

type Product = {
  id: number;
  productName: string;
  category?: {
    id: number;
    categoryName: string;
  };
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
  const { data: cData, error: cError, loading: cLoading } = useQuery(GETCATEGORYLEAFS);

  // Ürünü güncellemek için mutation
  const [updateProductMutation, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(UPDATE_PRODUCT);

  // Ürün verisi yüklendiğinde formu doldur
  useEffect(() => {
    if (pData?.getProduct) {
      form.setFieldsValue({
        productName: pData.getProduct.productName,
        categoryId: pData.getProduct?.category.id,
        image: pData.getProduct?.image,
        widths: pData.getProduct?.widths,
        length: pData.getProduct?.length,
        thickness: pData.getProduct?.thickness,
        color: pData.getProduct?.color,
        origin: pData.getProduct?.origin,
        surfaceTreatment: pData.getProduct?.surfaceTreatment,
        description: pData.getProduct?.description,
        onAd: pData.getProduct?.onAd,
        location: pData.getProduct?.location,
        brand: pData.getProduct?.brand,
      });
    }
    if (pError) {
      message.error("Ürün bilgisi alınırken bir hata oluştu.");
    }
  }, [pData, pError, form]);

  // Güncelleme formunun gönderilmesi
  const onFinish = async (values: any) => {
    try {
      await updateProductMutation({
        variables: {
          input: {
            id: parseInt(productId),
            ...values,
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
    );
  }

  if (pError) {
    return <p className="text-red-500">Ürün bulunamadı!</p>;
  }

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">Ürün Güncelle</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
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
