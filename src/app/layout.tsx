import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/apolloConfig/apolloClientWrapper";
import { NextAuthProvider } from "@/nextAuthProvider/NextAuthProvider";
import Sidebar from "./_components/layout/sidebar";
import Navbar from "./_components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloWrapper>
        <NextAuthProvider>
          <body>
            {" "}
            <div className="relative flex min-h-screen">
              {/* Sidebar */}
              <Sidebar /> {/* Sidebar bileşenini çağırıyoruz */}
              {/* Main content */}
              <div className="flex-1">
                <Navbar />
                <div className="flex-1 p-6 bg-gray-100 pt-16 md:pt-6">
                  {children} {/* Dinamik sayfa içeriği */}
                </div>
              </div>
            </div>
          </body>
        </NextAuthProvider>
      </ApolloWrapper>
    </html>
  );
}
