const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');


router.post("/signup", userController.createUser);

router.post("/login", userController.loginUser);

// router.post("/getOne/:id", userController.getUser);

router.post("/lastCnx/:id", checkAuth, userController.setCnxDate);

router.post("/currentUser", userController.getCurrentUser);

module.exports = router;