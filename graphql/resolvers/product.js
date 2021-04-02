const Product = require('../../models/product');
const Vendor = require('../../models/vendor');

exports.queryResolver = {
  getAllProducts: async (_, args) => {
    try {
      return await Product.find().populate('vendors');
    } catch (err) {
      throw err;
    }
  },
  getProductByName: async (_, args) => {
    try {
      const { name } = args;
      const result = await Product.findOne({ name: name });
      return await result.populate('vendors').execPopulate();
    } catch (err) {
      throw err;
    }
  },
};

exports.mutationResolver = {
  addProduct: async (_, args) => {
    try {
      let { name, category, vendorID } = args.productInput;
      const product = new Product({
        name: name,
        category: category,
        vendors: vendorID,
      });
      const result = await product.save();
      for (const item of vendorID) {
        const vendor = await Vendor.findOne({ _id: item });
        vendor.products.push(product._id);
        vendor.save();
      }
      return await result.populate('vendors').execPopulate();
    } catch (err) {
      throw err;
    }
  },
  removeProduct: async (_, args) => {
    try {
      let { name, category } = args.productInput;
      const product = await Product.findOne({
        name: name,
        category: category,
      });

      if (!product) return false;
      const { _id, vendors } = product;
      for (const item of vendors) {
        const vendor = await Vendor.findById(item);
        const index = vendor.products.indexOf(_id);
        vendor.products.splice(index, 1);
        vendor.save();
      }
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
