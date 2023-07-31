module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const company = require("../controllers/company.controller.js");
    const contact = require("../controllers/contact.controller.js");
    const order = require("../controllers/order.controller.js");
    var router = require("express").Router();
    const multer = require('multer');
    const uuidv4 = require('uuidv4');
    const DIR = '../assets/';


    
    // for file upload 
    // <!DOCTYPE html>
    // <form action="/upload" method="POST" enctype="multipart/form-data">
    //     <input type="file" name="image" />
    //     <button type="submit">Upload</button>
    // </form>

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, DIR);
        },
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, uuidv4() + '-' + fileName)
        }
    });

    var upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        }
    });


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
    router.post("/:id/createCompany", company.createCompany);
    // router.get('/:id/getUserCompany',users.authenticate,company.getUserCompany);
    router.get('/:id/Company/:companyId',company.getCompanyDetails); 
    router.post("/:id/editCompany/:companyId", company.editCompany); // add autheticate middleware based on roles 


    // user order routes  
    //router.post("/:id/createOrder", order.createOrder); // add autheticate middleware based on roles  TODO 
    router.post('/:id/createOrder',  upload.array('products[*].photo',10),  order.createOrder); // u upload.fields([{ name: 'photo', maxCount: 10 }]) ,
    router.post("/:id/editOrder/:orderId", order.editOrder); // add autheticate middleware based on roles TODO
    router.get('/:id/getUserOrders',users.authenticate,order.getUserOrders); 
    

    router.post('/:id/sendmail',users.sendmail) // TODO 
    // router.get('/:id/getUserOrders/:orderId',order.getOrderDetails); // TODO
    // router.get(:/id/createInvoice/:orderId',order.createInvoice); // TODO 


    app.use("/api/user", router);
  };