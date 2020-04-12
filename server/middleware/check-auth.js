const jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = (req, res, next) => {
    //const token = req.query.auth;
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, config.secretJWT);
        req.userData = {
            userId: decodedToken.userId
        };
        next();
    } catch(error) {
        res.status(401).json({ message: "You are not authenticated !"});
    }

}