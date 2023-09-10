const db = require("../models");
const doc_template = db.doc_template;
const Op = db.Sequelize.Op;


async function get_company_id(user_id){
  try{
    company = await db.user_company.findOne({
        where: { user_id: user_id },
    });
    company_id = company.company_id
    console.log(company_id)
  }
  catch (err) {
    console.log(err);
  }
  return company_id;
}

exports.addTemplate = async(req, res,next) => {
    user_id = parseInt(req.user.id);
    //res.status(201).json(req.body);


    copmany_id = await get_company_id(user_id);
    //add new user and return 201

    try{
        var template_instance = {
        name : req.body.name,
        company_id : company_id,
        user_id: user_id, 
        details: req.body.details,
        type: req.body.type
        };
        console.log(template_instance)
        created_template = await doc_template.create(template_instance);
        res.status(201).json(created_template);
    }catch (err){
        res.status(404).json({error:"Template not created"})
    }
  };



exports.editTemplate = async(req, res,next) => {
    user_id = parseInt(req.user.id);
    template_id = parseInt(req.params.templateId);


    copmany_id = await get_company_id(user_id);
    //add new user and return 201

    try{
        var template_instance = {
        name : req.body.name,
        company_id : company_id,
        user_id: user_id, 
        details: req.body.details,
        type: req.body.type
        };
        console.log(template_instance)
        updated_template = await doc_template.update(template_instance,{where:{id:template_id}}); 
        res.status(201).json(updated_template);
    }catch (err){
        res.status(404).json({error:"Template not created"})
    }
  };


exports.getTemplates = async (req, res,next) => {

    const user_id = parseInt(req.user.id);

    copmany_id = await get_company_id(user_id);

    try {
        let templates;
      
        templates = await doc_template.findAll({
            where: { company_id: company_id },
            attributes:['name','id','type'], 
            raw:true
        });
        console.log(templates);
      
      if (templates === null || templates.length === 0) {
        return res.status(404).json({ msg: 'No templates found' });
      }
      res.status(200).json(templates);
    } catch (err) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
  
exports.getTemplateDetail = async (req, res,next) => {
    try {
      let template_instance;
      const user_id = parseInt(req.user.id)
      const template_id = parseInt(req.params.templateId)
      company_id = await get_company_id(user_id);
      console.log(user_id,template_id,company_id)

      template_instance = await doc_template.findOne({
          where: { company_id: company_id, id: template_id }, raw:true
        });
      //console.log(template_instance);
      
      if (template_instance === null ) {
        return res.status(404).json({ msg: 'template not found' });
      }

      res.status(200).json(template_instance);
    } catch (err) {
      console.log(err)
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };