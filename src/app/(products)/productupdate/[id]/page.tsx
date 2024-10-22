"use client";

import ProductUpdateComp from "@/app/_components/product/productUpdate";
import { useParams } from "next/navigation";

function ProductUpdate() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // id'nin string olduğundan emin olunuyor
  return (
    <>
      <ProductUpdateComp productId={id} />
    </>
  );
}

export default ProductUpdate;
