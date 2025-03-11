"use client";

import { useQuery } from "@apollo/client";
import { Table, Input, Button, Tag, Space, Radio } from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { GET_ALL_JOBORDERS } from "@/app/_apolloConfig/graphqlResolvers/jobOffersResolver";

interface JobOrdersType {
  id: number;
  note: string;
  adminUser: {
    id: number;
    userName: string;
  } | null;
  createdAdminUser: {
    id: number;
    userName: string;
  };
  status: string;
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

function JobOrdersComp() {
  const { data: getJobOrdersData, error: getJobOrdersError, loading: getJobOrdersLoading } = useQuery(GET_ALL_JOBORDERS);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<"hepsi" | "Yapıldı" | "Beklemede" | "Yapılmadı">("hepsi");

  // **Arama Metni Güncelleme**
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
  };

  // **Filtreleme İşlemi**
  const filteredData = getJobOrdersData?.getCompanyAllJobOrder.filter((jobOrder: JobOrdersType) => {
    const matchesSearch = jobOrder.note.toLowerCase().includes(searchText) || (jobOrder.adminUser?.userName.toLowerCase() || "").includes(searchText);

    const matchesStatus = statusFilter === "hepsi" || jobOrder.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const columns: ColumnsType<JobOrdersType> = [
    {
      title: "İş Emri",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Oluşturan",
      dataIndex: ["createdAdminUser", "userName"],
      key: "createdAdminUser",
    },
    {
      title: "Atanan",
      dataIndex: ["adminUser", "userName"],
      key: "adminUser",
      render: (text) => text || "Yok",
    },
    {
      title: "Durumu",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "Yapıldı" ? "green" : status === "Beklemede" ? "yellow" : "red"}>{status}</Tag>,
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
          href={`/joborderupdate/${record.id}`}
          className="text-white bg-blue-500 p-1 rounded-md"
        >
          Düzenle
        </Link>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">İş Emirleri</h2>

      {/* 🔍 **Arama ve Filtreleme Alanı** */}
      <Space
        direction="vertical"
        className="mb-4 mt-4 w-full"
      >
        <Input
          placeholder="Atanan kişi veya not içeriğine göre ara..."
          onChange={handleSearch}
          className="w-full"
        />

        <Radio.Group
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
          className="flex gap-2"
        >
          <Radio.Button value="hepsi">Hepsi</Radio.Button>
          <Radio.Button value="Yapıldı">Yapıldı</Radio.Button>
          <Radio.Button value="Beklemede">Beklemede</Radio.Button>
          <Radio.Button value="Yapılmadı">Yapılmadı</Radio.Button>
        </Radio.Group>
        <Link
          className="p-1 bg-blue-400 text-white rounded"
          href={"/jobordercreate"}
        >
          {" "}
          İş emri oluştur
        </Link>
      </Space>

      {/* 📋 **Tablo** */}
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={getJobOrdersLoading}
        rowKey="id"
        rowClassName={(record) => (record.status === "Yapıldı" ? "bg-green-100" : record.status === "Beklemede" ? "bg-yellow-100" : "bg-red-100")}
        pagination={{ pageSize: 10 }}
      />

      {getJobOrdersError && <p className="text-red-500">Mesajlar yüklenirken hata oluştu: {getJobOrdersError.message}</p>}
    </div>
  );
}

export default JobOrdersComp;
