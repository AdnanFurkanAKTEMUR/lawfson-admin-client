"use client";

import { MESSAGE, UPDATE_MESSAGE } from "@/apolloConfig/graphqlResolvers/messageResolver";
import { useMutation, useQuery } from "@apollo/client";
import { Card, Input, Checkbox, Button, Typography, Row, Col, notification } from "antd";
import { useState, useEffect } from "react";

const { TextArea } = Input;
const { Text } = Typography;

const styles = {
  cardHeader: "bg-gray-100 border-b border-gray-300 text-lg font-semibold",
  cardBody: "bg-gray-50",
  shadow: "shadow-lg",
};

interface MessageType {
  id: number;
  adminNote: string;
  appUser: {
    id: number;
    userName: string;
    email: string;
    phone: string;
  };
  isReturn: boolean;
  messageHeader: string;
  messageText: string;
  phone: string;
  product: {
    id: number;
    productName: string;
    image: string;
    category: {
      categoryName: string;
    };
  };
  returnedAdmin: {
    id: number;
    userName: string;
    email: string;
    phone: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

function formatDate(dateString: string) {
  const date = new Date(parseInt(dateString));
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function MessageUpdateComp({ messageId }: { messageId: string }) {
  const {
    data: getMessageData,
    error: getMessageError,
    loading: getMessageLoading,
    refetch: refetchMessage,
  } = useQuery(MESSAGE, {
    variables: { input: { id: parseInt(messageId) } },
  });

  const [updateMessageMutation, { loading: uLoading }] = useMutation(UPDATE_MESSAGE);

  const [adminNote, setAdminNote] = useState("");
  const [isReturn, setIsReturn] = useState(false);

  const message: MessageType | undefined = getMessageData?.messageGet;

  useEffect(() => {
    if (message) {
      setAdminNote(message.adminNote || "");
      setIsReturn(message.isReturn || false);
    }
  }, [message]);

  const handleUpdate = async () => {
    try {
      await updateMessageMutation({
        variables: {
          input: {
            id: parseInt(messageId),
            adminNote,
            isReturn,
          },
        },
      });
      refetchMessage();
      notification.success({
        message: "Başarılı",
        description: "Güncelleme başarılı bir şekilde tamamlandı.",
      });
    } catch (error) {
      notification.error({
        message: "Hata",
        description: "Güncelleme sırasında bir hata oluştu.",
      });
      console.error("Güncelleme hatası:", error);
    }
  };

  if (getMessageLoading) return <div>Yükleniyor...</div>;
  if (getMessageError) return <div>Hata: {getMessageError.message}</div>;

  return (
    <div className="p-4 space-y-4">
      <Row
        gutter={[16, 16]}
        className="mb-4"
      >
        {/* Ürün Bilgileri Kartı */}
        <Col
          xs={24}
          md={8}
        >
          <Card
            title={<span className={styles.cardHeader}>Ürün Bilgileri</span>}
            className={`${styles.shadow} ${styles.cardBody}`}
          >
            <p>
              <Text strong>Ürün Adı:</Text> {message?.product.productName || "Ürün bulunamadı"}
            </p>
            <p>
              <Text strong>Kategori:</Text> {message?.product.category.categoryName || "Kategori bulunamadı"}
            </p>
            <img
              src={message?.product.image || "/noimage.jpg"}
              alt="Ürün Görseli"
              className="mt-2 w-full h-32 object-cover rounded-md border border-gray-300"
              style={{ objectFit: "cover", height: "150px", width: "100%" }}
            />
          </Card>
        </Col>
        {/* Kullanıcı Bilgileri Kartı */}
        <Col
          xs={24}
          md={8}
        >
          <Card
            title={<span className={styles.cardHeader}>Kullanıcı Bilgileri</span>}
            className={`${styles.shadow} ${styles.cardBody}`}
          >
            <p>
              <Text strong>Ad:</Text> {message?.appUser.userName}
            </p>
            <p>
              <Text strong>Email:</Text> {message?.appUser.email}
            </p>
            <p>
              <Text strong>Telefon:</Text> {message?.appUser.phone}
            </p>
          </Card>
        </Col>

        {/* Admin Bilgileri Kartı */}
        <Col
          xs={24}
          md={8}
        >
          <Card
            title={<span className={styles.cardHeader}>Dönüş Yapan Admin</span>}
            className={`${styles.shadow} ${styles.cardBody}`}
          >
            {message?.isReturn && message?.returnedAdmin ? (
              <>
                <p>
                  <Text strong>Ad:</Text> {message.returnedAdmin.userName}
                </p>
                <p>
                  <Text strong>Email:</Text> {message.returnedAdmin.email}
                </p>
                <p>
                  <Text strong>Telefon:</Text> {message.returnedAdmin.phone}
                </p>
              </>
            ) : (
              <p className="text-gray-500">Henüz güncelleyen admin yok</p>
            )}
          </Card>
        </Col>
      </Row>

      {/* Tarih Bilgileri Kartı */}
      <Card className={`w-full mb-4 ${styles.cardBody}`}>
        <p>
          <Text strong>Oluşturulma Tarihi:</Text> {formatDate(message?.createdAt || "")}
        </p>
        <p>
          <Text strong>Güncellenme Tarihi:</Text> {formatDate(message?.updatedAt || "")}
        </p>
      </Card>

      {/* Admin Notu ve Güncelleme Kartı */}
      <Card
        title={<span className={styles.cardHeader}>Dönüş Bilgileri</span>}
        className={`${styles.shadow} ${styles.cardBody}`}
      >
        <Text strong>Admin Notu:</Text>
        <TextArea
          rows={4}
          value={adminNote}
          onChange={(e) => setAdminNote(e.target.value)}
          placeholder="Notunuzu buraya ekleyin"
          className="mt-2"
        />

        <Checkbox
          checked={isReturn}
          onChange={(e) => setIsReturn(e.target.checked)}
          className="mt-4"
        >
          Dönüş Yapıldı
        </Checkbox>

        <Button
          type="primary"
          onClick={handleUpdate}
          loading={uLoading}
          className="mt-4 bg-blue-500"
        >
          Güncelle
        </Button>
      </Card>
    </div>
  );
}
