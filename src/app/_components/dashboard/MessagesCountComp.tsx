"use client";

import { MESSAGES_COUNT } from "@/app/_apolloConfig/graphqlResolvers/messageResolver";
import { useQuery } from "@apollo/client";
import { Card, Spin, Alert } from "antd";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const MessagesCount: React.FC = () => {
  const { data: mcData, error: mcError, loading: mcLoading } = useQuery(MESSAGES_COUNT);

  if (mcLoading)
    return (
      <Spin
        size="large"
        className="flex justify-center items-center w-full h-32"
      />
    );
  if (mcError)
    return (
      <Alert
        type="error"
        message="Hata: Veriler yüklenirken sorun oluştu"
        showIcon
      />
    );

  const messageCounts = mcData?.messageCounts || { dailyCount: 0, weeklyCount: 0, monthlyCount: 0 };

  // 📊 **Grafik İçin Veri**
  const chartData = [
    { name: "Günlük", count: messageCounts.dailyCount },
    { name: "Haftalık", count: messageCounts.weeklyCount },
    { name: "Aylık", count: messageCounts.monthlyCount },
  ];

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6"> Mesaj İstatistikleri</h2>

      {/* 📝 **Metin İstatistikleri** */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        <Card className="shadow-lg text-center">
          <h3 className="text-lg font-semibold">📆 Günlük Mesaj</h3>
          <p className="text-2xl font-bold text-blue-600">{messageCounts.dailyCount}</p>
        </Card>
        <Card className="shadow-lg text-center">
          <h3 className="text-lg font-semibold">📅 Haftalık Mesaj</h3>
          <p className="text-2xl font-bold text-green-600">{messageCounts.weeklyCount}</p>
        </Card>
        <Card className="shadow-lg text-center">
          <h3 className="text-lg font-semibold">📆 Aylık Mesaj</h3>
          <p className="text-2xl font-bold text-red-600">{messageCounts.monthlyCount}</p>
        </Card>
      </div>

      {/* 📊 **Grafiksel Gösterim** */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-center mb-4">📊 Mesaj Dağılımı</h3>
        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#1890ff"
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MessagesCount;
