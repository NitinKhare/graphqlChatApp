let User = require('../db/models/User');
let { verify } = require("../utility/jwt");

class Group{
  constructor(){

  }
  getUser(){

  }
}



module.exports.root = {
  user: async (parentvalues, args, context) => {
    if (parentvalues.email) {
      delete parentvalues.page
      delete parentvalues.perpage
    }
    return require('../utility/EntityCRUD').listEntity(parentvalues, 'User')
  },

  group:async (parentvalues, args, context) => {
    let groups = await require('../utility/EntityCRUD').listEntity(parentvalues, 'Group')
    for(let i=0; i<groups.length; i++){
      let user = await require('../utility/EntityCRUD').listEntity({_id:groups[i].createdBy}, 'User')
      console.log("User", user)
      groups[i].createdBy = user[0]
      if(i== groups.length -1) return groups  // find a better way 
    }
    // return groups;
  },

  createUser: async (parentvalues, args, context) => {
    try {
      parentvalues.password = await require('../utility/utils').hashPassword(parentvalues.password)
      let user = require('../utility/EntityCRUD').createEntity(parentvalues, 'User')
      return {
        user,
        token: require("../utility/jwt").createJWT({ id: user._id, email: user.email })
      }
    } catch (e) {
      throw new Error(e)
    }
  },

  login: async (parentvalues, args, context) => {
    let pass = parentvalues.password
    delete parentvalues.password
    let user = await require('../utility/EntityCRUD').listEntity(parentvalues, 'User')
    if (!user || !user.length) throw new Error("Email or Pass is wrong")
    let founduser = user[0];
    let isSamePass = require("../utility/utils").verifyPass(pass, founduser.password)
    if (!isSamePass) throw new Error("Email or Pass is wrong")
    return {
      user: user[0],
      token: require("../utility/jwt").createJWT({ id: user[0]._id, email: user[0].email })
    }
  },

  createGroup: async (parentvalues, args, context) => {
    try {
      let headers = args.request.headers.authorization;
      let user = verify(headers);
      parentvalues.createdBy = user.id
      console.log("Parent ", parentvalues)
      return require('../utility/EntityCRUD').createEntity(parentvalues, 'Group')
    } catch (e) {
      throw new Error(e)
    }
  },

  createMessage: async (parentvalues, args, context) => {
    try {
      let headers = args.request.headers.authorization;
      let user = verify(headers);
      parentvalues.user = user._id;
      parentvalues.group = user.group
      return require('../utility/EntityCRUD').createEntity(parentvalues, 'Message')
    } catch (e) {
      throw new Error(e)
    }
  }
};