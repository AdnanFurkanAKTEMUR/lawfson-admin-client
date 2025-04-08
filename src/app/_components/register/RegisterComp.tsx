"use client";

import { CREATE_COMPANY } from "@/app/_apolloConfig/graphqlResolvers/companyResolver";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, Alert, Card, Select } from "antd";
import React, { useState } from "react";

const { TextArea } = Input;

function RegisterComp() {
  const [form] = Form.useForm();
  const [createCompany, { data: createCompanyData, loading: createCompanyLoading, error: createCompanyError }] = useMutation(CREATE_COMPANY);

  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values: any) => {
    try {
      await createCompany({
        variables: {
          input: {
            ...values,
          },
        },
      });
      console.log(values);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const company = createCompanyData?.createCompany;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      {!submitted ? (
        <Card
          title="Register Company"
          className="shadow-md rounded-2xl"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="companyName"
                label="Company Name"
                rules={[{ required: true, message: "Please enter the company name" }]}
              >
                <Input placeholder="Acme Ltd." />
              </Form.Item>

              <Form.Item
                name="companyEmail"
                label="Company Email"
                rules={[{ required: true, message: "Please enter the company email", type: "email" }]}
              >
                <Input placeholder="company@example.com" />
              </Form.Item>

              <Form.Item
                name="companyPhone"
                label="Company Phone"
                rules={[{ required: true, message: "Please enter the company phone" }]}
              >
                <Input placeholder="+90 532 000 0000" />
              </Form.Item>

              <Form.Item
                name="companyTaxNumber"
                label="Tax Number"
              >
                <Input placeholder="Vergi numarası" />
              </Form.Item>

              <Form.Item
                name="companyTaxOffice"
                label="Tax Office"
              >
                <Input placeholder="Vergi dairesi" />
              </Form.Item>

              <Form.Item
                name="registrationNumber"
                label="Registration Number"
              >
                <Input placeholder="Ticaret Sicil Numarası" />
              </Form.Item>

              <Form.Item
                name="companyType"
                label="Company Type"
              >
                <Select placeholder="Şirket Türü">
                  <Select.Option value="Ltd.">Limited Şirket</Select.Option>
                  <Select.Option value="A.Ş.">Anonim Şirket</Select.Option>
                  <Select.Option value="Şahıs">Şahıs Şirketi</Select.Option>
                  <Select.Option value="Kooperatif">Kooperatif</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="sector"
                label="Sector"
              >
                <Input placeholder="Örn: Yazılım, İnşaat, Finans" />
              </Form.Item>

              <Form.Item
                name="website"
                label="Website"
              >
                <Input placeholder="https://firma.com" />
              </Form.Item>

              <Form.Item
                name="status"
                label="Status"
              >
                <Select placeholder="Durum">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name="description"
              label="Description"
            >
              <TextArea
                placeholder="Firma hakkında kısa açıklama..."
                rows={4}
              />
            </Form.Item>

            {createCompanyError && (
              <Alert
                message="Error"
                description={createCompanyError.message}
                type="error"
                showIcon
                className="mb-4"
              />
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={createCompanyLoading}
              >
                Create Company
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ) : (
        <Card
          title="Company Registered"
          className="shadow-md rounded-2xl bg-white"
        >
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold">Company Info</h2>
              <p>
                <strong>ID:</strong> {company.id}
              </p>
              <p>
                <strong>Name:</strong> {company.companyName}
              </p>
              <p>
                <strong>Email:</strong> {company.companyEmail}
              </p>
              <p>
                <strong>Phone:</strong> {company.companyPhone}
              </p>
              <p>
                <strong>Tax No:</strong> {company.companyTaxNumber}
              </p>
              <p>
                <strong>Tax Office:</strong> {company.companyTaxOffice}
              </p>
              <p>
                <strong>Status:</strong> {company.status}
              </p>
              <p>
                <strong>Type:</strong> {company.companyType}
              </p>
              <p>
                <strong>Sector:</strong> {company.sector}
              </p>
              <p>
                <strong>Website:</strong> {company.website}
              </p>
              <p>
                <strong>Desc:</strong> {company.description}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(Number(company.createdAt)).toLocaleString()}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mt-6">Admin Users</h2>
              {company.adminUsers.map((admin: any, index: number) => (
                <div
                  key={index}
                  className="border p-3 rounded-md my-2 bg-gray-50"
                >
                  <p>
                    <strong>Username:</strong> {admin.userName}
                  </p>
                  <p>
                    <strong>Email:</strong> {admin.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {admin.phone}
                  </p>
                  <p>
                    <strong>Role:</strong> {admin.role}
                  </p>
                  <p>
                    <strong>Is Root:</strong> {admin.isRoot ? "Yes" : "No"}
                  </p>
                  <p className="text-red-600 font-semibold">
                    <strong>Password (Save this):</strong> {admin.password}
                  </p>
                </div>
              ))}
            </div>

            <Alert
              message="Important!"
              description="Please save the password(s) above. For security reasons, they will not be shown again."
              type="warning"
              showIcon
            />
          </div>
        </Card>
      )}
    </div>
  );
}

export default RegisterComp;
