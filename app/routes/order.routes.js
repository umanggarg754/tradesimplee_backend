
module.exports = app => {
    const order = require("../controllers/order.controller.js");
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    let fs = require('fs-extra');
    const multer = require('multer');
    const { v4: uuidv4 } = require('uuid');
    const DIR = 'assets/';

    
    // for file upload 
    // <!DOCTYPE html>
    // <form action="/upload" method="POST" enctype="multipart/form-data">
    //     <input type="file" name="image" />
    //     <button type="submit">Upload</button>
    // </form>

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            fs.mkdirsSync(DIR);
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



    // user order routes  
    //router.post("/:id/createOrder", order.createOrder); // add autheticate middleware based on roles  TODO 
    router.post('/createOrder',users.authenticate, upload.any() ,   order.createOrder); // u upload.fields([{ name: 'photo', maxCount: 10 }]) , // upload.array('products[*].photo')
    router.put("/editOrder/:orderId", users.authenticate, upload.any() ,order.editOrder); // add autheticate middleware based on roles TODO
    
    router.get('/getUserOrders',users.authenticate,order.getUserOrders); 
    router.get('/getOrder/:orderId',users.authenticate,order.getOrder);

    router.get('/createPerforma/:orderId',users.authenticate,order.createPerformaInvoiceOrder);
    router.get('/createDesignList/:orderId',users.authenticate,order.createDesignList);

    app.use("/api/order", router);
  };