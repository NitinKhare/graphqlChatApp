const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();

require('dotenv').config()

require("./db/connection")

app.get("/", function(req, res){
  res.redirect("/api")
})


app.use(
  '/api',
  graphqlHTTP((request, response, graphQLParams) => ({
    schema: require('./schemas/chatApp').hello,
    rootValue: require('./resolvers/chatApp').root,
    graphiql: true,
    context:{
      request
    }
  })),
);

app.listen(4000,()=>{
    console.log("The server started running on port 4000")
});
