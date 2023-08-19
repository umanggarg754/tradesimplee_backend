const db = require("../models");
const order = db.order;
const product = db.product;
const Op = db.Sequelize.Op;
const { ToWords } = require('to-words');



function trasform_to_other_details(product_instance){
    fixed_keys = ['serial_num', 'product_name', 'price', 'quantity', 'status', 'photo','order_id']
    var other_details = {}
    var keys = Object.keys(product_instance);
    for (const key of keys) {
        if (!fixed_keys.includes(key)){
            other_details[key] = product_instance[key];
        }
    }
    return other_details;
};

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
            contact_id : parseInt(req.body.contact_id), //
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
            res.status(500).json({ message: 'Error creating the order.' });
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

            //console.log(other_details);
            product_instance.other_details =  trasform_to_other_details(product_instance);

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

    user_id = parseInt(req.user.id)
    const order_id = parseInt(req.params.orderId); 

    console.log(req.body);

    try {
        var order_instance = {
            user_id : user_id, // 
            contact_id : parseInt(req.body.contact_id), //
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
        created_order = await order.update(order_instance,{where:{id:order_id}});
    } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error inserting the order.' });
    }
        
        
    var products = [];
    
    // get list of orders from the database + add new order to the list
    if (!created_order ) {
        console.log("Order not updated");
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
    

    index = 0 
    try{ 
        // Add products to the separate table and associate them with the order_id
        for (const product_instance of products) {
        product_instance.order_id = order_id;
        product_instance.other_details =  trasform_to_other_details(product_instance);
        product_instance.photo = req.files[index] ? req.files[index].filename : '';
        updated = await product.update(product_instance,{where:{order_id:order_id,serial_num:product_instance.serial_num}});
        }

        res.status(201).json(created_order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not update order.' });
    }
  };

// get order details for user 
  exports.getUserOrders = async (req, res,next) => {


    const user_id = parseInt(req.user.id);

    try {
        let order_instance;
        if (req.query.status) {
            order_instance = await order.findAll({
            where: { user_id: user_id, status: req.query.status },
            raw:true
        })
        } else {
            order_instance = await order.findAll({
            where: { user_id: user_id},
            raw: true,
        });
        }
        
        for (const order in order_instance){
            contact = db.contact.findOne({where: {id:order.contact_id}})
            order.contact_name = contact.name
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
    const user_id = parseInt(req.user.id);
    const order_id = parseInt(req.params.id);

    try {
        let order_instance;
        order_instance = await order.findOne({
            where: { user_id: parseInt(user_id), id: order_id },
        });
        

        if (order_instance === null ) {
          return res.status(404).json({ msg: 'Order not found' });
        }

        // Get the products associated with the order
        const products = await product.findAll({
        where: { order_id: order_id },
        });

        if (products === null ) {
            console.log("No products found for the order");
        }
        
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
    const user_id = parseInt(req.user.id);
    const order_id = parseInt(req.params.orderId);
    
    // get company details of user 
    try {
        company = await db.user_company.findOne({
            where: { user_id: user_id},
        });
        company_details = await db.company.findOne({ 
            where: { id: company.company_id },
        });

        if (company_details === null ) {
            return res.status(404).json({ msg: 'Company details not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get company details.' });
    }


    // get order details of user
    console.log(user_id,order_id)
    try {
        order_details = await order.findOne({
            where: { user_id: user_id, id: order_id },
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
        contact_details = await db.contact.findOne({
            where: { user_id: user_id, id: order_details.contact_id },
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
    fields_for_proforma = ['id', 'serial_num', 'product_name', 'other_details']
    extract_from_other_details = ['marksandnums','packing','box','sqm','pricepersqm','totalamount']
    // "MARKS &
    // NOS"	SR. NO	DESCRIPTION					PACKING	BOX	SQM	PRICE PER SQM	TOTAL AMOUNT
    try {
        product_details = await product.findAll({
            where: { order_id: order_id },
            attributes: fields_for_proforma, 
            raw: true,
        });
        if (product_details === null ) {
            return res.status(404).json({ msg: 'Product details not found' });
        }else{
            for (const product_instance of product_details) {
                try{
                other_details = product_instance.other_details;
                product_instance.marksandnums = other_details.marksandnums;
                product_instance.packing = other_details.packing;
                product_instance.box = other_details.box;
                product_instance.sqm = other_details.sqm;
                product_instance.pricepersqm = other_details.pricepersqm;
                product_instance.totalamount = other_details.totalamount;
                delete product_instance.other_details;
                }catch (error) {
                    console.log(error);
                }
            }
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
            total_amount += product_instance.totalamount;
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

        if (total_amount){
            const toWords = new ToWords({localeCode: localeCode, converterOptions: {currency: true}});
            total_amount_in_words = toWords.convert(total_amount, { currency: true });
        }else{
            total_amount_in_words = '';
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get total amount.' });
    }

    // get bank details of user

    // create performa invoice order
    try {
        const performa_invoice_order = {
            company_details: company_details,
            order_details: order_details,
            contact_details: contact_details,
            product_details: product_details,
            total_amount: total_amount,
            total_amount_in_words: total_amount_in_words,
        };
        res.status(200).json(performa_invoice_order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not create performa invoice order.' });
    }

};




exports.createDesignList = async(req, res,next) => {
    const user_id = parseInt(req.user.id);
    const order_id = parseInt(req.params.orderId);
    
    // get company details of user 
    try {
        company = await db.user_company.findOne({
            where: { user_id: user_id},
        });
        company_details = await db.company.findOne({ 
            where: { id: company.company_id },
        });

        if (company_details === null ) {
            return res.status(404).json({ msg: 'Company details not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get company details.' });
    }


    // get order details of user
    console.log(user_id,order_id)
    try {
        order_details = await order.findOne({
            where: { user_id: user_id, id: order_id },
        });
        if (order_details === null ) {
            return res.status(404).json({ msg: 'Order details not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get order details.' });
    }


    
    // get prouct details of order 
    fields_for_proforma = ['id', 'serial_num', 'product_name', 'other_details','photo']
    extract_from_other_details = ['marksandnums','packing','box','sqm','pricepersqm','totalamount']
    // CONTAINER	PALLETS	BOXES	PCS PER BOX	BRAND	SQM	GROSS WEIGHT							
    try {
        product_details = await product.findAll({
            where: { order_id: order_id },
            attributes: fields_for_proforma, 
            raw: true,
        });
        if (product_details === null ) {
            return res.status(404).json({ msg: 'Product details not found' });
        }else{
            for (const product_instance of product_details) {
                try{
                other_details = product_instance.other_details;
                product_instance.container = other_details.container;
                product_instance.palletbboxes = other_details.palletbboxes;
                product_instance.pcsperbox = other_details.pcsperbox;
                product_instance.sqm = other_details.sqm;
                product_instance.brand = other_details.brand;
                product_instance.grossweight = other_details.grossweight;
                delete product_instance.other_details;
                }catch (error) {
                    console.log(error);
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get product details.' });
    }
    
    try {
        const design_list = {
            company_details: company_details,
            order_details: order_details,
            product_details: product_details
        };
        res.status(200).json(design_list);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not create performa invoice order.' });
    }

};