const Subscription = require("../../models/subscription");

module.exports = {
  createSubscription: async (args) => {
    const subscription = new Subscription({
      plan: args.subscriptionInput.plan,
      cuisine: args.subscriptionInput.cuisine,
      pack: args.subscriptionInput.pack,
      mealType: args.subscriptionInput.mealType,
      delivery: args.subscriptionInput.delivery,
      subscribedUser: args.subscriptionInput.subscribedUser,
      paymentId: args.subscriptionInput.paymentId,
      paymentStatus: args.subscriptionInput.paymentStatus,
      chatId: args.subscriptionInput.chatId,
    });

    const result = await subscription.save();
    return { ...result._doc };
  },

  updateSubscriptionPaymentStatus: async (args) => {
    try {
      const subscription = await Subscription.findOne({
        paymentId: args.paymentId,
      });
      if (subscription) {
        subscription.paymentStatus = "Paid";
        subscription.save();
        return {
          ...subscription._doc,
          _id: subscription.id,
          createdAt: new Date(subscription._doc.createdAt).toLocaleString(),
          updatedAt: new Date(subscription._doc.updatedAt).toLocaleString(),
        };
      }
    } catch (err) {
      throw err;
    }
  },

  getPlanDetails: async (args) => {
    try {
      const Breakfast = await Subscription.findOne({
        chatId: args.chatId,
        mealType: "Breakfast",
        paymentStatus: "Paid",
      }).sort({ createdAt: -1 });
      const Lunch = await Subscription.findOne({
        chatId: args.chatId,
        mealType: "Lunch",
        paymentStatus: "Paid",
      }).sort({ createdAt: -1 });
      const Dinner = await Subscription.findOne({
        chatId: args.chatId,
        mealType: "Dinner",
        paymentStatus: "Paid",
      }).sort({ createdAt: -1 });

      let subscriptions = [];

      if (Breakfast) subscriptions.push(Breakfast);
      if (Lunch) subscriptions.push(Lunch);
      if (Dinner) subscriptions.push(Dinner);

      return subscriptions.map((subscription) => {
        return {
          ...subscription._doc,
          createdAt: new Date(subscription._doc.createdAt).toLocaleString(),
        };
      });
    } catch (err) {
      throw err;
    }
  },

  getCurrentPlan: async (args) => {
    try {
      const subscription = await Subscription.findOne({
        chatId: args.chatId,
        mealType: args.mealType,
        paymentStatus: "Paid",
      }).sort({ createdAt: -1 });
      if (subscription) {
        return {
          ...subscription._doc,
          _id: subscription.id,
          createdAt: new Date(subscription._doc.createdAt).toLocaleString(),
          updatedAt: new Date(subscription._doc.updatedAt).toLocaleString(),
        };
      }
    } catch (err) {
      throw err;
    }
  },

  changeCuisine: async (args) => {
    try {
      const subscription = await Subscription.findOne({
        chatId: args.chatId,
        paymentStatus: "Paid",
      }).sort({ createdAt: -1 });
      if (subscription) {
        subscription.cuisine = args.cuisine;
        subscription.save();
        return {
          ...subscription._doc,
          _id: subscription.id,
          createdAt: new Date(subscription._doc.createdAt).toLocaleString(),
          updatedAt: new Date(subscription._doc.updatedAt).toLocaleString(),
        };
      }
    } catch (err) {
      throw err;
    }
  },

  checkSubscription: async (args) => {
    try {
      const subscription = await Subscription.findOne({
        chatId: args.chatId,
        mealType: args.mealType,
        delivery: "Home Delivery",
        paymentStatus: "Paid",
      }).sort({ createdAt: -1 });

      let validity = 0;

      if(!subscription) return false;
      

      const today = new Date();
      const plandate = new Date(subscription.createdAt);
      dayDifference = Math.floor(
        (today.getTime() - plandate.getTime()) / (1000 * 3600 * 24)
      );

      if (subscription.plan == "7 day plan") {
        validity = 7 - dayDifference;
      } else if (subscription.plan == "28 day plan") {
        validity = 28 - dayDifference;
      }

      if (validity > 0) return true;
      else return false;
    } catch (err) {
      throw err;
    }
  },
};
