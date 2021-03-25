const Vendor = require('../../models/vendor');

exports.queryResolver = {
  getAllVendors: async (_, args) => {
    try {
      return await Vendor.find();
    } catch (err) {
      throw err;
    }
  },
  getVendorByID: async (_, args) => {
    try {
      const { id } = args;
      return await Vendor.findById(id);
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
};
