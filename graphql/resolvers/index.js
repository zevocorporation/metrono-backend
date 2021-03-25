const user = require('./user');
const product = require('./product');
const vendor = require('./vendor');
const resolvers = {
  Query: {
    ...user.queryResolver,
    ...product.queryResolver,
    ...vendor.queryResolver,
  },

  Mutation: {
    ...user.mutationResolver,
    ...product.mutationResolver,
    ...vendor.mutationResolver,
  },
};
module.exports = resolvers;
