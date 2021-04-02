const Vendor = require('../../models/vendor');
const Product = require('../../models/product');

exports.queryResolver = {
  getAllVendors: async (_, args) => {
    try {
      return await Vendor.find().populate('products');
    } catch (err) {
      throw err;
    }
  },
  getVendorByID: async (_, args) => {
    try {
      const { id } = args;
      return await Vendor.findById(id).populate('products').execPopulate();
    } catch (err) {
      throw err;
    }
  },
};

exports.mutationResolver = {
  addVendor: async (_, args) => {
    try {
      let { name, imageURL } = args.vendorInput;
      const vendor = new Vendor({
        name: name,
        imageURL: imageURL,
      });
      const result = await vendor.save();
      return result;
    } catch (err) {
      throw err;
    }
  },

  removeVendor: async (_, args) => {
    try {
      let { id } = args;
      const vendor = await Vendor.findById(id);

      if (!vendor) return false;
      const { products } = vendor;
      for (const item of products) {
        const product = await Product.findById(item);
        const index = product.vendors.indexOf(id);
        product.vendors.splice(index, 1);
        product.save();
      }
      const result = await Vendor.deleteOne({
        _id: id,
      });
      if (result.deletedCount == 1) return true;
      else return false;
    } catch (err) {
      throw err;
    }
  },
};
