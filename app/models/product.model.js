
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      order_id: {
        type: Sequelize.INTEGER
      },
      serial_num:{
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      other_details: {
        type: Sequelize.JSON
      },
    },{
      timestamps: true,
      updatedAt: false,
      createdAt: 'createdAt'
    }
    );
  
    return Product;
  };
  


