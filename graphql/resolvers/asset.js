const Asset = require('../../models/asset');

exports.queryResolver = {
  getAllAssets: async (_, args) => {
    try {
      return await Asset.find();
    } catch (err) {
      throw err;
    }
  },
  getAssetByID: async (_, args) => {
    try {
      const { id } = args;
      return await Asset.findById(id);
    } catch (err) {
      throw err;
    }
  },
};

exports.mutationResolver = {
  addAsset: async (_, args) => {
    try {
      let {
        name,
        assetID,
        price,
        purchasedOn,
        manufacturedOn,
        depriciatingValue,
      } = args.assetInput;
      const asset = new Asset({
        name: name,
        assetID: assetID,
        price: price,
        purchasedOn: purchasedOn,
        manufacturedOn: manufacturedOn,
        depriciatingValue: depriciatingValue,
      });
      const result = await asset.save();
      return result;
    } catch (err) {
      throw err;
    }
  },

  removeAsset: async (_, args) => {
    try {
      let { id } = args;
      const result = await Asset.deleteOne({
        _id: id,
      });
      if (result.deletedCount == 1) return true;
      else return false;
    } catch (err) {
      throw err;
    }
  },
};
