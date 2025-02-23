const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Product = sequelize.define('Product', {
    productID: { // Đổi 'id' thành 'productID' để khớp với sơ đồ
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    gender: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    material: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gold_karat: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imageSet: {
        type: DataTypes.JSON, // Lưu danh sách hình ảnh dưới dạng JSON
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'products',
    timestamps: true, // Sử dụng timestamps để tự động cập nhật createdAt và updatedAt
});

module.exports = Product;
