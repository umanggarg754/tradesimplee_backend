module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const company = require("../controllers/company.controller.js");
    const contact = require("../controllers/contact.controller.js");
    const order = require("../controllers/order.controller.js");

    var router = require("express").Router();
  
    
    //  general routes 
    router.post('/createUser',users.createUser ); 
    router.post('/login' , users.login);


    // router.get('/:id',users.userhome); -- define authentication here ? 
  
    // add authentication 
    // user contacts routes 
    router.post("/:id/addContact", contact.addContact);
    router.get('/:id/getUserContacts',users.authenticate,contact.getUserContacts);
    router.get('/:id/getUserContacts/:contactId',contact.getContactDetails);
    router.post("/:id/editContact/:contactId", contact.editContact);
    // get one contact 

    // user company routes 
    router.post(":id/createCompany", company.createCompany);
    router.get('/:id/Company/:copmanyId',copany.getCompanyDetails);
    router.post(":id/editCompany", company.editCompany); // add autheticate middleware based on roles 


    // user order routes  
    router.post("/:id/createOrder", order.createOrder); // add autheticate middleware based on roles 
    router.post("/:id/editOrder", order.editOrder); // add autheticate middleware based on roles 



    app.use("/api/user", router);
  };