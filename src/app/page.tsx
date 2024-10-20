"use client";

import { SAY_HELLO } from "@/apolloConfig/graphqlResolvers/helloResolver";
import { useQuery } from "@apollo/client";
import SayHello from "./_components/SayHello";
import { signOut } from "next-auth/react";
import Sidebar from "./_components/layout/sidebar";

export default function Home() {
  const { data, error, loading } = useQuery(SAY_HELLO);
  return (
    <div>
  
      {data?.sayHello.hello}{" "}
      <div>
        <SayHello />
      </div>
      <button onClick={() => signOut()}> çıkış yap</button>
    </div>
  );
}
