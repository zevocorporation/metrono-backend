const { Schema, model } = require('mongoose');

const menuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['BREAKFAST', 'LUNCH', 'DINNER'],
      required: true,
    },
    price: {
      type: String,

      required: true,
    },
    day: {
      type: String,
      enum: [
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
      ],
      required: true,
    },
    cuisine: {
      type: String,
      enum: ['NORTHINDIAN', 'SOUTHINDIAN'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('MenuItem', menuItemSchema);
