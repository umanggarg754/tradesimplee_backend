module.exports = (sequelize, Sequelize) => {
    const Currency = sequelize.define("currency", {
      id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      currency: {
        type: Sequelize.STRING
      },
      conversion_value: {
        type: Sequelize.INTEGER
      },
      locale:{
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    });
    return Currency;
  };
  