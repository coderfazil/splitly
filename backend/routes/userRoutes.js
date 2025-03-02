const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', registerUser);  // 👈 This should match frontend request
router.post('/login', loginUser);

module.exports = router;
