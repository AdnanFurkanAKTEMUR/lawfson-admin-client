"use client";

import { LASTFIVEMESSAGE } from "@/app/_apolloConfig/graphqlResolvers/messageResolver";
import { useQuery } from "@apollo/client";
import { Card, Tag, Spin, Alert, Avatar, Divider } from "antd";
import { UserOutlined, PhoneOutlined, MessageOutlined } from "@ant-design/icons";
import React from "react";

const LastFiveComp: React.FC = () => {
  const { data: mData, error: mError, loading: mLoading } = useQuery(LASTFIVEMESSAGE);

  if (mLoading)
    return (
      <Spin
        size="large"
        className="flex justify-center items-center w-full h-32"
      />
    );
  if (mError)
    return (
      <Alert
        type="error"
        message="Hata: Veriler yüklenirken sorun oluştu"
        showIcon
      />
    );

  const messages = mData?.latestMessagesByReturnStatus || { returnedMessages: [], notReturnedMessages: [] };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6"> Son 5 Mesaj</h2>

      {/* 📌 Dönüş Yapılan Mesajlar */}
      <h3 className="text-xl font-semibold text-green-600"> Dönüş Yapılan Mesajlar</h3>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-8">
        {messages.returnedMessages.length > 0 ? (
          messages.returnedMessages.map((msg: any) => (
            <Card
              key={msg.id}
              className="shadow-md border border-gray-200"
            >
              <h4 className="text-lg font-semibold">{msg.messageHeader}</h4>
              <p className="text-gray-600">
                <MessageOutlined /> {msg.messageText}
              </p>

              <Divider />

              {/* Gönderen Kullanıcı */}
              <div className="flex items-center gap-3">
                <Avatar icon={<UserOutlined />} />
                <p className="text-sm font-medium">{msg.appUser?.userName}</p>
              </div>

              {/* Telefon Numarası */}
              {msg.phone && (
                <p className="text-gray-500">
                  <PhoneOutlined /> {msg.phone}
                </p>
              )}

              {/* Dönüş Yapan Admin */}
              <p className="text-sm mt-2">
                <span className="font-semibold">Dönüş Yapan:</span> {msg.returnedAdmin?.userName || "Bilinmiyor"}
              </p>

              {/* Ürün Bilgisi */}
              <Tag color="blue">{msg.product?.category?.categoryName}</Tag>
              <p className="text-sm text-gray-500">{msg.product?.productName}</p>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">Henüz dönüş yapılmış mesaj bulunmuyor.</p>
        )}
      </div>

      {/* 📌 Dönüş Yapılmayan Mesajlar */}
      <h3 className="text-xl font-semibold text-red-600"> Dönüş Yapılmayan Mesajlar</h3>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {messages.notReturnedMessages.length > 0 ? (
          messages.notReturnedMessages.map((msg: any) => (
            <Card
              key={msg.id}
              className="shadow-md border border-gray-200"
            >
              <h4 className="text-lg font-semibold">{msg.messageHeader}</h4>
              <p className="text-gray-600">
                <MessageOutlined /> {msg.messageText}
              </p>

              <Divider />

              {/* Gönderen Kullanıcı */}
              <div className="flex items-center gap-3">
                <Avatar icon={<UserOutlined />} />
                <p className="text-sm font-medium">{msg.appUser.userName}</p>
              </div>

              {/* Telefon Numarası */}
              {msg.phone && (
                <p className="text-gray-500">
                  <PhoneOutlined /> {msg.phone}
                </p>
              )}

              {/* Ürün Bilgisi */}
              <Tag color="blue">{msg?.product?.category?.categoryName}</Tag>
              <p className="text-sm text-gray-500">{msg?.product?.productName}</p>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">Henüz dönüş yapılmamış mesaj bulunmuyor.</p>
        )}
      </div>
    </div>
  );
};

export default LastFiveComp;
