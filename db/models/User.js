var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({

    name: { type: String },
    username: { type: String },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    admin: { type: Number},
    group:{  type: mongoose.Schema.Types.ObjectId,ref:"Group"},
});

module.exports = mongoose.model("User", UserSchema);