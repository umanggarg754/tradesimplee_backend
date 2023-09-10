module.exports = app => {
    const template = require("../controllers/template.controller.js");
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();


    // user contacts routes 
    router.post("/addTemplate", users.authenticate,template.addTemplate);

    router.get('/getUserTemplates',users.authenticate,template.getTemplates);  
    router.get('/getUserTemplates/:templateId',users.authenticate,template.getTemplateDetail);

    router.put("/editTemplate/:templateId", users.authenticate,template.editTemplate);
    // get one contact 
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/template", router);
  };