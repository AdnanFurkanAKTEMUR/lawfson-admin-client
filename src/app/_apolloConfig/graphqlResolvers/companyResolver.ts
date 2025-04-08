import { gql } from "@apollo/client";

export const CREATE_COMPANY = gql`
  mutation CreateCompany($input: createCompanyInput) {
    createCompany(input: $input) {
      id
      companyName
      companyEmail
      companyPhone
      createdAt
      updatedAt
      adminUsers {
        userName
        email
        role
        password
        phone
        isRoot
      }
      companyTaxNumber
      companyTaxOffice
      status
      registrationNumber
      description
      sector
      companyType
      website
    }
  }
`;
