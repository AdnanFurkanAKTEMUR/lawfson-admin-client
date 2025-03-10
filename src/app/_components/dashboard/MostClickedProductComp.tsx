"use client";

import { MOSTCLICKEDTHREEPRODUCT } from "@/app/_apolloConfig/graphqlResolvers/productResolver";
import { useQuery } from "@apollo/client";
import { Card, Tag, Spin, Image } from "antd";
import Link from "next/link";
import React from "react";

interface Category {
  id: string;
  categoryName: string;
}

interface Company {
  id: string;
  companyName: string;
}

interface ProductMostClicked {
  id: string;
  productName: string;
  brand?: string;
  image?: string;
  widths?: number;
  length?: number;
  thickness?: number;
  color?: string;
  origin?: string;
  surfaceTreatment?: string;
  description?: string;
  onAd: boolean;
  location?: string;
  adDate?: string;
  category: Category;
  company: Company;
  clickedRate: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

const MostClickedProductComp: React.FC = () => {
  const { data, loading, error } = useQuery(MOSTCLICKEDTHREEPRODUCT);

  if (loading)
    return (
      <Spin
        size="large"
        className="flex justify-center items-center w-full h-32"
      />
    );
  if (error) return <p className="text-red-500 text-center mt-4">Hata: {error.message}</p>;

  const products: ProductMostClicked[] = data?.productMostClickedThree || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">En Çok Tıklanan Ürünler</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            hoverable
            className="shadow-lg border border-gray-200 transition-transform transform hover:scale-105"
            cover={
              <div className="flex justify-center bg-gray-100">
                <Link href={`productupdate/${product.id}`}>
                  <Image
                    alt={product.productName}
                    src={product.image || "https://via.placeholder.com/300"}
                    className="max-h-48 w-full object-cover" // 📌 Maksimum 48 birim yükseklik, genişlik sınırlı
                    preview={false}
                  />
                </Link>
              </div>
            }
          >
            <Link href={`productupdate/${product.id}`}>
              <div className="p-2">
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-gray-500">{product.brand || "Marka belirtilmemiş"}</p>

                <div className="mt-2 flex flex-wrap gap-1">
                  <Tag color="blue">{product.category?.categoryName}</Tag>
                  {product.inStock ? <Tag color="green">Stokta Var</Tag> : <Tag color="red">Stokta Yok</Tag>}
                </div>

                <p className="mt-2 text-gray-700">
                  <span className="font-semibold">Tıklanma:</span> {product.clickedRate}
                </p>
                {product.location && <p className="text-gray-500">📍 {product.location}</p>}

                <p className="mt-2 text-gray-500 text-sm">{product.description?.slice(0, 60) || "Açıklama yok"}...</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MostClickedProductComp;
