import { gql } from "@apollo/client";

export const PRODUCT_OF_COMPANY = gql`
  query ProductsOfCompany {
    productsOfCompany {
      id
      productName
      category {
        id
        categoryName
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($input: getWithId) {
    deleteProduct(input: $input) {
      status
      msg
    }
  }
`;
