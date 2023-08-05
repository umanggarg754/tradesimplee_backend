module.exports = app => {
    const users = require("../controllers/user.controller.js");
    // const company = require("../controllers/company.controller.js");
    // const contact = require("../controllers/contact.controller.js");
    // const order = require("../controllers/order.controller.js");
    var router = require("express").Router();



    //  general routes 
    router.post('/createUser',users.createUser ); 
    router.post('/login' , users.login);


    // router.get('/:id',users.userhome); 

    // user company routes -- in future multiple companies
    router.post('/sendmail',users.authenticate,users.sendmail) // TODO 
    // router.get('/:id/getUserOrders/:orderId',order.getOrderDetails); // TODO
    // router.get(:/id/createInvoice/:orderId',order.createInvoice); // TODO 


    app.use("/api/user", router);
  };