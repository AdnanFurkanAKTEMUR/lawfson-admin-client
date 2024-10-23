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

export const ADMINUSERS_OF_COMPANY = gql`
  query AdminUsersOfCompany {
    adminUsersOfCompany {
      id
      userName
      email
      role
      phone
      createdAt
      updatedAt
    }
  }
`;

export const ADMINUSER_DELETE = gql`
  mutation AdminUserDelete($input: getWithId) {
    adminUserDelete(input: $input) {
      status
      msg
    }
  }
`;
