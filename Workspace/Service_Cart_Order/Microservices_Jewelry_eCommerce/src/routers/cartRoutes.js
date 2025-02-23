const express = require('express');
const router = express.Router();
const { getCartByUserId, addCartItem, updateCartItemQuantity } = require('../controllers/cartController');


// API: Lấy giỏ hàng theo user ID
router.get('/cart/:userId', getCartByUserId);
router.post('/cart-items', addCartItem);
router.put('/cart-items/:cartItemID', updateCartItemQuantity);


//note
module.exports = router;
