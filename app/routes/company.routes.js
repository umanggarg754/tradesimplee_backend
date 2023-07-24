// module.exports = app => {
//     const company = require("../controllers/company.controller.js");
  
//     var router = require("express").Router();

//     router.post("/createCompany", company.createCompany);

//     router.post("/editCompany", company.editCompany); // add autheticate middleware based on roles 
  
//     app.use("/api/company", router);
//   };