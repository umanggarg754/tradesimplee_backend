const db = require("../models");
const company = db.company;
const Op = db.Sequelize.Op;



exports.createCompany = async(req, res,next) => {
    //res.status(201).json(req.body);
    //add new user and return 201
    var company_instance = {
      name : req.body.name,
      ic_number : req.body.ic_number,
      gst_numberl : req.body.gst_number,
      pan: req.body.pan,
      address: req.body.address,
      city: req.body.city
    };
    created_company = await company.create(company_instance);
    res.status(201).json(created_company);
  };


  // edit comapny
exports.editCompany = async(req, res,next) => {
  var company_instance = {
    name : req.body.name,
    ic_number : req.body.ic_number,
    gst_numberl : req.body.gst_number,
    pan: req.body.pan,
    address: req.body.address,
    city: req.body.city};
  updated_company = await company.update(company_instance,{where:{id:req.body.id}});
  res.status(201).json(updated_company);
  };
  