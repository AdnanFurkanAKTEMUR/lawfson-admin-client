"use client";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineHome, AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi"; // Chevron icon for dropdown
import { SlEnvolopeLetter } from "react-icons/sl";
import { IoBusiness } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { signOut } from "next-auth/react";
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [isProductsOpen, setIsProductsOpen] = useState(false); // Products dropdown state
  const [isUsersOpen, setIsUsersOpen] = useState(false); // Users dropdown state

  return (
    <div className="relative flex min-h-screen">
      {/* Mobilde İkon (Navbar görünümü için genişlik ve arka plan ekledik) */}
      {!isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full bg-gray-800 p-4 z-20">
          <button
            onClick={() => setIsOpen(true)} // Sidebar'ı açar
            className="text-white"
          >
            <AiOutlineMenu size={24} />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full min-h-screen w-64 bg-gray-800 text-white transform transition-transform z-10 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-64`}>
        <nav className="p-6 flex flex-col justify-between h-full">
          <div>
            {/* Sidebar Açıkken Kapatma İkonu */}
            {isOpen && (
              <button
                className="md:hidden text-white p-2"
                onClick={() => setIsOpen(false)} // Sidebar'ı kapatır
              >
                <AiOutlineClose size={24} />
              </button>
            )}

            {/* Linkler */}
            <ul className="mt-4">
              <li className="py-2 flex items-center">
                <AiOutlineHome className="mr-2" />
                <a href="/">Dashboard</a>
              </li>
              <li className="py-2 flex items-center">
                <IoBusiness className="mr-2" />
                <a href="/about">Şirketim</a>
              </li>
              {/* Ürünler Açılır Menü */}
              <li className="py-2">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                >
                  <div className="flex items-center">
                    <AiOutlineShoppingCart className="mr-2" />
                    <span>Ürünler</span>
                  </div>
                  <BiChevronDown className={`${isProductsOpen ? "rotate-180" : ""} transition-transform`} />
                </div>
                {isProductsOpen && (
                  <ul className="pl-4 mt-2">
                    <li className="py-1">
                      <a href="/productlist">Ürünleri Gör</a>
                    </li>
                    <li className="py-1">
                      <a href="/productcreate">Ürün Oluştur</a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Kullanıcılar Açılır Menü */}
              <li className="py-2">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsUsersOpen(!isUsersOpen)}
                >
                  <div className="flex items-center">
                    <AiOutlineUser className="mr-2" />
                    <span>Kullanıcılar</span>
                  </div>
                  <BiChevronDown className={`${isUsersOpen ? "rotate-180" : ""} transition-transform`} />
                </div>
                {isUsersOpen && (
                  <ul className="pl-4 mt-2">
                    <li className="py-1">
                      <a href="/adminusers">Kullanıcıları Gör</a>
                    </li>
                    <li className="py-1">
                      <a href="/createadminuser">Kullanıcı Oluştur</a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="py-2 flex items-center">
                <SlEnvolopeLetter className="mr-2" />
                <a href="/messages">Mesajlarım</a>
              </li>
              <li className="py-2 flex items-center">
                <IoBusiness className="mr-2" />
                <a href="/adminlogs">Kullanıcı Logları</a>
              </li>
              <li className="py-2 flex items-center">
                <IoMdExit className="mr-2" />
                <button onClick={async () => await signOut()}>Çıkış Yap</button>
              </li>
            </ul>
          </div>

          {/* Ek bir kapatma tuşu (mobilde altta görünür) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(false)} // Sidebar'ı kapatır
              className="w-full py-2 bg-gray-700 text-white text-center"
            >
              Close Sidebar
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
