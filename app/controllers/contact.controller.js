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
      user_id: parseInt(req.params.id), // note path parameter 
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
        user_id: parseInt(req.params.id),
        status: req.body.status,
        city: req.body.city,
        country: req.body.country,
         type: req.body.type
        };
    created_contact= await contact.update(contact_instance,{where:{id:parseInt(req.params.contactId)}}); 
    res.status(201).json(created_contact);
    
    };
    

// understand importance of next() in middleware
exports.getUserContacts = async (req, res,next) => {
  try {
    let contacts;
    const user_id = parseInt(req.params.id)
    if (req.query.status) {
      contacts = await contact.findAll({
        where: { user_id: parseInt(user_id), status: req.query.status },
      });
    } else {
      contacts = await contact.findAll({
        where: { user_id: parseInt(user_id) },
      });
      console.log(contacts);
    }
    if (contacts === null || contacts.length === 0) {
      return res.status(404).json({ msg: 'Contacts not found' });
    }
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

exports.getContactDetails = async (req, res,next) => {
  try {
    let contacts;
    const user_id = parseInt(req.params.id)
    const contact_id = parseInt(req.params.contactId)
    
    contacts = await contact.findOne({
        where: { user_id: parseInt(user_id), id: contact_id },
      });
    console.log(contacts);
    
    if (contacts === null || contacts.length === 0) {
      return res.status(404).json({ msg: 'Contacts not found' });
    }
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};