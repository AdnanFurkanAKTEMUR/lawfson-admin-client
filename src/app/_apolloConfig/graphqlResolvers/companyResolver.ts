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

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($input: updateCompanyInput) {
    updateCompany(input: $input) {
      companyName
      companyPhone
      companyTaxNumber
      companyEmail
      companyTaxOffice
      companyType
      description
      id
      registrationNumber
      sector
      status
      website
    }
  }
`;

export const CREATE_COMPANY_ADDRESS = gql`
  mutation CreateCompanyAddress($input: createCompanyAddressInput) {
    createCompanyAddress(input: $input) {
      msg
      status
    }
  }
`;
