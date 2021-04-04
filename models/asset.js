const { Schema, model } = require('mongoose');

const assetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assetID: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    purchasedOn: {
      type: Date,
      required: true,
    },
    manufacturedOn: {
      type: Date,
      required: true,
    },
    depriciatingValue: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Asset', assetSchema);
