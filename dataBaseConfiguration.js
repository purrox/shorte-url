const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const checkDataBaseConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
checkDataBaseConnection();
sequelize.sync();
module.exports = sequelize;