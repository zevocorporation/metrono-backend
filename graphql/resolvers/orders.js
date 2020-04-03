const Order = require("../../models/order");

module.exports = {
  orders: async () => {
    try {
      const orders = await Order.find().populate("orderedUser");
      return orders.map(order => {
        return {
          ...order._doc,
          _id: order.id,
          createdAt: new Date(order._doc.createdAt).toLocaleString(),
          updatedAt: new Date(order._doc.updatedAt).toLocaleString()
        };
      });
    } catch (err) {
      throw err;
    }
  },

  updatePaymentStatus: async args => {
    try {
      const order = await Order.findOne({ paymentId: args.paymentId });
      if (order) {
        order.paymentStatus = "Paid";
        order.save();
        return {
          ...order._doc,
          _id: order.id,
          createdAt: new Date(order._doc.createdAt).toLocaleString(),
          updatedAt: new Date(order._doc.updatedAt).toLocaleString()
        };
      }
    } catch (err) {
      throw err;
    }
  },

  createOrder: async args => {
    try {
      const order = new Order({
        cuisine: args.orderInput.cuisine,
        orderFor: args.orderInput.orderFor,
        orderType: args.orderInput.orderType,
        size: args.orderInput.size,
        orderStatus: args.orderInput.orderStatus,
        deliveryPartner: args.orderInput.deliveryPartner,
        deliveryStatus: args.orderInput.deliveryStatus,
        paymentMode: args.orderInput.paymentMode,
        paymentId: args.orderInput.paymentId,
        paymentStatus: args.orderInput.paymentStatus,
        orderedUser: args.orderInput.orderedUser,
        chatId: args.orderInput.chatId,
        addon: args.orderInput.addon
      });

      const result = await order.save();
      return {
        ...result._doc,
        _id: result.id,
        createdAt: new Date(order._doc.createdAt).toLocaleString(),
        updatedAt: new Date(order._doc.updatedAt).toLocaleString()
      };
    } catch (err) {
      throw err;
    }
  },

  getCurrentOrders: async(args)=>{
      try{

        const orders=await Order.find({chatId:args.chatId,paymentStatus:"Paid"});
       
          return orders.map(order => {
            return {
              ...order._doc,
              _id: order.id,
              createdAt: new Date(order._doc.createdAt).toLocaleString(),
              updatedAt: new Date(order._doc.updatedAt).toLocaleString()
            };
          });

            // return order;

        

      }
      catch(err)
      {
          throw err;
      }
  }
};
