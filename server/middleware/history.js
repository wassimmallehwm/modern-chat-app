const History = require('../models/history');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');
var ip = require("ip");

exports.save = (req, details) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    const history = new History({
        code: details.code,
        userId: decodedToken.userId,
        ip: ip.address(),
        //time: d.getTime(),
        message: details.message,
        oldValues: details.oldValues,
        newValues: details.newValues
    });
    history.save().then((result) => {
        console.log('done');
    });
}