"use client";

import { GET_COMPANY } from "@/app/_apolloConfig/graphqlResolvers/companyResolver";
import { useQuery } from "@apollo/client";
import { Card, Button, Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function MyCompanyComp() {
  const { data: getCompanyData, loading: getCompanyLoading, error: getCompanyError } = useQuery(GET_COMPANY);
  const router = useRouter();
  if (getCompanyLoading) return <div className="text-center py-10">Loading...</div>;
  if (getCompanyError) return <div className="text-red-600 py-4">Error: {getCompanyError.message}</div>;

  const company = getCompanyData?.getCompany;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Company Info */}
      <Card
        title="Company Information"
        extra={
          <Button
            type="primary"
            onClick={() => {
              router.push("/companyedit");
            }}
          >
            Düzenle
          </Button>
        }
        className="rounded-2xl shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong>Name:</strong> {company.companyName}
          </p>
          <p>
            <strong>Email:</strong> {company.companyEmail}
          </p>
          <p>
            <strong>Phone:</strong> {company.companyPhone}
          </p>
          <p>
            <strong>Tax Number:</strong> {company.companyTaxNumber}
          </p>
          <p>
            <strong>Tax Office:</strong> {company.companyTaxOffice}
          </p>
          <p>
            <strong>Status:</strong> {company.status}
          </p>
          <p>
            <strong>Reg. Number:</strong> {company.registrationNumber}
          </p>
          <p>
            <strong>Sector:</strong> {company.sector}
          </p>
          <p>
            <strong>Type:</strong> {company.companyType}
          </p>
          <p>
            <strong>Website:</strong> <Link href={company?.website}>{company.website}</Link>
          </p>
          <p className="col-span-2">
            <strong>Description:</strong> {company.description}
          </p>
          <p className="col-span-2">
            <strong>Created At:</strong> {new Date(Number(company.createdAt)).toLocaleString()}
          </p>
        </div>
      </Card>
      {/* Addresses */}
      <Card
        title="Firma Adreslerim"
        extra={
          <Button
            type="dashed"
            onClick={() => {
              router.push("/companyaddresscreate");
            }}
          >
            Yeni Adres Ekle
          </Button>
        }
        className="rounded-2xl shadow"
      >
        {company.companyAddresses.length === 0 ? (
          <p className="text-gray-500 italic">Kayıtlı adres yok.</p>
        ) : (
          company.companyAddresses.map((addr: any, index: number) => (
            <div
              key={addr.id}
              className="border p-4 rounded-md mb-4 bg-gray-50"
            >
              <p>
                <strong>Address:</strong> {addr.address}
              </p>
              <p>
                <strong>City:</strong> {addr.city}, {addr.district}
              </p>
              <p>
                <strong>Postal Code:</strong> {addr.postalCode}
              </p>
              <p>
                <strong>Country:</strong> {addr.country}
              </p>
              <p>
                <strong>Phone:</strong> {addr.phone}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(Number(addr.createdAt)).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </Card>
      {/* Financial Info */}
      <Card
        title="Fatura Adreslerim"
        extra={
          <Button
            type="dashed"
            onClick={() => {
              router.push("/companybillingaddresscreate");
            }}
          >
            Yeni Fatura Bilgisi Ekle
          </Button>
        }
        className="rounded-2xl shadow"
      >
        {company.companyFinanceInfos.length === 0 ? (
          <p className="text-gray-500 italic">Kayıtlı fatura bilgisi yok.</p>
        ) : (
          company.companyFinanceInfos.map((info: any, index: number) => (
            <div
              key={info.id}
              className="border p-4 rounded-md mb-4 bg-gray-50"
            >
              <p>
                <strong>Billing Address:</strong> {info.billingAddress}
              </p>
              <p>
                <strong>Phone:</strong> {info.billingPhone}
              </p>
              <p>
                <strong>Email:</strong> {info.billingEmail}
              </p>
              <p>
                <strong>City:</strong> {info.billingCity}, {info.billingDistrict}
              </p>
              <p>
                <strong>Postal Code:</strong> {info.billingPostalCode}
              </p>
              <p>
                <strong>IBAN:</strong> {info.iban}
              </p>
              <p>
                <strong>Bank:</strong> {info.bankName}
              </p>
              <p>
                <strong>Currency:</strong> {info.currency}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(Number(info.createdAt)).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}

export default MyCompanyComp;
