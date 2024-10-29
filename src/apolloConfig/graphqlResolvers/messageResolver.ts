import { gql } from "@apollo/client";

export const MESSAGES_OF_COMPANY = gql`
  query MessagesOfCompany {
    messagesOfCompany {
      id
      adminNote
      appUser {
        userName
        id
      }
      isReturn
      messageHeader
      product {
        id
        productName
      }
      returnedAdmin {
        id
        userName
      }
      createdAt
      updatedAt
    }
  }
`;

export const MESSAGE = gql`
  query MessageGet($input: getWithId) {
    messageGet(input: $input) {
      adminNote
      appUser {
        id
        email
        userName
        phone
      }
      id
      createdAt
      isReturn
      messageHeader
      messageText
      phone
      product {
        id
        image
        productName
        category {
          categoryName
        }
      }
      returnedAdmin {
        id
        email
        phone
        userName
      }
      updatedAt
    }
  }
`;

export const UPDATE_MESSAGE = gql`
  mutation MessageUpdate($input: updateMessageInput) {
    messageUpdate(input: $input) {
      id
    }
  }
`;
