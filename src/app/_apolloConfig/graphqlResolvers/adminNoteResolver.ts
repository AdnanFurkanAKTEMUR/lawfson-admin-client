import { gql } from "@apollo/client";

export const ADMINNOTE_OF_MESSAGE = gql`
  query AdminNotesOfMessage($input: adminNotesInput) {
    adminNotesOfMessage(input: $input) {
      id
      createdAt
      note
      adminUser {
        id
        userName
        role
      }
    }
  }
`;

export const ADMINNOTE_CREATE = gql`
  mutation AdminNoteCreate($input: adminNoteCreateInput) {
    adminNoteCreate(input: $input) {
      id
    }
  }
`;

export const ADMINNOTE_DELETE = gql`
  mutation AdminNoteDelete($input: getWithId) {
    adminNoteDelete(input: $input) {
      msg
      status
    }
  }
`;
