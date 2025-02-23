const express = require('express');
const router = express.Router();
const { getCartByUserId, addCartItem } = require('../controllers/cartController');


// API: Lấy giỏ hàng theo user ID
router.get('/cart/:userId', getCartByUserId);
router.post('/cart-items', addCartItem);

module.exports = router;
