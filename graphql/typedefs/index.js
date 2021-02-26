const { gql } = require('apollo-server-express');
const User = require('./user');
const Menu = require('./menu');

const typeDefs = gql`
  ${User.types}
  ${Menu.types}


  type Query {
    ${User.queries}
    ${Menu.queries}
   
  }

  type Mutation {
    ${User.mutations}
  }

`;

module.exports = typeDefs;
