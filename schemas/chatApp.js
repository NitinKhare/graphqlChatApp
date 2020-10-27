var { buildSchema } = require('graphql');


/*
TODO:
  remove users query
*/
module.exports.hello = buildSchema(`
  type Query {
    user(name: String, email: String, page: Int, perpage: Int, limit: Int): [User]
    group(name: String, id:String, page: Int, perpage: Int, limit: Int): [Group]
  }

  type User{
    email: String!
    username: String
  }

  
  type Group{
    name: String
    users: [User]
    messages:[Message]
  }

  type Message{
      user: User!
      body: String!
      group: Group!
  }

  type Mutation{
    createUser(email: String, password:String): User
    createGroup(name: String): Group
    createMessage(name: String,body:String, group:String): Message
  }

  input newUserInput{
    name:String
    email: String!
    password: String!
  }

`);