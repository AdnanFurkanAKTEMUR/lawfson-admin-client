"use client";
import React from "react";
import { useParams } from "next/navigation";
import UpdateCompanyAddressComp from "@/app/_components/company/UpdateCompanyAddressComp";
function UpdateCompanyAddress() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // id'nin string olduğundan emin olunuyor
  return (
    <>
      <UpdateCompanyAddressComp addressId={id} />
    </>
  );
}

export default UpdateCompanyAddress;
