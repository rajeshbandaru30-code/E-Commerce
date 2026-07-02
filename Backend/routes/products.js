const express = require('express');
const {
  getProducts, getProductById, getRelatedProducts,
  getCategories, getBrands,
  createProduct, updateProduct, deleteProduct, addReview, getMyProducts,
} = require('../controllers/productController');
const { protect, sellerOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/brands', getBrands);
router.get('/my', protect, sellerOnly, getMyProducts);
router.get('/:id', getProductById);
router.get('/:id/related', getRelatedProducts);
router.post('/', protect, sellerOnly, createProduct);
router.put('/:id', protect, sellerOnly, updateProduct);
router.delete('/:id', protect, sellerOnly, deleteProduct);
router.post('/:id/reviews', protect, addReview);

module.exports = router;
