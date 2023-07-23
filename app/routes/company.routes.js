module.exports = app => {
    const company = require("../controllers/company.controller.js");
  
    var router = require("express").Router();

    router.post("/createCompany", company.createCompany);

    router.post("/editCompany", company.editCompany); // add autheticate middleware based on roles 

    // router.post('/createUser',users.createUser ); 

    // router.post('/login' , users.login);
  
    // router.get('/userhome',users.userhome);

    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/company", router);
  };