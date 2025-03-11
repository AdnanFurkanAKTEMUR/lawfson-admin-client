"use client";

import { ADMINUSERS_OF_COMPANY } from "@/app/_apolloConfig/graphqlResolvers/adminUserResolver";
import { GET_JOBORDER, UPDATE_JOBORDER } from "@/app/_apolloConfig/graphqlResolvers/jobOffersResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Card, Input, Select, Button, Typography, Row, Col, notification } from "antd";
import { useState, useEffect } from "react";

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

const styles = {
  cardHeader: "bg-gray-100 border-b border-gray-300 text-lg font-semibold p-4",
  cardBody: "p-4 bg-white",
  shadow: "shadow-lg",
};

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

interface AdminUsersOfCompany {
  id: number;
  userName: string;
}

export default function JobOrderUpdateComp({ joborderId }: { joborderId: string }) {
  const {
    data: getJobOrderData,
    error: getJobOrderError,
    loading: getJobOrderLoading,
    refetch: refetchJobOrder,
  } = useQuery(GET_JOBORDER, {
    variables: { input: { id: parseInt(joborderId) } },
  });

  const { data: getAllAdminUserData, loading: getAllAdminUserLoading, error: getAllAdminUserError } = useQuery(ADMINUSERS_OF_COMPANY);
  const [updateJobOrder, { loading: jobOrderLoading }] = useMutation(UPDATE_JOBORDER);

  // **State Tanımları**
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [assignedAdmin, setAssignedAdmin] = useState<string | null>(null);

  // **Veriyi Güncelle**
  useEffect(() => {
    if (getJobOrderData?.getJobOrder) {
      const jobOrder = getJobOrderData.getJobOrder;
      setNote(jobOrder.note || "");
      setStatus(jobOrder.status || "");
      setAssignedAdmin(jobOrder.adminUser?.id.toString() || null);
    }
  }, [getJobOrderData]);

  // **Güncelleme İşlemi**
  const handleUpdate = async () => {
    try {
      const { data } = await updateJobOrder({
        variables: {
          input: {
            id: parseInt(joborderId),
            note,
            status,
            adminUserId: assignedAdmin ? parseInt(assignedAdmin) : null,
          },
        },
      });

      if (data?.updateJobOrder) {
        notification.success({ message: "Başarı!", description: "İş emri başarıyla güncellendi!" });
        refetchJobOrder(); // Güncellenmiş veriyi tekrar çek
      } else {
        notification.error({ message: "Hata!", description: "Güncelleme başarısız oldu." });
      }
    } catch (error) {
      notification.error({ message: "Hata!", description: `Güncelleme sırasında hata oluştu: ${error}` });
    }
  };

  if (getJobOrderLoading) return <div>Yükleniyor...</div>;
  if (getJobOrderError) return <div>Hata: {getJobOrderError.message}</div>;

  return (
    <div className="p-4">
      <Card className={styles.shadow}>
        <div className={styles.cardHeader}>İş Emri Güncelle</div>
        <div className={styles.cardBody}>
          <Row gutter={[16, 16]}>
            {/* İş Emri Notu */}
            <Col span={24}>
              <Text strong>İş Emri Notu:</Text>
              <TextArea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Col>

            {/* Atanan Admin Seçimi */}
            <Col span={24}>
              <Text strong>Atanan Kişi:</Text>
              <Select
                showSearch
                className="w-full"
                loading={getAllAdminUserLoading}
                value={assignedAdmin}
                onChange={(value) => setAssignedAdmin(value)}
                placeholder="Admin Seçin"
                optionFilterProp="label" // Arama işlemi 'label' üzerinden yapılacak
                filterOption={(input, option: any) => option?.label?.toLowerCase().includes(input.toLowerCase())}
                options={getAllAdminUserData?.adminUsersOfCompany.map((admin: AdminUsersOfCompany) => ({
                  value: admin.id.toString(),
                  label: admin.userName, // Arama için kullanılacak değer
                }))}
              />
            </Col>

            {/* Durum Seçimi */}
            <Col span={24}>
              <Text strong>Durum:</Text>
              <Select
                className="w-full"
                value={status}
                onChange={(value) => setStatus(value)}
              >
                <Option value="Beklemede">Beklemede</Option>
                <Option value="Yapıldı">Yapıldı</Option>
                <Option value="İptal Edildi">İptal Edildi</Option>
              </Select>
            </Col>

            {/* Kaydet Butonu */}
            <Col
              span={24}
              className="flex justify-end"
            >
              <Button
                type="primary"
                loading={jobOrderLoading}
                onClick={handleUpdate}
              >
                Güncelle
              </Button>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
}
