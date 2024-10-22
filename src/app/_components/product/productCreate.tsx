import { CREATE_PRODUCT } from "@/apolloConfig/graphqlResolvers/productResolver";
import { useMutation } from "@apollo/client";

type product = {
  productName: string;
  categoryId: number;
};

function ProductCreateComp() {
  const [createProductMutate, { data: cpData, error: cpError, loading: cpLoading }] = useMutation(CREATE_PRODUCT);
  return <></>;
}

export default ProductCreateComp;
