const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ['VEGETABLE', 'FRUITS', 'DAIRY PRODUCTS', 'SWEETS', 'SNACKS'],
      required: true,
    },
    vendors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
      },
    ],
    transactionID: {
      type: String,
    },
    stockID: {
      type: String,
    },
  },
  { timestamps: true }
);

productSchema.index(
  {
    name: 1,
    category: 1,
  },
  {
    unique: true,
  }
);

module.exports = model('Product', productSchema);
