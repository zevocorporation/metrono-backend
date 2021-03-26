const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { username: { $type: 'string' } },
      },
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: 'string' } },
      },
    },
    profilePicture: {
      type: String,
    },

    address: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
