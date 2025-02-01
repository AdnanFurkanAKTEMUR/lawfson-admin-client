"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  console.log(session);

  // Kullanıcının adının ilk harfini alacak fonksiyon
  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <nav className="bg-white p-4 border-l-2 border-gray-100 flex justify-between">
      <div className="flex justify-between items-center text-gray-600 w-full">
        {/* Sol Kısım: Linkler */}
        <div className="flex space-x-6">
          <Link
            href="/"
            className="px-3 py-2 rounded hover:bg-gray-200 hover:text-blue-500 transition-colors duration-200"
          >
            Ana Sayfa
          </Link>
          <Link
            href="/firsatlar"
            className="px-3 py-2 rounded hover:bg-gray-200 hover:text-blue-500 transition-colors duration-200"
          >
            Fırsatlar
          </Link>
          <Link
            href="/gorusmeler"
            className="px-3 py-2 rounded hover:bg-gray-200 hover:text-blue-500 transition-colors duration-200"
          >
            Görüşmeler
          </Link>
          <Link
            href="/satislar"
            className="px-3 py-2 rounded hover:bg-gray-200 hover:text-blue-500 transition-colors duration-200"
          >
            Satışlar
          </Link>
        </div>

        {/* Sağ Kısım: Kullanıcı Profil */}
        <div className="flex justify-end">
          {session && session.user ? (
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt="Kullanıcı Resmi"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-white font-bold">{getInitial(session.user.userName as string)}</span>
              )}
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
