"use client";

import { GETCATEGORYLEAFS } from "@/app/_apolloConfig/graphqlResolvers/categoryResolver";
import { GET_PRODUCT, UPDATE_PRODUCT } from "@/app/_apolloConfig/graphqlResolvers/productResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Select, Button, message, Spin, Row, Col, Checkbox, Upload } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import countryData from "./countries.json";
import colorsData from "./colors.json";

const countryDataTyped: Record<string, string[]> = countryData;
const UPLOAD_URL = "https://www.adnanfurkanaktemur.com.tr/upload/";
const DELETE_URL = "https://www.adnanfurkanaktemur.com.tr/upload/delete/";

function ProductUpdateComp({ productId }: { productId: string }) {
  const [form] = Form.useForm();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const router = useRouter();
  const {
    data: pData,
    loading: pLoading,
    error: pError,
  } = useQuery(GET_PRODUCT, {
    variables: { input: { id: parseInt(productId) } },
  });
  const {
    data: cData,
    loading: cLoading,
    refetch,
  } = useQuery(GETCATEGORYLEAFS, {
    fetchPolicy: "network-only", // Sorguyu her seferinde ağdan getirir, cache'i kullanmaz
  });

  const [updateProductMutation, { loading: updateLoading, data: updateData }] = useMutation(UPDATE_PRODUCT);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (pData?.getProduct) {
      form.setFieldsValue({ ...pData.getProduct, categoryId: pData.getProduct.category?.id });
      setImageUrls(pData.getProduct.images || []);
    }
  }, [pData, form, updateData]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(UPLOAD_URL, { method: "POST", body: formData });
      const result = await response.json();
      if (response.ok) {
        setImageUrls((prev) => [...prev, result.url]);
        message.success("Resim başarıyla yüklendi!");
      }
    } catch {
      message.error("Bağlantı hatası, tekrar deneyin.");
    }
    setUploading(false);
  };

  const handleDeleteImage = (url: string) => {
    setImageUrls((prev) => prev.filter((img) => img !== url));
    setDeletedImages((prev) => [...prev, url]);
  };

  const onFinish = async (values: any) => {
    try {
      await updateProductMutation({
        variables: { input: { id: parseInt(productId), ...values, images: imageUrls } },
      });

      // Sunucudan silme işlemi güncelleme esnasında yapılır
      for (const url of deletedImages) {
        const fileName = url.split("/").pop();
        await fetch(`${DELETE_URL}?fileName=${fileName}`, { method: "DELETE" });
      }

      message.success("Ürün başarıyla güncellendi!");
      setDeletedImages([]); // Güncelleme sonrası silinenleri sıfırla
      await refetch();
    } catch (err) {
      console.log(err);
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

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-4">Ürün Güncelle</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col
            xs={24}
            md={12}
          >
            <Form.Item
              label="Ürün Adı"
              name="productName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Kategori"
              name="categoryId"
              rules={[{ required: true }]}
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
              <Input />
            </Form.Item>
            <Form.Item
              label="Genişlik"
              name="widths"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Uzunluk"
              name="length"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Kalınlık"
              name="thickness"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Renk"
              name="color"
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
              <Input />
            </Form.Item>
            <Form.Item
              label="Yüzey İşlemi"
              name="surfaceTreatment"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Açıklama"
              name="description"
            >
              <Input.TextArea rows={4} />
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
            loading={updateLoading}
          >
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProductUpdateComp;
