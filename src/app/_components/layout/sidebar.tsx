"use client";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // İkonlar

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state

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
              <li className="py-2">
                <a href="/">Home</a>
              </li>
              <li className="py-2">
                <a href="/about">About</a>
              </li>
              <li className="py-2">
                <a href="/services">Services</a>
              </li>
              <li className="py-2">
                <a href="/contact">Contact</a>
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
