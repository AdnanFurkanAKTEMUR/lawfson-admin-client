import { gql } from "@apollo/client";

export const SAY_HELLO = gql`
  query SayHello {
    sayHello {
      hello
    }
  }
`;
