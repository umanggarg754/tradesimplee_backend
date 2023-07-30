module.exports = (sequelize, Sequelize) => {
    const User_company = sequelize.define("user_company", {
      id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
      user_id: {
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    }
    );
  
    return User_company;
  };
  