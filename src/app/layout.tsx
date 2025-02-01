"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/app/_apolloConfig/apolloClientWrapper";
import { NextAuthProvider } from "@/app/_nextAuthProvider/NextAuthProvider";
import ProviderComponent from "./_components/layouts/ProviderComponent";
import { Provider } from "react-redux";
import store from "../../store";
import { Suspense } from "react";
import Loading from "./_components/layouts/Loading";
import App from "../../App";
import Overlay from "./_components/layouts/Overlay";
import ScrollToTop from "./_components/layouts/ScrollToTop";
import Setting from "./_components/layouts/Setting";
import MainContainer from "./_components/layouts/MainContainer";
import Sidebar from "./_components/layouts/Sidebar";
import Header from "./_components/layouts/Header";
import ContentAnimation from "./_components/layouts/ContentAnimation";
import Footer from "./_components/layouts/Footer";
import Portals from "./_components/layouts/Portals";

const inter = Inter({ subsets: ["latin"] });

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
            <div className="flex-1 p-6 pt-16 md:pt-6">
              <Provider store={store}>
                <Suspense fallback={<Loading />}>
                  <App>
                    {/* BEGIN MAIN CONTAINER */}
                    <div className="relative">
                      <Overlay />
                      <ScrollToTop />

                      {/* BEGIN APP SETTING LAUNCHER */}
                      <Setting />
                      {/* END APP SETTING LAUNCHER */}

                      <MainContainer>
                        {/* BEGIN SIDEBAR */}
                        <Sidebar />
                        {/* END SIDEBAR */}
                        <div className="main-content flex min-h-screen flex-col">
                          {/* BEGIN TOP NAVBAR */}
                          <Header />
                          {/* END TOP NAVBAR */}

                          {/* BEGIN CONTENT AREA */}
                          <ContentAnimation>{children}</ContentAnimation>
                          {/* END CONTENT AREA */}

                          {/* BEGIN FOOTER */}
                          <Footer />
                          {/* END FOOTER */}
                          <Portals />
                        </div>
                      </MainContainer>
                    </div>{" "}
                  </App>
                </Suspense>
              </Provider>
            </div>
          </body>
        </NextAuthProvider>
      </ApolloWrapper>
    </html>
  );
}
