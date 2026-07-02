const express = require('express');
const {
  createOrder, getOrderById, getMyOrders,
  getSellerOrders, getAllOrders,
  updateOrderToPaid, updateOrderToDelivered, updateOrderStatus,
  cancelOrder, requestReturn, handleReturnRequest,
  getSalesReport,
} = require('../controllers/orderController');
const { protect, sellerOnly, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/seller', protect, sellerOnly, getSellerOrders);
router.get('/all', protect, adminOnly, getAllOrders);
router.get('/sales-report', protect, sellerOnly, getSalesReport);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/deliver', protect, sellerOnly, updateOrderToDelivered);
router.put('/:id/status', protect, sellerOnly, updateOrderStatus);
router.put('/:id/cancel', protect, cancelOrder);
router.put('/:id/return', protect, requestReturn);
router.put('/:id/return-handle', protect, sellerOnly, handleReturnRequest);

module.exports = router;
