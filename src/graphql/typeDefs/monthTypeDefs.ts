import { gql } from "apollo-server-core";

export const monthTypeDefs = gql`
  type Month {
    id: String!
    """
    Month number is from 0 to 11 like javascript pattern
    """
    number: Int!
    year: Int!
  }

  type Query {
    months: [Month]
  }
  
  input CreateMonthInput {
    number: Int!
    year: Int!
  }
  
  type Mutation {
    createMonth(input: CreateMonthInput): Month
  }
`
