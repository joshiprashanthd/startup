import { gql } from "apollo-server-express";

export default gql`
  extend type Mutation {
    createConversation(input: !StrictConversationInput): Conversation!
  }
`;
