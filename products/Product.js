const Sequelize = require("sequelize");
const connection = require("../database/database");

const Product = connection.define('tbprodutos', {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cod_barra: {
        type:  Sequelize.INTEGER, 
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    size: {
        type: Sequelize.STRING,
        allowNull: false
    },
    marca: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estoque: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

Product.sync({force: false}).then(()=>{});

module.exports = Product;