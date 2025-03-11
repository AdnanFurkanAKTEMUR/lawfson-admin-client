"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  // Kullanıcının adının ilk harfini alacak fonksiyon
  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };
  console.log(session);
  return (
    <nav className="bg-white p-4 border-l-2 border-gray-100 flex justify-between">
      <div className="flex justify-between items-center text-gray-600 w-full">
        {/* Sol Kısım: Linkler */}
        <div className="flex space-x-6">
          <h1 className="text-xl">Plaport Admin Paneli</h1>
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
