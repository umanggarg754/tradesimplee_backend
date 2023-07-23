module.exports = app => {
    const order = require("../controllers/order.controller.js");
  
    var router = require("express").Router();

    router.post("/createOrder", company.createOrder); // add autheticate middleware based on roles 

    router.post("/editOrder", company.editOrder); // add autheticate middleware based on roles 

    app.use("/api/company", router);
  };