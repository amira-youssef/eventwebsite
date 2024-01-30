const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

module.exports = router;
