const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstname: {
      type: String,
    },

    lastname: {
      type: String,
    },

    username: {
      type: String,
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { username: { $type: 'string' } },
      },
    },
    userImage: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: 'string' } },
      },
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { mobile: { $type: 'string' } },
      },
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    plansSubscribed: [
      {
        planId: {
          type: String,
        },
        planName: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = model('User', userSchema);
