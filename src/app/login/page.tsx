"use client";

import { useMutation } from "@apollo/client";
import { signIn } from "next-auth/react";
import { Form, Input, Button, notification } from "antd";
import { useState } from "react";
import { ADMIN_USER_LOGIN } from "@/apolloConfig/graphqlResolvers/adminUserResolver";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [loginMutation, { data: loginData, error: loginError, loading: loginLoading }] = useMutation(ADMIN_USER_LOGIN, {
    onCompleted: async (data) => {
      if (data && data.adminUserLogin) {
        const res = await signIn("credentials", {
          redirect: false,
          id: data.adminUserLogin.id,
          userName: data.adminUserLogin.userName,
          email: data.adminUserLogin.email,
          role: data.adminUserLogin.role,
          companyId: data.adminUserLogin.company.id,
          company: data.adminUserLogin.company,
          createdAt: data.adminUserLogin.createdAt,
          updatedAt: data.adminUserLogin.updatedAt,
        });
        router.push("/")
        if (res?.error) {
          notification.error({
            message: "NextAuth Giriş Başarısız",
            description: res.error,
          });
        } else {
          notification.success({
            message: "Giriş Başarılı",
            description: "Başarıyla giriş yaptınız!",
          });
        }
      }
    },
    onError: (error) => {
      notification.error({
        message: "Backend Giriş Başarısız",
        description: error.message,
      });
    },
  });

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await loginMutation({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });
    } catch (err) {
      console.error("Apollo Mutation Error:", err);
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
              { required: true, message: "Email alanı zorunludur" },
              { type: "email", message: "Geçerli bir email giriniz" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Şifre alanı zorunludur" }]}
          >
            <Input.Password placeholder="Şifre" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading || loginLoading}
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
