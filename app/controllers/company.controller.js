const db = require("../models");
const company = db.company;
const company_user_mapping = db.user_company;
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
    add_mapping = await company_user_mapping.create({user_id:user_id,company_id:created_company.id,role:"owner"});
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
    updated_company = await company.update(company_instance,{where:{id:parseInt(req.params.companyId)}}); // wrong paramter for update 
    res.status(201).json(updated_company);
  };
  

// getCompanyDetails

exports.getCompanyDetails = async (req, res,next) => {
  try {
    let contacts;
    const user_id = parseInt(req.params.id)
    const companyId = parseInt(req.params.companyId)
    // get mappings from table based on user id 
    company_instance = await company.findOne({
        where: {  id: companyId },
      });
    console.log(companyId);
    
    if (company_instance === null ) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(200).json(company_instance);
  } catch (err) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};