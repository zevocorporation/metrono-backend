const Wallet= require('../../models/wallet');

module.exports ={
    walletRecharge: async(args)=>{
        try{
            const wallet= new Wallet(
                {
                    plan : args.walletInput.plan,
                    purchasedUser :args.walletInput.purchasedUser,
                    paymentId: args.walletInput.paymentId,
                    paymentStatus: args.walletInput.paymentStatus
                }
            )
            const result=await wallet.save()
            return {...result._doc,_id:result.id};

        }
        catch(err)
        {
            console.log(err)
            throw err;
        }
    },

    updateWalletPaymentStatus : async(args)=>{
        try{
            const wallet=await Wallet.findOne({paymentId:args.paymentId});
            if (wallet)
            {
                wallet.paymentStatus="Paid";
                wallet.save();
                return {...wallet._doc,_id:wallet.id,createdAt:new Date(wallet._doc.createdAt).toLocaleString(),
                    updatedAt:new Date(wallet._doc.updatedAt).toLocaleString()};
            }
         }
        catch(err)
        {
            throw err;

        }
    }
}