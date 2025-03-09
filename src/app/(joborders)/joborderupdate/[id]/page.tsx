"use client";

import JobOrderUpdateComp from "@/app/_components/joborder/JobOrderUpdateComp";
import { useParams } from "next/navigation";
function MessageUpdate() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // id'nin string olduğundan emin olunuyor
  return (
    <>
      <JobOrderUpdateComp joborderId={id} />
    </>
  );
}

export default MessageUpdate;
