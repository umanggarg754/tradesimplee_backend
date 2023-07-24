const db = require("../models");
const order = db.order;
const product = db.product;
const Op = db.Sequelize.Op;



exports.createOrder = async(req, res,next) => {
    //res.status(201).json(req.body);
    //add new user and return 201
    try {
        var order_instance = {
        user_id : parseInt(req.params.id), // note path param 
        contact_id : req.body.contact_id,
        status : req.body.status,
        summary: req.body.summary,
        invoice_number: req.body.invoice_number,
        order_number: req.body.order_number,
        date: req.body.date,
        customer_notes: req.body.customer_notes,
        terms_and_conditions: req.body.terms_and_conditions
        };
        created_order = await order.create(order_instance);
        
        var products = [];
        const order_id = created_order.id; 
        if (!order_id ) {
            console.log("Order was not created");
        }
        else{
            // console.log("Order was created");
            if (req.body.products) {
                products = req.body.products;
            }
            else{
                console.log("No products were added to the order");
            }
        }
        
        // Add products to the separate table and associate them with the order_id
        for (const product_instance of products) {
        // Add order_id to each product
        product_instance.order_id = order_id;
        // Create the product entry in the Product table
        await product.create(product_instance);
        }

        res.status(201).json(created_order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not create order.' });
    }
  };



// edit order 



exports.editOrder = async(req, res,next) => {
    //res.status(201).json(req.body);
    //add new user and return 201
    try {
        var order_instance = {
        user_id : parseInt(req.params.id),
        contact_id : req.body.contact_id,
        status : req.body.status,
        summary: req.body.summary,
        invoice_number: req.body.invoice_number,
        order_number: req.body.order_number,
        date: req.body.date,
        customer_notes: req.body.customer_notes,
        terms_and_conditions: req.body.terms_and_conditions
        };
        created_order = await order.update(order_instance,{where:{id:req.order_id}});
        
        var products = [];
        const order_id = req.body.id; 
        // get list of orders from the database + add new order to the list
        if (!order_id ) {
            console.log("Order was not created");
        }
        else{
            // console.log("Order was created");
            if (req.body.products) {
                products = req.body.products;
            }
            else{
                console.log("No products were added to the order");
            }
        }
        
        // Add products to the separate table and associate them with the order_id
        for (const product_instance of products) {
        // Add order_id to each product
        product_instance.order_id = order_id;
        // Create the product entry in the Product table

        await product.update(product_instance,{where:{order_id:product_instance.order_id,serial_num:product_instance.serial_num}});
        }

        res.status(201).json(created_order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not create order.' });
    }
  };
