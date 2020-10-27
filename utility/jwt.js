let jwt = require('jsonwebtoken');

module.exports.createJWT = (payload)=>{
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'1d'})
}

module.exports.verify = async(token)=>{
    return jwt.verify(token, process.env.SECRET_KEY);
}
