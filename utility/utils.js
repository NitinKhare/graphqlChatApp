const bcrypt = require('bcryptjs')

module.exports.hashPassword = async (password)=>{
    let pass = await bcrypt.hash(password, 10)
    return pass
}

module.exports.verifyPass = async (hashedPassword, password)=>{
    let pass = await bcrypt.compare(password, hashedPassword)
    return pass
}