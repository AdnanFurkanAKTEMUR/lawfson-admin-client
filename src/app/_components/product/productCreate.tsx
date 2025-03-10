"use client";
import { GETCATEGORYLEAFS } from "@/app/_apolloConfig/graphqlResolvers/categoryResolver";
import { CREATE_PRODUCT } from "@/app/_apolloConfig/graphqlResolvers/productResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Button, Select, Checkbox, message, Row, Col, Upload } from "antd";
import { useState } from "react";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const UPLOAD_URL = "https://www.adnanfurkanaktemur.com.tr/upload/";

type Product = {
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { data: cData, loading: cLoading } = useQuery(GETCATEGORYLEAFS);
  const [createProductMutate, { loading: cpLoading }] = useMutation(CREATE_PRODUCT);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setImageUrl(result.url);
        message.success("Resim başarıyla yüklendi!");
      } else {
        message.error(result.error || "Resim yüklenirken hata oluştu.");
      }
    } catch (error) {
      message.error("Bağlantı hatası, tekrar deneyin.");
    }
    setUploading(false);
  };

  const onFinish = async (values: Product) => {
    try {
      await createProductMutate({ variables: { input: { ...values, image: imageUrl } } });
      message.success("Ürün başarıyla oluşturuldu!");
      form.resetFields();
      setImageUrl(null);
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

              <Form.Item label="Resim Yükle">
                <Upload
                  beforeUpload={(file) => {
                    handleUpload(file);
                    return false;
                  }}
                  showUploadList={false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    loading={uploading}
                  >
                    Resim Seç
                  </Button>
                </Upload>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Yüklenen Resim"
                    className="mt-2 max-w-xs"
                  />
                )}
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
    </div>
  );
}

export default ProductCreateComp;
