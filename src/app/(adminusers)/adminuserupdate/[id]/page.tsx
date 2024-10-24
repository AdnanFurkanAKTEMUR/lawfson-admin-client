"use client";

import AdminUserUpdateComp from "@/app/_components/adminuser/adminUserUpdateComp";
import { useParams } from "next/navigation";

function AdminUserUpdate() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // id'nin string olduğundan emin olunuyor
  return (
    <>
      <AdminUserUpdateComp adminUserId={id} />
    </>
  );
}

export default AdminUserUpdate;
