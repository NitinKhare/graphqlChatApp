var User = require('../db/models/User');

module.exports.root = {
  user: async (args) => {
    if (args.email) {
      delete args.page
      delete args.perpage
    }
    let filters = require("../utility/generateMongoFilters").generateMongoFilters(args);
    console.log(filters)
    let result = await User.aggregate(filters);
    console.log(result)
    return result
  },

  createUser: async (args) => {
    try {
      console.log(args)
      let newUser = new User({
        ...args
      }); // not hashing the passwords for simplicity
      let createdUser = await newUser.save();
      console.log(createdUser)
      return createdUser
    } catch (e) {
      throw new Error(e)
    }
  }
};