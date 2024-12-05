"use client";
import { DELETE_PRODUCT, PRODUCT_OF_COMPANY } from "@/app/_apolloConfig/graphqlResolvers/productResolver";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Table, Input, Button, Space, Popconfirm, Spin, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Next.js'in Image bileşenini kullanalım
import formatDate from "@/helpers/formatDate";

interface Product {
  id: number;
  productName: string;
  image?: string;
  category: {
    categoryName: string;
  };
  createdAt: string; // timestamp
}

function ProductListComp() {
  const { data: productListData, error: productListError, loading: productListLoading, refetch: refetchProducts } = useQuery(PRODUCT_OF_COMPANY);
  const [dpMutate, { data: dpData, error: dpError, loading: dpLoading }] = useMutation(DELETE_PRODUCT);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (productListData?.productsOfCompany) {
      setFilteredData(productListData.productsOfCompany);
    }
  }, [productListData]);

  // Arama işlevi
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = productListData.productsOfCompany.filter((product: Product) => product.productName.toLowerCase().includes(value) || product.category.categoryName.toLowerCase().includes(value));
    setFilteredData(filtered);
    setSearchText(value);
  };

  // Silme işlemi
  const handleDelete = (id: number) => {
    dpMutate({ variables: { input: { id: id } } })
      .then(() => {
        notification.success({
          message: "Silme başarılı!",
          description: "Ürün başarıyla silindi.",
        });
        refetchProducts();
      })
      .catch((e) => {
        notification.error({
          message: "Hata!",
          description: "Ürün silinirken bir hata meydana geldi!",
        });
      });
  };

  // Ant Design tabloları için kolonlar
  const columns: ColumnsType<Product> = [
    {
      title: "Resim",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <Image
          src={record.image ? record.image : "/noimage.jpg"}
          alt={record.productName}
          width={50}
          height={50}
          className="rounded-md"
        />
      ),
    },
    {
      title: "Ürün Adı",
      dataIndex: "productName",
      key: "productName",
      sorter: (a, b) => a.productName.localeCompare(b.productName),
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
      onFilter: (value, record) => record.productName.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: "Kategori",
      dataIndex: ["category", "categoryName"],
      key: "categoryName",
      sorter: (a, b) => a.category.categoryName.localeCompare(b.category.categoryName),
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
      onFilter: (value, record) => record.category.categoryName.toLowerCase().includes((value as string).toLowerCase()),
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
            onClick={() => router.push(`/productupdate/${record.id}`)}
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
  if (productListLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spin size="large" />
        <p className="mt-4 text-lg font-semibold text-gray-600">Ürünleriniz getiriliyor...</p>
      </div>
    );
  }

  // Error ekranı
  if (productListError) {
    return (
      <div className="flex items-center justify-center h-screen">
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

export default ProductListComp;
