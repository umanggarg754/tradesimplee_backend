module.exports = (sequelize, Sequelize) => {
    const User_company = sequelize.define("user_company", {
      user_id: {
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.STRING
      }
    });
  
    return User_company;
  };
  