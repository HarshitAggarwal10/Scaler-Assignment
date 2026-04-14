const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getCategories,
  createProduct,
  updateProduct,
} = require('../controllers/productController');
const { protectRoute, authorize } = require('../middleware/auth');

router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);
router.post('/', protectRoute, authorize('admin'), createProduct);
router.put('/:id', protectRoute, authorize('admin'), updateProduct);

module.exports = router;
