exports.types = `

enum Category{
    VEGETABLE
    FRUIT
    SNACKS
    SWEETS
    DAIRY PRODUCTS
}
type Product {
    _id: ID!
    name: String!
    category:Category!
    vendorID:String
    transactionID:String
    stockID:String
    createdAt: String!
    updatedAt: String!
  }

  input ProductInput{
    name: String!
    category:Category!
  }
`;

exports.queries = `
    getAllProducts:[Product]!
    getProductByName(name:String!):Product
    `;

exports.mutations = `
    addProduct(productInput:ProductInput):Product!
    removeProduct(productInput:ProductInput):Boolean!
    `;
