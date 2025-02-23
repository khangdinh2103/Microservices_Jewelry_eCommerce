const { Sequelize } = require('sequelize');



const sequelize = new Sequelize('jewelry', 'root', '', {
    host: 'localhost',
    port: 3306, 
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 10000,
    },
    });
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Connection error:', err));

module.exports = sequelize;
