"use client";

import { SAY_HELLO } from "@/app/_apolloConfig/graphqlResolvers/helloResolver";
import { useQuery } from "@apollo/client";
import SayHello from "./_components/SayHello";
import { signOut, useSession } from "next-auth/react";
import Sidebar from "./_components/layout/sidebar";
import { useQuery as aa } from "../../gqty";

export default function Home() {
  //const { data, error, loading } = useQuery(SAY_HELLO);
  const session = useSession();
  console.log(session);
  const { sayHello } = aa();
  console.log(sayHello?.hello, "asd");
  return (
    <div>
      {/* {data?.sayHello.hello}{" "} */}
      <div>
        <SayHello />
      </div>
    </div>
  );
}
