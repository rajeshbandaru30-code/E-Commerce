const express = require('express');
const {
  getCoupons, getActiveCoupons, validateCoupon,
  createCoupon, updateCoupon, deleteCoupon,
} = require('../controllers/couponController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, adminOnly, getCoupons);
router.get('/active', getActiveCoupons);
router.post('/validate', validateCoupon);
router.post('/', protect, adminOnly, createCoupon);
router.put('/:id', protect, adminOnly, updateCoupon);
router.delete('/:id', protect, adminOnly, deleteCoupon);

module.exports = router;
