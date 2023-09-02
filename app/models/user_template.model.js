module.exports = (sequelize, Sequelize) => {
    const User_template = sequelize.define("user_templates", {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: Sequelize.INTEGER
    },
    company_id: {
        type: Sequelize.INTEGER
    },
    name:{
        type: Sequelize.STRING
    },
    details:{
        type:Sequelize.JSONB
    }
    },
    
    );
  
    return User_template;
  };
  