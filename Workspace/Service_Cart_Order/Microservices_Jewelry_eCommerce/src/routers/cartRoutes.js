const express = require('express');
const router = express.Router();
const { getCartByUserId, addCartItem, updateCartItemQuantity } = require('../controllers/cartController');


router.get('/cart/:userId', getCartByUserId);
router.post('/cart-items', addCartItem);
router.put('/cart-items/:cartItemID', updateCartItemQuantity);


module.exports = router;
