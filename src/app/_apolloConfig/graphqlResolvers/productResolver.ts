import { gql } from "@apollo/client";

export const MOSTCLICKEDTHREEPRODUCT = gql`
  query ProductMostClickedThree {
    productMostClickedThree {
      id
      productName
      brand
      image
      widths
      length
      thickness
      color
      origin
      surfaceTreatment
      description
      onAd
      location
      adDate
      category {
        id
        categoryName
      }
      company {
        id
        companyName
      }
      clickedRate
      inStock
      createdAt
      updatedAt
    }
  }
`;

export const PRODUCT_OF_COMPANY = gql`
  query ProductsOfCompany {
    productsOfCompany {
      id
      productName
      category {
        id
        categoryName
      }
      image
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($input: getWithId) {
    getProduct(input: $input) {
      id
      productName
      brand
      image
      widths
      length
      thickness
      color
      origin
      surfaceTreatment
      description
      onAd
      location
      adDate
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

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: createProductInput) {
    createProduct(input: $input) {
      id
      productName
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: updateProductInput) {
    updateProduct(input: $input) {
      category {
        categoryName
        id
      }
      createdAt
      updatedAt
      productName
      id
    }
  }
`;
