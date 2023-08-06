const db = require("../models");
const user = db.users;
const contact = db.contact;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');

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
  if (created_user.id){
      token = jwt.sign({ "id" : created_user.id,"email" : created_user.email,"first_name":created_user.first_name },process.env.SECRET); // userId: user.id 
      res.status(200).json({ token : token });
  }
  else{
    res.status(400).json({ error : "User was not created" });
  }
};

exports.login = async(req,res,next)=>{
  const my_user = await user.findOne({ where : {email : req.body.email }});
  // const salt = await bcrypt.genSalt(10);
  // password = await bcrypt.hash(req.body.password, salt)
  if(my_user){
     // const password_valid = await bcrypt.compare(req.body.password,my_user.password);
     if(req.body.password==my_user.password){
         token = jwt.sign({ "id" : my_user.id,"email" : my_user.email,"first_name":my_user.first_name },process.env.SECRET); // userId: user.id 
         res.status(200).json({ token : token });
     } else {
       res.status(400).json({ error : "Password Incorrect" });
     }
   
   }else{
     res.status(404).json({ error : "User does not exist" });
   }
   
   };

// TO FIX type of authentication using RSA or HMAC

exports.authenticate = async(req, res, next)=>{
      // const token = req.header('Authorization');
      try {
      let token = req.headers['authorization'].split(" ")[1];
      if (!token) return res.sendStatus(401); // Unauthorized
    
      jwt.verify(token, process.env.SECRET,{algorithm: 'RS256'}, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Decoded user information is set in req.user
        console.log(user);
        next();
      });
      } catch (err) {
        console.error(err);
        return res.sendStatus(500);
      };
    };




exports.sendmail = async(req,res,next)=>{

  smtpProtocol = mailer.createTransport({
    //service: "Gmail",
    host: "sandbox.smtp.mailtrap.io",
    auth: {
        user: "3658b603557708",
        pass: "03da5683d03791"
    }
    });

//     // Host:
// sandbox.smtp.mailtrap.io
// Port:
// 25 or 465 or 587 or 2525
// Username:
// 3658b603557708
// Password:
// 03da5683d03791
// Auth:
// PLAIN, LOGIN and CRAM-MD5
// TLS:
// Optional (STARTTLS on all ports)

  var mailoption = {
    from: "umanggarg754@gmail.com",
    to: "bpsrockstar@gmail.com",
    subject: "Test Mail",
    html: 'Good Morning!'
  };


  await smtpProtocol.sendMail(mailoption, function(err, response){
  if(err) {
      console.log(err);
      res.status(500).json({ msg : "Mail Not Sent" });
  } 
  console.log('Message Sent' + response.message);
  smtpProtocol.close();
  });
  res.status(200).json({ msg : "Mail Sent" });
  };