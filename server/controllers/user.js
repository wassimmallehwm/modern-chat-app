const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
var ip = require("ip");
var config = require('../config/config');


exports.createUser = (req, res, next) => {
  User.find({ username: req.body.username }).count().then((result) => {
    if (result > 0) {
      res.status(500).json({
        message: 'Username already registred !'
      });
    }
  });
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: 'Invalid authentication credentials!'
        });
      });
  });
}

exports.loginUser = (req, res, next) => {
  let fetchedUser;
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Invalid authentication credentials!'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Invalid authentication credentials!'
        });
      }
      const token = jwt.sign(
        { userId: fetchedUser._id },
        config.secretJWT
      );
      res.status(200).json({
        token: token,
        user: fetchedUser
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Invalid authentication credentials!'
      });
    });
}

exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then(data => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching User failed!'
    })
  });
}
exports.setCnxDate = (req, res, next) => {
  const obj = {
    lastCnx: req.body.lastCnx
  };
  User.findOneAndUpdate({_id: req.params.id}, obj).then(data => {
    if (data) {
      res.status(201).json(data);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching User failed!'
    })
  });
}

exports.getCurrentUser = (req, res) => {
  if (req.headers && req.headers.authorization) {
      var authorization = req.headers.authorization,
          decoded;
      try {
          decoded = jwt.verify(authorization.split(" ")[1], config.secretJWT);
      } catch (e) {
          return res.status(401).send('unauthorized');
      }
      var userId = decoded.userId;
      User.findOne({ _id: userId }, {password: 0}).then(result => {
          if(result) {
              res.send(result);
          }
      });
  }
}