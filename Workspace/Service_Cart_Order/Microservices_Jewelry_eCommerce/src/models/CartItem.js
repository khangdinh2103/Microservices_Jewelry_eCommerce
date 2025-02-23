const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');
const Cart = require('./Cart');
const Product = require('./Product');

const CartItem = sequelize.define('CartItem', {
    cartItemID: { // Đổi id thành cartItemID để khớp với sơ đồ
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    cartID: { // Đổi cart_id thành cartID
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: 'cartID',
        },
        onDelete: 'CASCADE', // Xóa cart sẽ xóa luôn các cart items
    },
    productID: { // Đổi product_id thành productID
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'productID',
        },
        onDelete: 'CASCADE', // Xóa product sẽ xóa luôn các cart items
    },
}, {
    tableName: 'cart_items', // Đổi tên bảng cho chính xác
    timestamps: false,
});

// Thiết lập quan hệ với alias nhất quán
Cart.hasMany(CartItem, { foreignKey: 'cartID', as: 'cartItems' });
CartItem.belongsTo(Cart, { foreignKey: 'cartID', as: 'cart' });

Product.hasMany(CartItem, { foreignKey: 'productID', as: 'productItems' });
CartItem.belongsTo(Product, { foreignKey: 'productID', as: 'product' });

module.exports = CartItem;
