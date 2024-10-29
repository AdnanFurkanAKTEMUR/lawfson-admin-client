"use client";

import MessageUpdateComp from "@/app/_components/message/messageUpdateComp";
import { useParams } from "next/navigation";
function MessageUpdate() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // id'nin string olduğundan emin olunuyor
  return (
    <>
      <MessageUpdateComp messageId={id} />
    </>
  );
}

export default MessageUpdate;
