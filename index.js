const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();

require('dotenv').config()

require("./db/connection")



app.use(
  '/hello',
  graphqlHTTP({
    schema: require('./schemas/chatApp').hello,
    rootValue: require('./resolvers/chatApp').root,
    graphiql: true,
  }),
);

app.listen(4000,()=>{
    console.log("The server started running on port 4000")
});
