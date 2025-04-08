"use client";

import { UPDATE_COMPANY } from "@/app/_apolloConfig/graphqlResolvers/companyResolver";
import { useMutation } from "@apollo/client";
import { Form, Input, Button, Select, message, Card } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type CompanyType = {
  companyName: string;
  companyPhone: string;
  companyEmail: string;
  companyTaxNumber: string;
  companyTaxOffice: string;
  companyType: string;
  description: string;
  registrationNumber: string;
  sector: string;
  status: string;
  website: string;
};

function UpdateCompanyComp({ company }: { company: CompanyType }) {
  const [form] = Form.useForm();
  const [updateCompany, { loading }] = useMutation(UPDATE_COMPANY);
  const router = useRouter();
  useEffect(() => {
    if (company) {
      form.setFieldsValue(company);
    }
  }, [company, form]);

  const onFinish = async (values: any) => {
    try {
      await updateCompany({
        variables: {
          input: values,
        },
      })
        .then(() => {
          message.success("Şirket bilgileri başarıyla güncellendi.");
          router.push("/mycompany");
        })
        .catch((err: any) => {
          console.error(err);
          message.error("Güncelleme sırasında bir hata oluştu.");
        });
    } catch (err: any) {
      console.error(err);
      message.error("Güncelleme sırasında bir hata oluştu.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card
        title="Şirket Bilgilerini Güncelle"
        className="rounded-2xl shadow-md"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          {/* Disabled Alanlar */}

          {/* Düzenlenebilir Alanlar */}
          <Form.Item
            label="Vergi Numarası"
            name="companyTaxNumber"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Vergi Dairesi"
            name="companyTaxOffice"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ticaret Sicil No"
            name="registrationNumber"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Şirket Türü"
            name="companyType"
          >
            <Select placeholder="Seçiniz">
              <Select.Option value="Ltd.">Limited</Select.Option>
              <Select.Option value="A.Ş.">Anonim</Select.Option>
              <Select.Option value="Şahıs">Şahıs Şirketi</Select.Option>
              <Select.Option value="Kooperatif">Kooperatif</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Sektör"
            name="sector"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Durum"
            name="status"
          >
            <Select placeholder="Seçiniz">
              <Select.Option value="active">Aktif</Select.Option>
              <Select.Option value="inactive">Pasif</Select.Option>
              <Select.Option value="pending">Beklemede</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Website"
            name="website"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Açıklama"
            name="description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default UpdateCompanyComp;
