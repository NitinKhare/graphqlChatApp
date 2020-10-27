var mongoose = require('mongoose');

var GroupSchema = mongoose.Schema({

    name: { type: String },
    users:[{  type: mongoose.Schema.Types.ObjectId,ref:"User"}],
    messages:[{  type: mongoose.Schema.Types.ObjectId,ref:"Message"}],
    createdBy:{  type: mongoose.Schema.Types.ObjectId,ref:"User"}
});

module.exports = mongoose.model("Group", GroupSchema);