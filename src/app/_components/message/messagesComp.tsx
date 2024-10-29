"use client";

import { MESSAGES_OF_COMPANY } from "@/apolloConfig/graphqlResolvers/messageResolver";
import { useQuery } from "@apollo/client";
import { Table, Input, Button, Tag, Space, Radio } from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";

interface MessageType {
  id: number;
  adminNote: string;
  appUser: {
    id: number;
    userName: string;
  };
  isReturn: boolean;
  messageHeader: string;
  product: {
    id: number;
    productName: string;
  };
  returnedAdmin: {
    id: number;
    userName: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

function formatDate(dateString: string) {
  const date = new Date(parseInt(dateString)); // Unix time dönüştürülüyor
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function MessagesComp() {
  const { data: messagesData, error: messagesError, loading: messagesLoading } = useQuery(MESSAGES_OF_COMPANY);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<"hepsi" | "donusYapilan" | "donusYapilmayan">("hepsi");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = messagesData?.messagesOfCompany.filter((message: MessageType) => {
    const matchesSearch = message.appUser.userName.toLowerCase().includes(searchText) || message.product.productName.toLowerCase().includes(searchText) || (message.returnedAdmin?.userName.toLowerCase() || "").includes(searchText);

    const matchesFilter = filterType === "hepsi" || (filterType === "donusYapilan" && message.isReturn) || (filterType === "donusYapilmayan" && !message.isReturn);

    return matchesSearch && matchesFilter;
  });

  const columns: ColumnsType<MessageType> = [
    {
      title: "Kullanıcı Adı",
      dataIndex: ["appUser", "userName"],
      key: "appUser",
    },
    {
      title: "Ürün Adı",
      dataIndex: ["product", "productName"],
      key: "product",
    },
    {
      title: "Dönüş Yapan Admin",
      dataIndex: ["returnedAdmin", "userName"],
      key: "admin",
      render: (text) => text || "Yok",
    },
    {
      title: "Dönüş Durumu",
      dataIndex: "isReturn",
      key: "isReturn",
      render: (isReturn) => <Tag color={isReturn ? "green" : "red"}>{isReturn ? "Dönüş Yapıldı" : "Dönüş Yapılmadı"}</Tag>,
    },
    {
      title: "Oluşturulma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Güncellenme Tarihi",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => formatDate(date),
    },
    {
      title: "İşlemler",
      key: "action",
      render: (_, record) => (
        <Link
          href={`/messageupdate/${record.id}`}
          className="text-white bg-blue-500 p-1 rounded-md"
        >
          Düzenle
        </Link>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Mesajlar</h2>

      <Space
        direction="vertical"
        className="mb-4 w-full"
      >
        <Input
          placeholder="Kullanıcı Adı, Ürün Adı veya Admin Adına Göre Ara"
          onChange={handleSearch}
          className="w-full"
        />

        <Radio.Group
          onChange={(e) => setFilterType(e.target.value)}
          value={filterType}
          className="flex justify-center gap-2"
        >
          <Radio.Button value="hepsi">Hepsini Göster</Radio.Button>
          <Radio.Button value="donusYapilan">Dönüş Yapılanları Göster</Radio.Button>
          <Radio.Button value="donusYapilmayan">Dönüş Yapılmayanları Göster</Radio.Button>
        </Radio.Group>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={messagesLoading}
        rowKey="id"
        rowClassName={(record) => (record.isReturn ? "bg-green-100" : "bg-red-100")}
        pagination={{ pageSize: 10 }}
      />

      {messagesError && <p className="text-red-500">Mesajlar yüklenirken hata oluştu: {messagesError.message}</p>}
    </div>
  );
}

export default MessagesComp;
