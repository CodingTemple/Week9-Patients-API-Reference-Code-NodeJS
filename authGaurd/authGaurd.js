// Import JsonWebToken

const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        // Try and get a token from the URL Headers
        let token = req.headers.authorization.split(" ")[1] // Bearer 
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.userData = verified
        next()
    } catch(err){
        return res.status(401).json({message: 'AUTH FAILED'})
    }
}