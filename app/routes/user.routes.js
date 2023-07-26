module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const company = require("../controllers/company.controller.js");
    const contact = require("../controllers/contact.controller.js");
    const order = require("../controllers/order.controller.js");

    var router = require("express").Router();
  
    
    //  general routes 
    router.post('/createUser',users.createUser ); 
    router.post('/login' , users.login);


    // router.get('/:id',users.userhome); 

    // TODO add  authentication middleware everywhere
    // add authentication 

    // user contacts routes 
    router.post("/:id/addContact", contact.addContact);
    router.get('/:id/getUserContacts',users.authenticate,contact.getUserContacts); /// TOPP 
    router.get('/:id/getUserContacts/:contactId',contact.getContactDetails);
    router.post("/:id/editContact/:contactId", contact.editContact);
    // get one contact 

    // user company routes -- in future multiple companies 
    router.post(":id/createCompany", company.createCompany);
    // router.get('/:id/getUserCompany',users.authenticate,company.getUserCompany);
    router.get('/:id/Company/:companyId',company.getCompanyDetails); // how does frontend knows company id --? from user init/login ? can we send list of companies 
    router.post(":id/editCompany/:companyId", company.editCompany); // add autheticate middleware based on roles 


    // user order routes  
    router.post("/:id/createOrder", order.createOrder); // add autheticate middleware based on roles 
    router.post("/:id/editOrder", order.editOrder); // add autheticate middleware based on roles 
    router.get('/:id/getUserOrders',users.authenticate,order.getUserOrders);  


    app.use("/api/user", router);
  };