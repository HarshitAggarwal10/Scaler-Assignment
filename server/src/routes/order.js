const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderHistory,
  getOrderById,
  cancelOrder,
} = require('../controllers/orderController');
const { protectRoute } = require('../middleware/auth');

router.post('/', protectRoute, createOrder);
router.get('/', protectRoute, getOrderHistory);
router.get('/:id', protectRoute, getOrderById);
router.put('/cancel/:id', protectRoute, cancelOrder);

module.exports = router;
