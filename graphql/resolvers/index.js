const user = require('./user');
const menu = require('./menu');
const resolvers = {
  Query: {
    ...user.queryResolver,
    ...menu.queryResolver,
  },

  Mutation: {
    ...user.mutationResolver,
  },
};

module.exports = resolvers;
