let User = require('../db/models/User');
let { verify } = require("../utility/jwt");


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
      let user = await require('../utility/EntityCRUD').getEntity(groups[i].createdBy, 'User')
      console.log("User", user)
      groups[i].createdBy = user
      if(i== groups.length -1) return groups  // find a better way 
    }
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
  addToGroup: async (parentvalues,args,context) =>{
    let headers = args.request.headers.authorization;
    let user = verify(headers);
    //fetch user to check if there is another group if yes delete its messages from that group
    let group = await require('../utility/EntityCRUD').getEntity(parentvalues.groupId, 'Group')
   // console.log("Group", group)
    if(!group) throw new Error("No Such Group Exists");
    //add User to group array
    let updateGroup ={"$addToSet":{users:user.id}}
    let updatedGroup = await require('../utility/EntityCRUD').updateEntity(group._id,updateGroup, 'Group')
    //console.log("UpdatedGroup ", updatedGroup)
    //add Group in User 
    let data = {group: group._id}
    let updatedUser = await require('../utility/EntityCRUD').updateEntity(user.id,data, 'User')
    console.log("updateUser", updatedUser)
    return updatedUser;
  },

  sendMessage:async (parentvalues,args,context)=>{
    //Create A message
    console.log("Inside Create message")
    let headers = args.request.headers.authorization;
    let user = verify(headers);
    user = await require('../utility/EntityCRUD').getEntity(user.id, 'User')
    if(!user || !user.group) throw new Error("User has not joined any group yet")
    let group = await require('../utility/EntityCRUD').getEntity(user.group, 'Group')
   // console.log("Group", group)
    if(!group) throw new Error("No Such group found")
    let message = {
      body: parentvalues.body,
      group:group._id,
      user:user.id
    }
    message = await require('../utility/EntityCRUD').createEntity(message, 'Message')
   // console.log("Message", message)
    let updateGroupData = {"$push":{messages:message._id}}
    let updatedGroup = await require('../utility/EntityCRUD').updateEntity(group._id,updateGroupData, 'Group')
   // console.log("UpdatedGroup", updatedGroup)
    return parentvalues.body
    //Update Group to have that Message Id

  }
};

  // createMessage: async (parentvalues, args, context) => {
  //   try {
  //     let headers = args.request.headers.authorization;
  //     let user = verify(headers);
  //     parentvalues.user = user._id;
  //     parentvalues.group = user.group
  //     return require('../utility/EntityCRUD').createEntity(parentvalues, 'Message')
  //   } catch (e) {
  //     throw new Error(e)
  //   }
  // },