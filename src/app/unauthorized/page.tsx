"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-red-500 mb-4"> Yetkisiz Erişim</h1>
        <p className="text-gray-700 mb-4">Bu sayfayı görüntüleme yetkiniz yok. Lütfen yetkili bir hesap ile giriş yapın.</p>
        <p className="text-gray-600 font-semibold">Ana sayfaya yönlendiriliyorsunuz... {countdown}</p>
      </div>
    </div>
  );
}
