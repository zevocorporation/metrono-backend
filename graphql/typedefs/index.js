const { gql } = require('apollo-server-express');
const User = require('./user');
const Product = require('./product');

const typeDefs = gql`
  ${User.types}
  ${Product.types}

  type Query {
      ${User.queries}
      ${Product.queries}
  }
  type Mutation {
      ${User.mutations}
      ${Product.mutations}
  }
`;

module.exports = typeDefs;
