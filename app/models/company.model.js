module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
      id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      name: {
        type: Sequelize.STRING
      },
      ic_number: {
        type: Sequelize.STRING
      },
      gst: {
        type: Sequelize.STRING
      },
      pan: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    });
    return Company;
  };
  