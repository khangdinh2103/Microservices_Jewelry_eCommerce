const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');
const User = require('./User');

const Cart = sequelize.define('Cart', {
    cartID: { // Đổi 'id' thành 'cartID' để khớp với sơ đồ
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userID: { // Đổi 'user_id' thành 'userID' để nhất quán
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userID', // Đảm bảo khóa ngoại đúng với User model
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    createdAt: { // Thêm thuộc tính 'createdAt' theo sơ đồ
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'carts',
    timestamps: false, // Tắt tự động timestamps vì đã khai báo 'createdAt' thủ công
});

// Thiết lập quan hệ với User
Cart.belongsTo(User, { foreignKey: 'userID' });
User.hasOne(Cart, { foreignKey: 'userID' });

module.exports = Cart;