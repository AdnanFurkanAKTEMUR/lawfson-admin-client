"use client";
import { GET_COMPANY } from "@/app/_apolloConfig/graphqlResolvers/companyResolver";
import UpdateCompanyComp from "@/app/_components/company/UpdateCompanyComp";
import { useQuery } from "@apollo/client";
import React from "react";

function UpdateCompany() {
  const { data, error, loading } = useQuery(GET_COMPANY);
  if (error) {
    return <div> An Error </div>;
  }
  if (loading) {
    return <div> Loading...</div>;
  }
  return <>{data && data?.getCompany ? <UpdateCompanyComp company={data?.getCompany} /> : "Firma Bulunamadı!"}</>;
}

export default UpdateCompany;
