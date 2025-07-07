const Sequelize = require("sequelize");
const sequelize = require('../../dataBaseConfiguration');
const {hashUrl} = require('./helper');

const Url = sequelize.define(
    'url',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                isNumeric: true,
                notEmpty: true
            }
        },
        hash: {
            type: Sequelize.STRING,
            unique: true,
        },
        url: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isUrl: true,
                notEmpty: true
            }
        },
        visited: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
            validate: {
                isNumeric: true,
                notEmpty: true
            }
        },
        is_valid: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        freezeTableName: true,
    }
);

Url.afterCreate(async (user, options) => {
    user.hash = hashUrl(user.id);
    Url.update({hash: user.hash},
        {where: {id: user.id}});
})
module.exports = Url;