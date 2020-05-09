const Subscription=require('../../models/subscription');

module.exports ={

    createSubscription: async(args)=>{
        const subscription =new Subscription(
            {
                plan:args.subscriptionInput.plan,
                cuisine:args.subscriptionInput.cuisine,
                pack:args.subscriptionInput.pack,
                mealType:args.subscriptionInput.mealType,
                delivery:args.subscriptionInput.delivery,
                subscribedUser:args.subscriptionInput.subscribedUser,
                paymentId:args.subscriptionInput.paymentId,
                paymentStatus:args.subscriptionInput.paymentStatus,
                chatId:args.subscriptionInput.chatId

            }
        )

        const result =await subscription.save();
        return {...result._doc};


    },

    updateSubscriptionPaymentStatus: async (args)=>{
        try{
            const subscription=await Subscription.findOne({paymentId:args.paymentId});
            if (subscription)
            {
                subscription.paymentStatus="Paid";
                subscription.save();
                return {...subscription._doc,_id:subscription.id,createdAt:new Date(subscription._doc.createdAt).toLocaleString(),
                    updatedAt:new Date(subscription._doc.updatedAt).toLocaleString()};
            }
            

        }
        catch(err)
        {
            throw err;
        }
    },

    getPlanDetails: async(args)=>{
        try{

            const subscription=await Subscription.findOne({chatId:args.chatId,paymentStatus:"Paid"}).sort({createdAt: -1});
            if (subscription)
            {
                
                return {...subscription._doc,_id:subscription.id,createdAt:new Date(subscription._doc.createdAt).toLocaleString(),
                    updatedAt:new Date(subscription._doc.updatedAt).toLocaleString()};
            }


        }
        catch(err)
        {
            throw err;
        }
    },
    changeCuisine :async (args)=>{
        try{
            const subscription=await Subscription.findOne({chatId:args.chatId,paymentStatus:"Paid"}).sort({createdAt: -1});
            if (subscription)
            {
                subscription.cuisine=args.cuisine;
                subscription.save();
                return {...subscription._doc,_id:subscription.id,createdAt:new Date(subscription._doc.createdAt).toLocaleString(),
                    updatedAt:new Date(subscription._doc.updatedAt).toLocaleString()};
            }

        }
        catch(err)
        {
            throw err;
        }
    }


}