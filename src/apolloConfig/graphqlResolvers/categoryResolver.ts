import { gql } from "@apollo/client";

export const GETALL_CAT = gql`
  query CategoryGetAll {
    categoryGetAll {
      categoryName
      createdAt
      id
      updatedAt
    }
  }
`;
