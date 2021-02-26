exports.types = `

enum OrderType {
    BREAKFAST
    LUNCH
    DINNER
  }

enum Cuisine{
    NORTHINDIAN
    SOUTHINDIAN
  }



enum Day {
    MONDAY
    TUESDAY
    WEDNESDAY
    THRUSDAY
    FRIDAY
    SATURDAY
    SUNDAY
  }

type MenuItem {
    _id: ID!
    name:String!
    description:String!
    imageURL:String!
    type: OrderType!
    price:Int!
    day:Day!
    cuisine:Cuisine!
}

input MenuItemInput{
    name:String!
    description:String!
    imageURL:String!
    type: OrderType!
    price:Int!
    day:Day!
    cuisine:Cuisine!
}
`;

exports.queries = `
    getTodayMenu(cuisine:Cuisine):[MenuItem!]!
    getTomorrowMenu(cuisine:Cuisine):[MenuItem!]!
`;
