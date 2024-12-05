"use client";

import { ADMINUSER_CREATE } from "@/app/_apolloConfig/graphqlResolvers/adminUserResolver";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, message, Select } from "antd";
import { useRouter } from "next/navigation";

type AdminUser = {
  userName: string;
  email: string;
  role: string;
  password: string;
  phone: string;
};

function AdminUserCreateComp() {
  const [form] = Form.useForm();
  const [auCreateMutation, { data: auData, error: auError, loading: auLoading }] = useMutation(ADMINUSER_CREATE);
  const router = useRouter();
  const onFinish = async (values: AdminUser) => {
    try {
      await auCreateMutation({ variables: { input: values } });
      message.success("Kullanıcı başarıyla oluşturuldu!");
      form.resetFields();
      router.push("/adminusers");
    } catch (error) {
      message.error("Kullanıcı oluşturulurken bir hata oluştu.");
    }
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
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
          rules={[{ required: true, message: "Lütfen email giriniz", type: "email" }]}
        >
          <Input
            placeholder="Email"
            type="email"
          />
        </Form.Item>

        <Form.Item
          label="Telefon"
          name="phone"
          rules={[{ required: false, message: "Lütfen telefon numarası giriniz" }]}
        >
          <Input placeholder="Telefon" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Lütfen ürün adını giriniz" }]}
        >
          <Input
            placeholder="Telefon"
            type="password"
          />
        </Form.Item>

        <Form.Item
          label="Rol"
          name="role"
          rules={[{ required: true, message: "Lütfen rol seçiniz" }]}
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
            loading={auLoading}
          >
            Oluştur
          </Button>
        </Form.Item>
      </Form>
      {auError && <p className="text-red-500 mt-4">Kullanıcı oluşturulurken bir hata oluştu.</p>}
    </>
  );
}

export default AdminUserCreateComp;
