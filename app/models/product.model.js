// order_id
// prdouct_name
// price
// quantity
// status
// photo
// other_details


module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      order_id: {
        type: Sequelize.INT
      },
      product_name: {
        type: Sequelize.product_name
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
  


