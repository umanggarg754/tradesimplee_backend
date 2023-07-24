// id
// user_id
// contact_id
// status
// summary
// invoice_number
// order_number
// date
// Customer Notes
// terms_and_conditions

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      user_id: {
        type: Sequelize.INTEGER
      },
      contact_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.STRING
      },
      invoice_number: {
        type: Sequelize.STRING
      },
      order_number: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATEONLY
      },
        customer_notes: {
        type: Sequelize.STRING
        },
        terms_and_conditions: {
        type: Sequelize.STRING
        },
    },{
      timestamps: true,
      updatedAt: false,
      createdAt: 'createdAt'
    }
    );
  
    return Order;
  };
  

