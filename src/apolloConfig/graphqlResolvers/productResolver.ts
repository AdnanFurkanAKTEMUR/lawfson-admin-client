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
