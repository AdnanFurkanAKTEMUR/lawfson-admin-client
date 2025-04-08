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

export const GET_COMPANY = gql`
  query GetCompany {
    getCompany {
      id
      companyName
      companyEmail
      companyPhone
      companyTaxNumber
      companyTaxOffice
      status
      registrationNumber
      description
      sector
      companyType
      website
      companyAddresses {
        id
        address
        country
        city
        district
        postalCode
        phone
        createdAt
        updatedAt
      }
      companyFinanceInfos {
        id
        billingAddress
        billingPhone
        billingEmail
        billingCountry
        billingCity
        billingDistrict
        billingPostalCode
        iban
        bankName
        currency
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
