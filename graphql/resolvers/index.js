//import models
const userResolver =require('./users')
const orderResolver=require('./orders')
const walletResolver=require('./wallets')
const subscriptionResolver=require('./subscriptions')

const rootResolver ={
    ...userResolver,
    ...orderResolver,
    ...walletResolver,
    ...subscriptionResolver
};

module.exports =rootResolver;
