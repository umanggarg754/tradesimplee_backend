
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
        type: Sequelize.NUMBER
      },
      quantity: {
        type: Sequelize.NUMBER
      },
      status: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      other_details: {
        type: Sequelize.JSONB
      },
    },{
      timestamps: true,
      updatedAt: false,
      createdAt: 'createdAt'
    }
    );
  
    return Product;
  };
  


