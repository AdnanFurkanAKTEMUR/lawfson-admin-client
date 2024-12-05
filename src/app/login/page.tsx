"use client";

import { signIn } from "next-auth/react";
import { Form, Input, Button, notification } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (formValues: any) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });

      if (res?.error) {
        notification.error({
          message: "Giriş Başarısız",
          description: res.error || "Kimlik doğrulama hatası.",
        });
      } else {
        notification.success({
          message: "Başarılı Giriş",
          description: "Başarıyla giriş yaptınız!",
        });
        setTimeout(() => {
          router.push("/");
        }, 500);
      }
    } catch (error) {
      console.error("Login Error:", error);
      notification.error({
        message: "Hata Oluştu",
        description: "Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Lütfen email giriniz!" },
              { type: "email", message: "Geçerli bir email adresi giriniz." },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Lütfen şifre giriniz!" }]}
          >
            <Input.Password placeholder="Şifre" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
