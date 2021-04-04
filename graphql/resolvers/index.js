const { GraphQLScalarType, Kind } = require('graphql');
const user = require('./user');
const product = require('./product');
const vendor = require('./vendor');
const asset = require('./asset');
const resolvers = {
  Query: {
    ...user.queryResolver,
    ...product.queryResolver,
    ...vendor.queryResolver,
    ...asset.queryResolver,
  },

  Mutation: {
    ...user.mutationResolver,
    ...product.mutationResolver,
    ...vendor.mutationResolver,
    ...asset.mutationResolver,
  },

  Date: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Custom date scalar',
    serialize(value) {
      return value.toDateString() + ' IST';
    },
  }),
};

module.exports = resolvers;
