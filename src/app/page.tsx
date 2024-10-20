"use client";

import { SAY_HELLO } from "@/apolloConfig/graphqlResolvers/helloResolver";
import { useQuery } from "@apollo/client";
import SayHello from "./_components/SayHello";

export default function Home() {
  const { data, error, loading } = useQuery(SAY_HELLO);
  return (
    <div>
      {data?.sayHello.hello}{" "}
      <div>
        <SayHello />
      </div>
    </div>
  );
}
