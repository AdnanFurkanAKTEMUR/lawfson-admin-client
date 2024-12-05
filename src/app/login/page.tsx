"use client";

import { useMutation } from "@apollo/client";
import { signIn } from "next-auth/react";
import { Form, Input, Button, notification } from "antd";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { ADMIN_USER_LOGIN } from "../_apolloConfig/graphqlResolvers/adminUserResolver";

export default function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    await signIn("credentials", {
      redirect: true,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });
  };
  // const [loginMutation, { data: loginData, error: loginError, loading: loginLoading }] = useMutation(ADMIN_USER_LOGIN);

  /* const onFinish2 = async (values: any) => {
    console.log(values);
    try {
      loginMutation({ variables: { input: values } })
        .then(async (values: any) => {
          notification.success({
            message: "Başarılı",
            description: "Giriş Başarılı!. Ana Sayfaya yönlendiriliyorsunuz!",
          });
          console.log(values.data);
          await signIn("credentials", {
            id: values.data.adminUserLogin.id,
            userName: values.data.adminUserLogin.userName,
            email: values.data.adminUserLogin.email,
            role: values.data.adminUserLogin.role,
            companyName: values.data.adminUserLogin.company.companyName,
            companyId: values.data.adminUserLogin.company.id,
            isRoot: values.data.adminUserLogin.isRoot,
            createdAt: values.data.adminUserLogin.createdAt,
            updatedAt: values.data.adminUserLogin.updatedAt,
            redirect: false,
          });
          setTimeout(() => {
            router.push("/");
          }, 1000);
        })
        .catch((e) => {
          console.error("Giriş yapma hatası:", e);
          notification.error({
            message: "Hata",
            description: "Giriş yapma hatası.",
          });
        });
    } catch (e) {
      console.error("Login Error:", e);
    }
  };
 */
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
              //  loading={loading || loginLoading}
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
