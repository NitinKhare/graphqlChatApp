var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
    body:{type:String},
    group:{  type: mongoose.Schema.Types.ObjectId,ref:"Group"},
    user:{  type: mongoose.Schema.Types.ObjectId,ref:"User"},
});

module.exports = mongoose.model("Message", MessageSchema);