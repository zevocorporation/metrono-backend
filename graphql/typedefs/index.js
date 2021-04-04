const { gql } = require('apollo-server-express');
const User = require('./user');
const Product = require('./product');
const Vendor = require('./vendor');
const Asset = require('./asset');

const typeDefs = gql`
  scalar Date
  ${User.types}
  ${Product.types}
  ${Vendor.types}
  ${Asset.types}

  type Query {
      ${User.queries}
      ${Product.queries}
      ${Vendor.queries}
      ${Asset.queries}
  }
  type Mutation {
      ${User.mutations}
      ${Product.mutations}
      ${Vendor.mutations}
      ${Asset.mutations}
  }
`;

module.exports = typeDefs;
