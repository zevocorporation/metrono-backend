const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstname: String
    lastname: String
    username: String
    userImage: String
    email: String
    mobile: String!
    address: String
    country: String
    plansSubscribed: String
    createdAt: String!
    updatedAt: String!
  }
  type Auth {
    userID: String!
    accessToken: String!
    refreshToken: String!
    accessExpiry: String!
    refreshExpiry: String!
  }
  input UserInput {
    userName: String!
    mobile: String!
  }

  type UserData {
    data: User
    accountCreated: Boolean!
  }

  type Query {
    sendUserOtp(mobile: String!): Boolean!
    verifyUser(mobile: String!, otp: String!): Auth!
    refreshTokens(userID: String!): Auth!
  }

  type Mutation {
    createUser(mobile: String!): UserData
  }
`;

module.exports = typeDefs;
