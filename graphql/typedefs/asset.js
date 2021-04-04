exports.types = `


type Asset {
    _id: ID!
    name: String!
    assetID: String!
    price:Int!
    purchasedOn:Date!
    manufacturedOn:Date!
    depriciatingValue:String!
    createdAt: String!
    updatedAt: String!
  }

  input AssetInput{
    name: String!
    assetID: String!
    price:Int!
    purchasedOn:Date!
    manufacturedOn:Date!
    depriciatingValue:String!
  }
`;

exports.queries = `
    getAllAssets:[Asset]!
    getAssetByID(assetID: String!):Asset
    `;

exports.mutations = `
    addAsset(assetInput:AssetInput):Asset!
    removeAsset(id:String!):Boolean!
    `;
