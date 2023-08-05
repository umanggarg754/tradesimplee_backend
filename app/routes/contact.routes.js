
module.exports = app => {
    const contact = require("../controllers/contact.controller.js");
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();


    // user contacts routes 
    router.post("/addContact", users.authenticate,contact.addContact);

    router.get('/getUserContacts',users.authenticate,contact.getUserContacts); /// TOPP 
    router.get('/getUserContacts/:contactId',users.authenticate,contact.getContactDetails);

    router.put("/editContact/:contactId", users.authenticate,contact.editContact);
    // get one contact 
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use("/api/contact", router);
  };