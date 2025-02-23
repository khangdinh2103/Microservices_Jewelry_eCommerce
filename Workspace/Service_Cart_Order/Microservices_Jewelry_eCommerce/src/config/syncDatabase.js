const sequelize = require('./Database'); 

sequelize.sync({ force: false }) // Đặt `true` nếu muốn xóa và tạo lại bảng
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((err) => {
        console.error('Failed to sync database:', err);
    });

module.exports = sequelize;
