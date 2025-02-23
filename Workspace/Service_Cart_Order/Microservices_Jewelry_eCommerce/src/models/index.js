const User = require('./User');
const Cart = require('./Cart');
const Product = require('./Product');
const CartItem = require('./CartItem'); // Đổi từ CartDetail sang CartItem

// Thiết lập quan hệ cho các model

// 🛒 Quan hệ giữa Cart và CartItem
Cart.hasMany(CartItem, { foreignKey: 'cartID', as: 'cartItems' });
CartItem.belongsTo(Cart, { foreignKey: 'cartID', as: 'cart' });

// 📦 Quan hệ giữa Product và CartItem
Product.hasMany(CartItem, { foreignKey: 'productID', as: 'productItems' });
CartItem.belongsTo(Product, { foreignKey: 'productID', as: 'product' });

// 👤 Quan hệ giữa User và Cart
User.hasOne(Cart, { foreignKey: 'userID', as: 'userCart' });
Cart.belongsTo(User, { foreignKey: 'userID', as: 'user' });

module.exports = {
    User,
    Cart,
    Product,
    CartItem, // Đã đổi từ CartDetail sang CartItem
};
