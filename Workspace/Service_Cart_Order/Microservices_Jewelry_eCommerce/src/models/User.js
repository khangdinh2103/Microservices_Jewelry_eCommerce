const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

// Định nghĩa Enum cho UserRole và UserState
const UserRoleEnum = ['ADMIN', 'USER', 'MODERATOR'];
const UserStateEnum = ['ACTIVE', 'INACTIVE', 'BANNED'];

const User = sequelize.define('User', {
    userID: { // Đổi id thành userID để khớp với sơ đồ
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Tên đăng nhập không được để trống',
            },
        },
    },
    passwordHash: { // Thay đổi từ 'password' thành 'passwordHash' để rõ ràng hơn
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Mật khẩu không được để trống',
            },
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Đảm bảo email không trùng lặp
        validate: {
            notEmpty: {
                msg: 'Email không được để trống',
            },
            isEmail: {
                msg: 'Email không hợp lệ',
            },
        },
    },
    profileImageURL: { // Thêm thuộc tính ảnh đại diện (URL)
        type: DataTypes.STRING,
        allowNull: true,
    },
    addresses: { // Lưu danh sách địa chỉ dưới dạng JSON
        type: DataTypes.JSON,
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
    },
    role: {
        type: DataTypes.ENUM(...UserRoleEnum),
        allowNull: false,
        defaultValue: 'USER',
    },
    state: {
        type: DataTypes.ENUM(...UserStateEnum),
        allowNull: false,
        defaultValue: 'ACTIVE',
    },
}, {
    tableName: 'users',
    timestamps: false, // Đã có createdAt và updatedAt tự quản lý
});

module.exports = User;
