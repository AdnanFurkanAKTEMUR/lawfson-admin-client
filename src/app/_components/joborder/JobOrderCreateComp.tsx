"use client";
import React, { useState } from "react";
import { Select, Input, Button, Spin, message } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { ADMINUSERS_OF_COMPANY } from "@/app/_apolloConfig/graphqlResolvers/adminUserResolver";
import { CREATE_JOBORDER } from "@/app/_apolloConfig/graphqlResolvers/jobOffersResolver";

const { Option } = Select;

function JobOrderCreateComp() {
  // Yöneticileri alma
  const { data, loading, error } = useQuery(ADMINUSERS_OF_COMPANY);

  // İş emri oluşturma mutation'u
  const [createJobOrder, { loading: createLoading }] = useMutation(CREATE_JOBORDER);

  // State'ler
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [jobNote, setJobNote] = useState("");

  // Yüklenme hatası
  if (loading) return <Spin size="large" />;
  if (error) return <p className="text-red-500">Hata: {error.message}</p>;

  const adminUsers = data?.adminUsersOfCompany || [];

  // İş emri oluşturma fonksiyonu
  const handleCreateJobOrder = async () => {
    if (!selectedAdminId || !jobNote) {
      message.warning("Lütfen tüm alanları doldurun!");
      return;
    }
    try {
      await createJobOrder({
        variables: { input: { adminUserId: selectedAdminId, note: jobNote } },
      });
      message.success("İş emri başarıyla oluşturuldu!");
      setSelectedAdminId(null);
      setJobNote("");
    } catch (err) {
      console.log(err);
      message.error("İş emri oluşturulurken hata oluştu!");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Yeni İş Emri Oluştur</h2>

      {/* Yöneticiyi Seçme */}
      <Select
        showSearch
        placeholder="Yönetici Seç"
        optionFilterProp="label" // Filtreleme label üzerinden yapılacak
        className="w-full mb-4"
        onChange={(value) => setSelectedAdminId(value)}
        value={selectedAdminId}
        options={adminUsers.map((admin: any) => ({
          value: admin.id,
          label: `${admin.userName} (${admin.email})`, // Filtrelenecek metin
        }))}
      />

      {/* Not Girişi */}
      <Input.TextArea
        rows={4}
        placeholder="İş emri notunu girin..."
        className="mb-4"
        value={jobNote}
        onChange={(e) => setJobNote(e.target.value)}
      />

      {/* İş Emri Gönderme Butonu */}
      <Button
        type="primary"
        className="w-full bg-blue-600 hover:bg-blue-700"
        loading={createLoading}
        onClick={handleCreateJobOrder}
      >
        İş Emrini Oluştur
      </Button>
    </div>
  );
}

export default JobOrderCreateComp;
