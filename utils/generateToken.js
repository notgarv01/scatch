const jwt = require('jsonwebtoken')


const generateToken = (user) => {
    return jwt.sign({email: user.email, id: user._id}, process.env.JWT_KEY )
}
const generateToken1 = (owner) => {
    return jwt.sign({email: owner.email, id: owner._id}, process.env.JWT_KEY )
}

module.exports.generateToken = generateToken;
module.exports.generateToken1 = generateToken1;