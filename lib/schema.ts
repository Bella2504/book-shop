export const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    status: String!
  }

  type Item {
    id: ID!
    title: String!
    path: String!
    albumId: Float
    url: String!
    thumbnailUrl: String!
  }

  type ItemsInfo {
    items: [Item!]!
    pagesCount: Int!
  }

  type Query {
    viewer: User!
    items(limit: Int!, start: Int!): ItemsInfo
  }

  type Mutation {
    updateName(name: String!): User!
  }
`;

export default typeDefs;
