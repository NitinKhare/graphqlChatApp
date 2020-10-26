var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({

    name: { type: String },
    body:{type:String},
    group:{  type: mongoose.Schema.Types.ObjectId,ref:"Group"},
    messages:{  type: mongoose.Schema.Types.ObjectId,ref:"User"},
});

module.exports = mongoose.model("Message", MessageSchema);