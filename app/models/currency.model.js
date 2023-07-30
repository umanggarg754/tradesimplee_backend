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
      }
    },
    {
      timestamps: false
    });
    return Currency;
  };
  