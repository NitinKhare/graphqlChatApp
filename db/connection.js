const mongoose = require('mongoose')


mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_HOST}`, {
  useNewUrlParser: true,
}).then(()=>{
    console.log("Connected to mongoDB");
})