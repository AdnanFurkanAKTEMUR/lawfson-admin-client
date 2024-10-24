"use client";

import { ADMIN_USER, ADMINUSER_UPDATE } from "@/apolloConfig/graphqlResolvers/adminUserResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, message, Select, Spin } from "antd";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";

type AdminUser = {
  id: number;
  userName: string;
  email: string;
  role: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};
export default function AdminUserUpdateComp({ adminUserId }: { adminUserId: string }) {
  const [form] = Form.useForm();
  const { data: auData, error: auError, loading: auLoading } = useQuery(ADMIN_USER, { variables: { input: { id: parseInt(adminUserId) } } });
  console.log(auData?.adminUserGet);
  const [updateMutate, { data: uauData, error: uauError, loading: uauLoading }] = useMutation(ADMINUSER_UPDATE);
  // Ürün verisi yüklendiğinde formu doldur
  useEffect(() => {
    if (auData?.adminUserGet) {
      form.setFieldsValue({
        userName: auData.adminUserGet.userName,
        role: auData.adminUserGet.role,
        email: auData.adminUserGet.email,
        phone: auData.adminUserGet?.phone,
        createdAt: auData.adminUserGet.createdAt,
        updatedAd: auData.adminUserGet.updatedAt,
      });
    }
    if (auError) {
      message.error("Kullanıcı bilgisi alınırken bir hata oluştu.");
    }
  }, [auData, auError, form]);

  // Güncelleme formunun gönderilmesi
  const onFinish = async (values: { userName: string; role: string; phone: string }) => {
    try {
      await updateMutate({
        variables: {
          input: {
            id: parseInt(adminUserId),
            userName: values?.userName,
            phone: values?.phone,
            role: values?.role,
          },
        },
      });
      message.success("Ürün başarıyla güncellendi!");
    } catch (err) {
      message.error("Ürün güncellenirken bir hata oluştu.");
    }
  };

  if (auLoading) {
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
  if (auError) {
    return <p className="text-red-500">Kullanıcı bulunamadı!</p>;
  }
  return (
    <>
      {" "}
      <div className="p-8 bg-gray-50">
        <h1 className="text-2xl font-semibold mb-4">Ürün Güncelle</h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Kullanıcı Adı"
            name="userName"
            rules={[{ required: true, message: "Lütfen kullanıcı adını giriniz" }]}
          >
            <Input placeholder="Kullanıcı adı" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email" }]}
          >
            <Input
              placeholder="Email"
              disabled
            />
          </Form.Item>
          <Form.Item
            label="Telefon"
            name="phone"
            rules={[{ required: false }]}
          >
            <Input placeholder="Telefon" />
          </Form.Item>
          <Form.Item
            label="Rol"
            name="role"
            rules={[{ required: true, message: "Lütfen bir rol seçiniz" }]}
          >
            <Select placeholder="Rol seç">
              <Select.Option
                key={"regular"}
                value={"regular"}
              >
                Regular
              </Select.Option>
              <Select.Option
                key={"admin"}
                value={"admin"}
              >
                Admin
              </Select.Option>
              <Select.Option
                key={"superadmin"}
                value={"superadmin"}
              >
                Super Admin
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={uauLoading}
            >
              Güncelle
            </Button>
          </Form.Item>
        </Form>

        {uauError && <p className="text-red-500">Güncelleme sırasında bir hata oluştu.</p>}
      </div>
    </>
  );
}
