import { gql } from "@apollo/client";

export const ADMIN_USER_LOGIN = gql`
  mutation AdminUserLogin($input: adminUserLoginInput) {
    adminUserLogin(input: $input) {
      id
      email
      createdAt
      company {
        id
      }
      role
      updatedAt
      userName
    }
  }
`;
