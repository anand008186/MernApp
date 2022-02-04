const jwt =require('jsonwebtoken');
const User = require("../db/userschema")

const Authenticate = async ( req ,res ,next) => {
    
try {
    
    const token = req.cookies.jwtoken ;
    // console.log(token);
    const verifyToken = jwt.verify(token , process.env.SECRET_KEY);
    // console.log(verifyToken)
    const rootUser = await User.findOne({_id:verifyToken._id , "tokens.token" :token})
    // console.log(rootUser)

    if (!rootUser){ throw new Error("User not found")} 
    req.token = token ;
    req.rootuser = rootUser ;
    req.userId = rootUser._id ;
    next();
} catch (error) {
    res.status(401).send('Unauthorized: No token provided')
    // console.log(error) ;

}

}

module.exports = Authenticate ;