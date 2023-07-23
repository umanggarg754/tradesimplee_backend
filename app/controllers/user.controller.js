const db = require("../models");
const user = db.users;
const contact = db.contact;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// // Retrieve all users from the database.

// exports.findAllUsers = (req, res) => {
//     const name = req.query.name;
//     var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
//     Tutorial.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };


exports.createUser = async(req, res,next) => {
  //res.status(201).json(req.body);
  //add new user and return 201
  // const salt = await bcrypt.genSalt(10);
  var usr = {
    name : req.body.name,
    password :  req.body.password,  // await bcrypt.hash(req.body.password, salt),
    linkedin : req.body.linkedin,
    email : req.body.email,
    phone: req.body.phone,
    whatsapp: req.body.whatsapp,
    summary: req.body.summary
  };
  created_user = await user.create(usr);
  res.status(201).json(created_user);
};

exports.login = async(req,res,next)=>{
  const my_user = await user.findOne({ where : {email : req.body.email }});
  // const salt = await bcrypt.genSalt(10);
  // password = await bcrypt.hash(req.body.password, salt)
  if(my_user){
     // const password_valid = await bcrypt.compare(req.body.password,my_user.password);
     if(req.body.password==my_user.password){
         token = jwt.sign({ "id" : user.id,"email" : user.email,"first_name":user.first_name },process.env.SECRET);
         res.status(200).json({ token : token });
     } else {
       res.status(400).json({ error : "Password Incorrect" });
     }
   
   }else{
     res.status(404).json({ error : "User does not exist" });
   }
   
   };

// TO FIX type of authentication using RSA or
exports.authenticate = async(req,res,next)=>{
    try {
      let token = req.headers['authorization'].split(" ")[1];
      let decoded = jwt.verify(token,process.env.SECRET);
      req.user = decoded;
      next();
    } catch(err){
      res.status(401).json({"msg":"Couldnt Authenticate"});
    }
    };

// understand importance of next() in middleware
exports.getUserContacts = async (req, res,next) => {
      try {
        let contacts;
        if (req.query.status) {
          contacts = await contact.findAll({
            where: { user_id: parseInt(req.query.user_id), status: req.query.status },
          });
        } else {
          contacts = await contact.findAll({
            where: { user_id: parseInt(req.query.user_id) },
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