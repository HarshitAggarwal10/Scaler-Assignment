const express = require('express');
const router = express.Router();
const { signup, login, getCurrentUser, updateProfile } = require('../controllers/authController');
const { protectRoute } = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protectRoute, getCurrentUser);
router.put('/profile', protectRoute, updateProfile);

module.exports = router;
