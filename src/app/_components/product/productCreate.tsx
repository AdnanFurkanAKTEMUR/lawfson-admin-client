"use client";
import { GETCATEGORYLEAFS } from "@/app/_apolloConfig/graphqlResolvers/categoryResolver";
import { CREATE_PRODUCT } from "@/app/_apolloConfig/graphqlResolvers/productResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Button, Select, Checkbox, message, Row, Col, Upload, InputNumber } from "antd";
import { useState } from "react";
import { LoadingOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import countryData from "./countries.json";
import colorsData from "./colors.json";
const countryDataTyped: Record<string, string[]> = countryData;

const UPLOAD_URL = "https://www.plaportadmin.com/upload/";
const DELETE_URL = "https://www.plaportadmin.com/upload/delete/";
type Product = {
  productName: string;
  categoryId: number;
  images?: string[];
  widths?: string;
  length?: string;
  thickness?: string;
  color?: string;
  origin?: string;
  surfaceTreatment?: string;
  description?: string;
  onAd?: boolean;
  country?: string;
  city?: string;
  brand?: string;
  inStock?: boolean;
  price?: any;
};

function ProductCreateComp() {
  const [form] = Form.useForm();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { data: cData, loading: cLoading } = useQuery(GETCATEGORYLEAFS);
  const [createProductMutate, { loading: cpLoading }] = useMutation(CREATE_PRODUCT);
  const [uploading, setUploading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
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
        setImageUrls((prev) => [...prev, result.url]);
        message.success("Resim başarıyla yüklendi!");
      } else {
        message.error(result.error || "Resim yüklenirken hata oluştu.");
      }
    } catch (error) {
      message.error("Bağlantı hatası, tekrar deneyin.");
    }
    setUploading(false);
  };

  const handleDeleteImage = async (url: string) => {
    const fileName = url.split("/").pop();
    try {
      const response = await fetch(`${DELETE_URL}?fileName=${fileName}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        setImageUrls((prev) => prev.filter((img) => img !== url));
        message.success("Resim başarıyla silindi!");
      } else {
        message.error(result.error || "Resim silinirken hata oluştu.");
      }
    } catch (error) {
      console.log(error);
      message.error("Bağlantı hatası, tekrar deneyin.");
    }
  };

  const onFinish = async (values: Product) => {
    const floatPrice = values.price ? parseFloat(values.price) : null;
    try {
      await createProductMutate({ variables: { input: { ...values, price: floatPrice, images: imageUrls } } });
      message.success("Ürün başarıyla oluşturuldu!");
      form.resetFields();
      setImageUrls([]);
    } catch (error) {
      console.log(error);

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
                label="Fiyat (12.21 şeklinde nokta koyunuz)"
                name="price"
                rules={[{ required: true, message: "Lütfen geçerli bir fiyat girin!" }]}
              >
                <InputNumber
                  min={0}
                  step={0.01}
                  placeholder="Fiyat"
                  style={{ width: "100%" }}
                />
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
                rules={[{ required: false }]}
              >
                <Select placeholder="Renk seç">
                  {colorsData.map((color) => (
                    <Select.Option
                      key={color}
                      value={color}
                    >
                      {color}
                    </Select.Option>
                  ))}
                </Select>
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
                name="inStock"
                valuePropName="checked"
              >
                <Checkbox>Stok var mı?</Checkbox>
              </Form.Item>
              <Form.Item
                label="Ülke"
                name="country"
                rules={[{ required: true, message: "Lütfen ülke seçiniz" }]}
              >
                <Select
                  placeholder="Ülke seç"
                  onChange={setSelectedCountry}
                >
                  {Object.keys(countryData).map((country) => (
                    <Select.Option
                      key={country}
                      value={country}
                    >
                      {country}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Şehir"
                name="city"
                rules={[{ required: true, message: "Lütfen şehir seçiniz" }]}
              >
                <Select
                  placeholder="Şehir seç"
                  disabled={!selectedCountry}
                >
                  {selectedCountry &&
                    countryDataTyped[selectedCountry]?.map((city) => (
                      <Select.Option
                        key={city}
                        value={city}
                      >
                        {city}
                      </Select.Option>
                    ))}
                </Select>
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
                <div className="mt-2 flex flex-wrap gap-2">
                  {imageUrls.map((url) => (
                    <div
                      key={url}
                      className="relative"
                    >
                      <img
                        src={url}
                        alt="Yüklenen Resim"
                        className="w-24 h-24 object-cover border rounded"
                      />
                      <Button
                        type="primary"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteImage(url)}
                        className="absolute top-0 right-0"
                      />
                    </div>
                  ))}
                </div>
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
