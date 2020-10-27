var User = require('../db/models/User');

module.exports.root = {
  user: async (parentvalues,args, context) => {
    console.log(parentvalues)
    if (parentvalues.email) {
      delete parentvalues.page
      delete parentvalues.perpage
    }
    return require('../utility/EntityCRUD').listEntity(parentvalues, 'User')
  },

  createUser: async (parentvalues,args, context) => {
    try {
      // console.log("Context ",context)
      console.log("Args ",parentvalues)
      return require('../utility/EntityCRUD').createEntity(parentvalues, 'User')
    } catch (e) {
      throw new Error(e)
    }
  },

  createGroup: async (parentvalues,args, context) => {
    try {
      return require('../utility/EntityCRUD').createEntity(parentvalues, 'Group')
    } catch (e) {
      throw new Error(e)
    }
  },
};