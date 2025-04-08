"use client";

import { DELETE_COMPANY_ADDRESS, GET_COMPANY } from "@/app/_apolloConfig/graphqlResolvers/companyResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Card, Button, Divider, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";

function MyCompanyComp() {
  const {
    data: getCompanyData,
    loading: getCompanyLoading,
    error: getCompanyError,
    refetch: refetchCompany,
  } = useQuery(GET_COMPANY, {
    fetchPolicy: "network-only",
  });
  const router = useRouter();
  const [deleteCompanyAdress, { loading: deleteCompanyAdressLoading, error: deleteCompanyAdressError, data: deleteCompanyAddressData }] = useMutation(DELETE_COMPANY_ADDRESS);

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteCompanyAdress({
        variables: {
          input: {
            id: parseInt(addressId),
          },
        },
      }).then(() => {
        message.success("Adres başarıyla silindi.");
        refetchCompany();
      });
    } catch (err: any) {
      console.error(err);
      message.error("Adres silinmesi başarısız.");
    }
  };
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
              router.push("/updatecompany");
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
              router.push("/createcompanyaddress");
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
          company.companyAddresses.map((addr: any) => (
            <div
              key={addr.id}
              className="relative border border-gray-200 p-5 rounded-xl mb-6 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => router.push(`/updatecompanyaddress/${addr.id}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => {
                    handleDeleteAddress(addr.id);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Sil
                </button>
              </div>

              {/* Adres Bilgileri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p>
                  <strong>Adres:</strong> {addr.address}
                </p>
                <p>
                  <strong>Şehir / İlçe:</strong> {addr.city}, {addr.district}
                </p>
                <p>
                  <strong>Posta Kodu:</strong> {addr.postalCode}
                </p>
                <p>
                  <strong>Ülke:</strong> {addr.country}
                </p>
                <p>
                  <strong>Telefon:</strong> {addr.phone}
                </p>
                <p>
                  <strong>Oluşturulma:</strong> {new Date(Number(addr.createdAt)).toLocaleString()}
                </p>
              </div>
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
