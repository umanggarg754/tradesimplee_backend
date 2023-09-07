module.exports = app => {
    const docTemplate = require("../controllers/doc_template.controller.js");
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();


    // user contacts routes 
    router.post("/addTemplate", users.authenticate,docTemplate.addTemplate);

    router.get('/getUserTemplates',users.authenticate,docTemplate.getTemplates);  
    router.get('/getUserTemplates/:templateId',users.authenticate,docTemplate.getTemplateDetail);

    //router.put("/editTemplate/:templateId", users.authenticate,contact.editContact);
    // get one contact 
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/doctemplate", router);
  };