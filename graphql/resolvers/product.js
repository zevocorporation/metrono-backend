const Product = require('../../models/product');

exports.queryResolver = {
  getAllProducts: async (_, args) => {
    try {
      return await Product.find();
    } catch (err) {
      throw err;
    }
  },
  getProductByName: async (_, args) => {
    try {
      const { name } = args;
      return await Product.findOne({ name: name });
    } catch (err) {
      throw err;
    }
  },
};

exports.mutationResolver = {
  addProduct: async (_, args) => {
    try {
      let { name, category } = args.productInput;
      const product = new Product({
        name: name,
        category: category,
      });
      const result = await product.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
  removeProduct: async (_, args) => {
    try {
      let { name, category } = args.productInput;
      const result = await Product.deleteOne({
        name: name,
        category: category,
      });
      if (result.deletedCount == 1) return true;
      else return false;
    } catch (err) {
      throw err;
    }
  },
};
