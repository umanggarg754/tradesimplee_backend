const db = require("../models");
const company = db.company;
const Op = db.Sequelize.Op;



exports.createCompany = async(req, res,next) => {
    //res.status(201).json(req.body);
    //add new user and return 201
    user_id = parseInt(req.params.id)
    var company_instance = {
      name : req.body.name,
      ic_number : req.body.ic_number,
      gst_numberl : req.body.gst_number,
      pan: req.body.pan,
      address: req.body.address,
      city: req.body.city,
    };
    created_company = await company.create(company_instance);
    // user_id add mapping to table 
    res.status(201).json(created_company);
  };


  // edit comapny
exports.editCompany = async(req, res,next) => {
  // 
  user_id = parseInt(req.params.id)
  // allow only if owner in mappings table 
  var company_instance = {
    name : req.body.name,
    ic_number : req.body.ic_number,
    gst_numberl : req.body.gst_number,
    pan: req.body.pan,
    address: req.body.address,
    city: req.body.city};
    updated_company = await company.update(company_instance,{where:{id:req.body.id}}); // wrong paramter for update 
    res.status(201).json(updated_company);
  };
  

// getCompanyDetails

exports.getCompanyDetails = async (req, res,next) => {
  try {
    let contacts;
    const user_id = parseInt(req.params.id)
    const copmanyId = parseInt(req.params.copmanyId)
    // get mappings from table based on user id 
    company_instance = await company.findOne({
        where: {  id: copmanyId },
      });
    console.log(company_instance);
    
    if (company_instance === null ) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(200).json(company_instance);
  } catch (err) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};