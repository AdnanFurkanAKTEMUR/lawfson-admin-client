"use client";

import { GET_COMPANY_ADDRESS, UPDATE_COMPANY_ADDRESS } from "@/app/_apolloConfig/graphqlResolvers/companyResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Button, message, Card } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type companyAddressType = {
  id: string;
  address: string;
  country: string;
  city: string;
  district: string;
  postalCode: string;
  phone: string;
};

function UpdateCompanyAddressComp({ addressId }: { addressId: string }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const { data: getCompanyAddressData, loading: getCompanyAddressLoading, error: getCompanyAddressError } = useQuery(GET_COMPANY_ADDRESS);

  const [updateCompanyAddress, { loading: updateCompanyAddressLoading }] = useMutation(UPDATE_COMPANY_ADDRESS);

  const addressData: companyAddressType = getCompanyAddressData?.getCompanyAddress;

  useEffect(() => {
    if (addressData) {
      form.setFieldsValue(addressData);
    }
  }, [addressData, form]);

  const onFinish = async (values: companyAddressType) => {
    try {
      await updateCompanyAddress({
        variables: {
          input: {
            ...values,
            id: parseInt(addressId),
          },
        },
      });
      message.success("Adres bilgisi güncellendi.");
      router.push("/mycompany");
    } catch (err: any) {
      console.error(err);
      message.error("Güncelleme sırasında bir hata oluştu.");
    }
  };

  if (getCompanyAddressLoading) {
    return <div className="text-center py-10">Yükleniyor...</div>;
  }

  if (getCompanyAddressError) {
    return <div className="text-red-600 py-4">Hata: {getCompanyAddressError.message}</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card
        title="Adres Bilgilerini Güncelle"
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
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item
            name="country"
            label="Ülke"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="city"
            label="Şehir"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="district"
            label="İlçe"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="postalCode"
            label="Posta Kodu"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Telefon"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateCompanyAddressLoading}
            >
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default UpdateCompanyAddressComp;
