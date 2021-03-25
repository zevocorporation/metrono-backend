exports.types = `

type Vendor {
    _id: ID!   
    name: String!
    imageURL:String!
    product:[Product!]
    createdAt: String!
    updatedAt: String!
  }

  input VendorInput {
    name: String!
    imageURL:String!
  }
`;

exports.queries = `
    getAllVendors:[Vendor!]
    getVendorByID(id:String!):Vendor!
    `;

exports.mutations = `
      addVendor(vendorInput:VendorInput):Vendor!
    `;