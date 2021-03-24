const user = require('./user');
const product = require('./product');
const resolvers = {
  Query: {
    ...user.queryResolver,
    ...product.queryResolver,
  },

  Mutation: {
    ...user.mutationResolver,
    ...product.mutationResolver,
  },
};
module.exports = resolvers;
