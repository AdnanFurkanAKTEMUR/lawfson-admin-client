"use client";

import { SAY_HELLO } from "@/app/_apolloConfig/graphqlResolvers/helloResolver";
import { useQuery } from "@apollo/client";

import { signOut, useSession } from "next-auth/react";

import { useQuery as aa } from "../../gqty";

export default function Home() {
  return (
    <div>
      {/* {data?.sayHello.hello}{" "} */}
      <div> Home </div>
    </div>
  );
}
