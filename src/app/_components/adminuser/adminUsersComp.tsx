"use client";

import { ADMINUSER_DELETE, ADMINUSERS_OF_COMPANY } from "@/apolloConfig/graphqlResolvers/adminUserResolver";
import formatDate from "@/helpers/formatDate";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Input, notification, Popconfirm, Space, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AdminUser = {
  id: number;
  userName: string;
  email: string;
  role: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

function AdminUsersComp() {
  const { data: auData, error: auError, loading: auLoading, refetch: refetchAdminUsers } = useQuery(ADMINUSERS_OF_COMPANY);
  const [deleteAdminUserMutate, { data: deleteAdminUserData, error: deleteAdminUserError, loading: deleteAdminUserLoading }] = useMutation(ADMINUSER_DELETE);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<AdminUser[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (auData?.adminUsersOfCompany) {
      setFilteredData(auData.adminUsersOfCompany);
    }
  }, [auData]);

  // Arama işlevi
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = auData?.adminUsersOfCompany.filter((admin: AdminUser) => admin.userName.toLowerCase().includes(value) || admin.email.toLocaleLowerCase().includes(value));
    setFilteredData(filtered);
    setSearchText(value);
  };

  // Silme işlemi
  const handleDelete = (id: number) => {
    deleteAdminUserMutate({ variables: { input: { id: id } } })
      .then(() => {
        notification.success({
          message: "Silme başarılı!",
          description: "Kullanıcı başarıyla silindi.",
        });
        refetchAdminUsers();
      })
      .catch((e) => {
        notification.error({
          message: "Hata!",
          description: "Kullanıcı silinirken bir hata oluştu.",
        });
      });
  };

  // Ant Design tabloları için kolonlar
  const columns: ColumnsType<AdminUser> = [
    {
      title: "Kullanıcı Adı",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      filterDropdown: () => (
        <div className="p-4">
          <Input
            placeholder="Ürün adı ara"
            value={searchText}
            onChange={handleSearch}
            className="mb-2"
          />
        </div>
      ),
      onFilter: (value, record) => record.userName.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      filterDropdown: () => (
        <div className="p-4">
          <Input
            placeholder="Kategori ara"
            value={searchText}
            onChange={handleSearch}
            className="mb-2"
          />
        </div>
      ),
      onFilter: (value, record) => record.email.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: "Yetki",
      dataIndex: "role",
      key: "role",
      // render: (text) => formatDate(text), // timestamp'i Türkçe formatta gösteriyoruz
    },
    {
      title: "Oluşturulma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => formatDate(text), // timestamp'i Türkçe formatta gösteriyoruz
      sorter: (a, b) => parseInt(a.createdAt) - parseInt(b.createdAt), // timestamp'e göre sıralama
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => router.push(`/adminuserupdate/${record.id}`)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Silmek istediğinizden emin misiniz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button danger>Sil</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Loading ekranı
  if (auLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spin size="large" />
        <p className="mt-4 text-lg font-semibold text-gray-600">Kullanıcılar getiriliyor...</p>
      </div>
    );
  }

  // Error ekranı
  if (auError) {
    return (
      <div className="flex items-center justify-center mt-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">Bir hata meydana geldi!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        className="bg-white shadow-sm"
      />
    </div>
  );
}

export default AdminUsersComp;
