module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
      id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      name: {
        type: Sequelize.STRING
      },
      company: {
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
      background: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      // status country city type 
      status: { type: Sequelize.STRING },
        country: { type:Sequelize.STRING },
        city: {type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
    },{
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
     
    }
    );
  
    return Contact;
  };
  