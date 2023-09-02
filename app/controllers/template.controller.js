const db = require("../models");
const template = db.template;
const Op = db.Sequelize.Op;



exports.addTemplate = async(req, res,next) => {
    user_id = parseInt(req.user.id);
    //res.status(201).json(req.body);

    try{
        company_id = await db.user_company.findOne({
            where: { user_id: user_id },
        });
        console.log(company_id)
        company_id = company_id.company_id

    }
    catch (err) {
        console.log(err);
    }

    //add new user and return 201

    try{
        var template_instance = {
        name : req.body.name,
        company_id : company_id,
        user_id: user_id, 
        details: req.body.details
        };
        console.log(template_instance)
        created_template = await template.create(template_instance);
        res.status(201).json(created_template);
    }catch (err){
        res.status(404).json({error:"Template not created"})
    }
  };



exports.getTemplates = async (req, res,next) => {

    const user_id = parseInt(req.user.id);
  

    try {
        let templates;
      
        templates = await template.findAll({
            where: { user_id: parseInt(user_id) },
            attributes:['name','id'], 
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
      console.log(user_id,template_id)

      template_instance = await template.findOne({
          where: { user_id: user_id, id: template_id }, raw:true
        });
      //console.log(template_instance);
      
      if (template_instance === null ) {
        return res.status(404).json({ msg: 'template not found' });
      }

      columns = [];
      for (const key of template_instance.details) {
            columns.push(key.name);
        }
        console.log(columns);
      res.status(200).json(columns);
    } catch (err) {
      console.log(err)
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };