import { gql } from "@apollo/client";

export const ADMIN_USER = gql`
  query AdminUserGet($input: getWithId) {
    adminUserGet(input: $input) {
      id
      userName
      email
      role
      phone
      isRoot
      createdAt
      updatedAt
    }
  }
`;

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
      isRoot
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
      isRoot
      phone
      createdAt
      updatedAt
    }
  }
`;

export const ADMINUSER_UPDATE = gql`
  mutation AdminUserUpdate($input: updateAdminUserInput) {
    adminUserUpdate(input: $input) {
      id
      userName
      email
      role
      isRoot
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

export const ADMINUSER_CREATE = gql`
  mutation AdminUserCreate($input: createAdminUserInput) {
    adminUserCreate(input: $input) {
      id
      userName
    }
  }
`;
