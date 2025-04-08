"use client";

import { CREATE_COMPANY_ADDRESS } from "@/app/_apolloConfig/graphqlResolvers/companyResolver";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, message, Card } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

type inputType = {
  address: string;
  city: string;
  country: string;
  district: string;
  phone: string;
  postalCode: string;
};

function CreateCompanyAddressComp() {
  const [form] = Form.useForm();
  const [createCompanyAddress, { loading }] = useMutation(CREATE_COMPANY_ADDRESS);
  const router = useRouter();
  const onFinish = async (values: inputType) => {
    try {
      await createCompanyAddress({
        variables: {
          input: values,
        },
      }).then(() => {
        message.success("Adres başarıyla eklendi.");
        form.resetFields();
        router.push("/mycompany");
      });
    } catch (err: any) {
      console.error(err);
      message.error("Adres eklenirken bir hata oluştu.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card
        title="Yeni Adres Ekle"
        className="rounded-2xl shadow-md"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="address"
            label="Adres"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              rows={2}
              placeholder="Açık adres bilgisi"
            />
          </Form.Item>

          <Form.Item
            name="country"
            label="Ülke"
            rules={[{ required: true }]}
          >
            <Input placeholder="Türkiye" />
          </Form.Item>

          <Form.Item
            name="city"
            label="Şehir"
            rules={[{ required: true }]}
          >
            <Input placeholder="İstanbul" />
          </Form.Item>

          <Form.Item
            name="district"
            label="İlçe"
            rules={[{ required: true }]}
          >
            <Input placeholder="Kadıköy" />
          </Form.Item>

          <Form.Item
            name="postalCode"
            label="Posta Kodu"
            rules={[{ required: true }]}
          >
            <Input placeholder="34000" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Telefon"
            rules={[{ required: true }]}
          >
            <Input placeholder="+90 555 555 55 55" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Adresi Ekle
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default CreateCompanyAddressComp;
