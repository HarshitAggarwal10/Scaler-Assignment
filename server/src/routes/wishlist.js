const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require('../controllers/wishlistController');
const { protectRoute } = require('../middleware/auth');

router.get('/', protectRoute, getWishlist);
router.post('/add', protectRoute, addToWishlist);
router.post('/remove', protectRoute, removeFromWishlist);

module.exports = router;
