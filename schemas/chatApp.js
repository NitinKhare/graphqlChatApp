var { buildSchema } = require('graphql');


/*
TODO:
  remove users query
*/
module.exports.hello = buildSchema(`
  type Query {
    user(name: String, email: String, page: Int, perpage: Int, limit: Int): [User]
    group(name: String, createdBy:String, page: Int, perpage: Int, limit: Int): [Group]
  }

  type User{
    email: String!
    password:String!
    username: String
  }

  
  type Group{
    name: String
    users: [User]
    messages:[Message]
    createdBy:User!
  }

  type Message{
      user: User
      body: String!
      group: Group
  }

  type Mutation{
    createUser(email: String!, password:String!): auth!
    createGroup(name: String): Group
    createMessage(body:String!): Message
    login(email:String!, password:String!):auth!
  }

  type auth{
    token: String!
    user: User!
  }

  input newUserInput{
    name:String
    email: String!
    password: String!
  }

`);