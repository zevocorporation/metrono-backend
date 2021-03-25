const { gql } = require('apollo-server-express');
const User = require('./user');
const Product = require('./product');
const Vendor = require('./vendor');

const typeDefs = gql`
  ${User.types}
  ${Product.types}
  ${Vendor.types}

  type Query {
      ${User.queries}
      ${Product.queries}
      ${Vendor.queries}
  }
  type Mutation {
      ${User.mutations}
      ${Product.mutations}
      ${Vendor.mutations}
  }
`;

module.exports = typeDefs;
