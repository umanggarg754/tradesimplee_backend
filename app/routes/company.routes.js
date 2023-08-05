module.exports = app => {
    const company = require("../controllers/company.controller.js");
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();


        // user company routes -- in future multiple companies 
    router.post("/createCompany", users.authenticate,company.createCompany);
    // router.get('/:id/getUserCompany',users.authenticate,company.getUserCompany);
    router.get('/company/:companyId',users.authenticate,company.getCompanyDetails); 
    router.post("/editCompany/:companyId",users.authenticate, company.editCompany); // add autheticate middleware based on roles 
    // router.get('/:id/getUserCompany/:companyId',company.getUserCompany); // add autheticate middleware based on roles
  
    app.use("/api/company", router);
  };