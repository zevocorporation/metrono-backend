const mongoose=require('mongoose')
const Schema =mongoose.Schema

const walletSchema= new Schema(
    {
        plan :{
            type: String,
            required: true
        },

        purchasedUser :{
            type : Schema.Types.ObjectId,
            ref:'User' 
        },

        paymentId :
        {
            type:String,
            required:true
    
        },
    
        paymentStatus :
        {
            type:String,
            required:true
    
        },

    },{
        timestamps:true
    }
    
);


module.exports=mongoose.model('Wallet',walletSchema)


