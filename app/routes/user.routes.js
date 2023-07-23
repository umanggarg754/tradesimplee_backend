module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    
    // router.get("/getallUsers", users.findAllUsers);

    router.post('/createUser',users.createUser ); 

    router.post('/login' , users.login);
  
    // router.get('/userhome',users.userhome);

    router.get('/getUserContacts',users.getUserContacts); // should it be in contact controller?
    // router.get('/getUserContacts',users.authenticate,users.getUserContacts); 

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
  
    app.use("/api/user", router);
  };