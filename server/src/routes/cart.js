const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} = require('../controllers/cartController');
const { protectRoute } = require('../middleware/auth');

router.get('/', protectRoute, getCart);
router.post('/add', protectRoute, addToCart);
router.post('/remove', protectRoute, removeFromCart);
router.put('/update', protectRoute, updateCartItem);
router.delete('/clear', protectRoute, clearCart);

module.exports = router;
