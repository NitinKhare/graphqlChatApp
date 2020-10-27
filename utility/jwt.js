let jwt = require('jsonwebtoken');

module.exports.createJWT = (payload)=>{
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'1d'})
}

module.exports.verify = (token)=>{
    if(!token) throw new Error("No Token Found");
    let user = jwt.verify(token.split('Bearer').pop(), process.env.SECRET_KEY);
    return user
}
