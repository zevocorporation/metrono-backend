const { buildSchema } = require("graphql");

module.exports = buildSchema(
  `

    type User
    {
        _id:ID!
        name:String!
        mobile:String!
        email:String!
        address:String!
        referralcode:String!
        referralcount:Int!
        chatId:String!
        credits:Int!


    }

    type Order
    {
        _id:ID!
        cuisine:String!
        orderFor:String!
        orderType:String!
        size:String!
        orderStatus:String!
        deliveryPartner:String!
        deliveryStatus:String!
        paymentMode:String!
        paymentId:String!
        paymentStatus:String!
        orderedUser:User!
        chatId:String!
        addon:String!
        createdAt:String!
        updatedAt:String!
        
    }

    type Subscription 
    {
        _id:ID!
        plan:String!
        cuisine:String!
        pack:String!
        delivery:String!
        mealType:String!
        subscribedUser:String!
        paymentId:String!
        paymentStatus:String!
        chatId:String!
        createdAt:String!
        updatedAt:String!
        

    }

    type Wallet
    {
        _id:ID!
        plan:String!
        purchasedUser:User!
        paymentId:String!
        paymentStatus:String!
        createdAt:String!
        updatedAt:String!

    }

    input WalletInput
    {
        plan:String!
        purchasedUser:String!
        paymentId:String!
        paymentStatus:String!

    }

    input SubscriptionInput
    {
        plan:String!
        cuisine:String!
        pack:String!
        mealType:String!
        delivery:String!
        subscribedUser:String!
        paymentId:String!
        paymentStatus:String!
        chatId:String!
    }

    input OrderInput
    {
     
     cuisine:String!
     orderFor:String!
     orderType:String!
     size:String!
     orderStatus:String!
     deliveryPartner:String!
     deliveryStatus:String!
     paymentMode:String!
     paymentId:String!
     paymentStatus:String!
     orderedUser:String!
     chatId:String!
     addon:String!
    }
    input UserInput
    {
     name:String!
     mobile:String!
     email:String!
     address:String! 
     chatId:String!
     
    }
    type RootQuery
    {
        
        users:[User!]!
        orders:[Order!]!
        userexists(chatId:String!):User
        getCredits(chatId:String!):Int
        getPlanDetails(chatId:String!):Subscription
        getCurrentOrders(chatId:String!):[Order]
        getCurrentPlan(chatId:String!,mealType:String!):Subscription
        
        
    }

    type RootMutation
    {
        createUser(userInput:UserInput): User
        setCredits(chatId:String!,credit:Int!):User 
        createOrder(orderInput:OrderInput): Order
        updatePaymentStatus(paymentId:String!):Order
        updateUser(chatId:String!,changeDetail:String!,changeData:String!):User
        walletRecharge(walletInput:WalletInput):Wallet
        updateWalletPaymentStatus(paymentId:String!):Wallet
        createSubscription(subscriptionInput:SubscriptionInput):Subscription
        updateSubscriptionPaymentStatus(paymentId:String!):Wallet
        changeCuisine(chatId:String!,cuisine:String!):Subscription


    }
    
    schema {
        query:RootQuery
        mutation:RootMutation
    }`
);
