const db = require("../models");
const contact = db.contact;
const Op = db.Sequelize.Op;



exports.addContact = async(req, res,next) => {
    //res.status(201).json(req.body);
    //add new user and return 201
    var contact_instance = {
      name : req.body.name,
      company : req.body.company,
      phone : req.body.phone,
      email: req.body.email,
      linkedin: req.body.linkedin,
      background: req.body.background,
      user_id: req.body.user_id,
      status: req.body.status,
      city: req.body.city,
      country: req.body.country,
       type: req.body.type
    };
    created_contact= await contact.create(contact_instance);
    res.status(201).json(created_contact);
  };

// edit contact
exports.editContact = async(req, res,next) => {
    //res.status(201).json(req.body);
    //add new user and return 201
    var contact_instance = {
        name : req.body.name,
        company : req.body.company,
        phone : req.body.phone,
        email: req.body.email,
        linkedin: req.body.linkedin,
        background: req.body.background,
        user_id: req.body.user_id,
        status: req.body.status,
        city: req.body.city,
        country: req.body.country,
         type: req.body.type
        };
    created_contact= await contact.update(contact_instance,{where:{id:req.body.id}});
    res.status(201).json(created_contact);
    
    };
    
