import { gql } from "@apollo/client";

export const GET_ALL_JOBORDERS = gql`
  query GetCompanyAllJobOrder {
    getCompanyAllJobOrder {
      id
      note
      adminUser {
        id
        userName
      }
      createdAdminUser {
        id
        userName
      }
      company {
        id
        companyName
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_JOBORDER = gql`
  query GetJobOrder($input: getWithId) {
    getJobOrder(input: $input) {
      id
      note
      adminUser {
        id
        userName
      }
      createdAdminUser {
        id
        userName
      }
      company {
        id
        companyName
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_JOBORDER = gql`
  mutation UpdateJobOrder($input: updateJobOrderInput) {
    updateJobOrder(input: $input) {
      id
      note
      adminUser {
        id
        userName
      }
      createdAdminUser {
        id
        userName
      }
      company {
        id
        companyName
      }
      status
      createdAt
      updatedAt
    }
  }
`;
