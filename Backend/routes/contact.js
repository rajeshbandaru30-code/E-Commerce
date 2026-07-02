const express = require('express');
const { submitContact, getMessages, markAsRead } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/', submitContact);
router.get('/', protect, adminOnly, getMessages);
router.put('/:id/read', protect, adminOnly, markAsRead);

module.exports = router;
