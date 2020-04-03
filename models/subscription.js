const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    plan: {
      type: String,
      required: true
    },

    cuisine: {
      type: String,
      required: true
    },

    pack:{
      type:String,
      required: true

    },

    delivery:{
      type:String,
      required:true

    },

    subscribedUser: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    paymentId: {
      type: String,
      required: true
    },

    paymentStatus: {
      type: String,
      required: true
    },
    chatId: {
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
