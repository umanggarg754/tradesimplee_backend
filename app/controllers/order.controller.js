const db = require("../models");
const order = db.order;
const product = db.product;
const Op = db.Sequelize.Op;
const { ToWords } = require('to-words');


exports.createOrder = async(req, res,next) => {
    user_id = parseInt(req.user.id)
    console.log(req.body);
    console.log(req.body.products[0],"pic")

    if (!req.body.summary){
            req.body.summary = "";
    }

      try {
        var order_instance = {
            user_id : user_id, // 
            contact_id : req.body.contact_id, //
            status : req.body.status, //
            summary: req.body.summary,  //
            invoice_number: req.body.invoice_number, //
            order_number: req.body.order_number, //
            // date: req.body.date, //
            date: new Date(req.body.date), //
            customer_notes: req.body.customer_notes, //
            terms_and_conditions: req.body.terms_and_conditions, //
            currency: req.body.currency //
            };
        created_order = await order.create(order_instance);  
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error inserting the order.' });
        }
        // Save the products associated with the order
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

        // console.log(req.files);
            
        index = 0 
        try { 
        for (const product_instance of products) {
            console.log(product_instance);
            product_instance.order_id = order_id;
            // sno product_name price quantity status photo other_details 

            if (!product_instance.price){
                product_instance.price = null;
            }

            if (!product_instance.status){
                product_instance.status = null;
            }

            fixed_keys = ['serial_num', 'product_name', 'price', 'quantity', 'status', 'photo','order_id']
            
            var other_details = {}
            var keys = Object.keys(product_instance);
            for (const key of keys) {
                if (!fixed_keys.includes(key)){
                    other_details[key] = product_instance[key];
                }
            }
            //console.log(other_details);
            product_instance.other_details = other_details;

            //console.log(product_instance.photo);
            //paths = product_instance.photo.map((file) => file.path);   
            console.log(req.files[index]);
            product_instance.photo = req.files[index] ? req.files[index].filename : '';
            //product_instance.photo = product_instance.photo ? product_instance.photo.map((file) => file.path) : [];
            // product_instance.photo = null;
            console.log(product_instance);
            try{
                product_create = await product.create(product_instance);
                index += 1;
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Error inserting the product.' });
            }
        }

        res.status(201).json(created_order);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error inserting  products for order' });
      }
    };



// TODO edit order 
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
        terms_and_conditions: req.body.terms_and_conditions,
        currency: req.body.currency
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

// get order details for user 
  exports.getUserOrders = async (req, res,next) => {


    const user_id = req.user.id;

    try {
        let order_instance;
        if (req.query.status) {
            order_instance = await order.findAll({
            where: { user_id: parseInt(user_id), status: req.query.status },
        })
        } else {
            order_instance = await order.findAll({
            where: { user_id: parseInt(user_id) },
        });
        }

        if (order_instance === null ) {
          return res.status(404).json({ msg: 'Order not found' });
        }
        res.status(200).json(order_instance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get orders.' });
    }
  };


// get order details for user
exports.getOrder = async (req, res,next) => {
    const user_id = req.user.id;
    const order_id = req.params.id;
    try {
        let order_instance;
        if (req.query.status) {
            order_instance = await order.findOne({
            where: { user_id: parseInt(user_id), id: order_id, status: req.query.status },
        })
        } else {
            order_instance = await order.findOne({
            where: { user_id: parseInt(user_id), id: order_id },
        });
        }

        if (order_instance === null ) {
          return res.status(404).json({ msg: 'Order not found' });
        }


        // Get the products associated with the order
        const products = await product.findAll({
        where: { order_id: order_id },
        });

        order_instance.products = products;

        res.status(200).json(order_instance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get order.' });
    }
  }



// create performa invoice order with user's company details &
// contact details and order and product details of a particular order and bank details 
// also add total amount and total amount in words uing total amount key in prodcuts
exports.createPerformaInvoiceOrder = async(req, res,next) => {
    const user_id = req.user.id;
    const order_id = req.params.id;
    
    // get company details of user 
    try {
        company_details = await company.findOne({
            where: { user_id: parseInt(user_id) },
        });
        if (company_details === null ) {
            return res.status(404).json({ msg: 'Company details not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get company details.' });
    }


    // get order details of user
    try {
        order_details = await order.findOne({
            where: { user_id: parseInt(user_id), id: order_id },
        });
        if (order_details === null ) {
            return res.status(404).json({ msg: 'Order details not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get order details.' });
    }


    // get contact details of user based on order.contact_id
    try {
        contact_details = await contact.findOne({
            where: { user_id: parseInt(user_id), id: order_details.contact_id },
        });
        if (contact_details === null ) {
            return res.status(404).json({ msg: 'Contact details not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get contact details.' });
    }

    // get prouct details of order 
    try {
        product_details = await product.findAll({
            where: { user_id: parseInt(user_id), order_id: order_id },
        });
        if (product_details === null ) {
            return res.status(404).json({ msg: 'Product details not found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get product details.' });
    }
    
    // create total in words and numbers usig prouct details
    try {
        total_amount = 0;
        for (const product_instance of product_details) {
            total_amount += product_instance.total_amount;
        }

        let localeCode = 'en-IN';
        if (order_details.currency == "INR"){
            localeCode = 'en-IN';
        }else if (order_details.currency == "USD"){
            localeCode = 'en-US';
        }else if (order_details.currency == "EUR"){
            localeCode = 'en-EU';
        }else if (order_details.currency == "GBP"){
            localeCode = 'en-GB';
        }else if (order_details.currency == "AUD"){
            localeCode = 'en-AU';
        }else if (order_details.currency == "CAD"){
            localeCode = 'en-CA';
        }else if (order_details.currency == "SGD"){
            localeCode = 'en-SG';
        }else if (order_details.currency == "JPY"){
            localeCode = 'en-JP';
        }else if (order_details.currency == "CNY"){
            localeCode = 'en-CN';
        }else if (order_details.currency == "NZD"){
            localeCode = 'en-NZ';
        }else if (order_details.currency == "CHF"){
            localeCode = 'en-CH';
        }else{
            localeCode = 'en-IN';
        }

        const toWords = new ToWords({localeCode: localeCode, converterOptions: {currency: true}});
        total_amount_in_words = toWords.convert(total_amount, { currency: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get total amount.' });
    }

    // get bank details of user
    bank_details = ''

    // create performa invoice order
    try {
        const performa_invoice_order = {
            company_details: company_details,
            order_details: order_details,
            contact_details: contact_details,
            product_details: product_details,
            total_amount: total_amount,
            total_amount_in_words: total_amount_in_words,
            bank_details: bank_details
        };
        res.status(200).json(performa_invoice_order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not create performa invoice order.' });
    }

};