import { gql } from "@apollo/client";

export const MESSAGES_OF_COMPANY = gql`
  query MessagesOfCompany {
    messagesOfCompany {
      id
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

export const LASTFIVEMESSAGE = gql`
  query LatestMessagesByReturnStatus {
    latestMessagesByReturnStatus {
      returnedMessages {
        id
        messageHeader
        messageText
        phone
        isReturn
        returnedAdmin {
          id
          userName
        }
        appUser {
          id
          userName
        }
      }
      notReturnedMessages {
        id
        messageHeader
        messageText
        phone
        isReturn
        returnedAdmin {
          id
          userName
        }
        appUser {
          id
          userName
        }
        company {
          id
          companyName
        }
        product {
          id
          productName
          images
          onAd
          inStock
          category {
            id
            categoryName
            fullPathName
          }
          clickedRate
        }
      }
    }
  }
`;

export const MESSAGES_COUNT = gql`
  query MessageCounts {
    messageCounts {
      dailyCount
      weeklyCount
      monthlyCount
    }
  }
`;

export const MESSAGE = gql`
  query MessageGet($input: getWithId) {
    messageGet(input: $input) {
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
        images
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
