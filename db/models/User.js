var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({

    name: { type: String },
    username: { type: String },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    admin: { type: Number}
});

module.exports = mongoose.model("User", UserSchema);