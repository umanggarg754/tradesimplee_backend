module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },
      whatsapp: {
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };
  