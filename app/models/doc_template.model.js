module.exports = (sequelize, Sequelize) => {
    const Doc_template = sequelize.define("doc_templates", {
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
    },
    type:{
        type:Sequelize.STRING
    },
    user_template_id:{
        type:Sequelize.INTEGER
    }
    },
    );
  
    return Doc_template;
  };
  