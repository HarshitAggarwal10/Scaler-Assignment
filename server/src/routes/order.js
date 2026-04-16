const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderHistory,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protectRoute, authorize } = require('../middleware/auth');

router.post('/', protectRoute, createOrder);
router.get('/', protectRoute, getOrderHistory);
router.get('/:id', protectRoute, getOrderById);
router.put('/cancel/:id', protectRoute, cancelOrder);
router.put('/:id/status', protectRoute, authorize('admin'), updateOrderStatus);

module.exports = router;
