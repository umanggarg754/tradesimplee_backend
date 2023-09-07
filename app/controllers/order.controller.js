const db = require("../models");
const order = db.order;
const product = db.product;
const Op = db.Sequelize.Op;
const { ToWords } = require('to-words');
const { getTemplateDetail } = require("./doc_template.controller");






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
            order_instance = await db.order.findAll({
            where: { user_id: user_id, status: req.query.status },
            raw:true
        })
        } else {
            order_instance = await db.order.findAll({
            where: { user_id: user_id},
            raw: true,
        });
        }
        

        for (var order of order_instance){
            contact = await db.contact.findOne({where: {id:order.contact_id}})
            order.contact_name = contact.name

            const products = await db.product.findAll({
                where: { order_id: order.id },
                });
            
            total_amount = 0
            for(const product of products){
                total_amount+=product.other_details.total_amount
            }
    
            order.total_amount = total_amount
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
    const order_id = parseInt(req.params.orderId);


    try {
        let order_instance;
        order_instance = await order.findOne({
            where: { user_id: parseInt(user_id), id: order_id },
            raw:true
        });
        

        if (order_instance === null ) {
          return res.status(404).json({ msg: 'Order not found' });
        }

        // Get the products associated with the order
        const products = await db.product.findAll({
        where: { order_id: order_id }, raw:true
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



//   Name
//   Check boxes	Comapny name address
//       Date
//       Order number
//       invoice number
//       consignee details
//       bank details
//       IEC number 
//   drop dowm	select from order templates -- name of template
      
//   list of columns with check boxes	
      
//   customer_notes	
//   terms_and_condititons	



// total async fuction 
function getTotalAmount(product_details){
    try {
        total_amount = 0;
        for (const product_instance of product_details) {
            total_amount += product_instance.price*product_instance.quantity;
        }
        console.log(total_amount)
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
    }

    return [total_amount,total_amount_in_words];
};



exports.createDocument = async(req, res,next) => {
    const user_id = parseInt(req.user.id);
    const order_id = parseInt(req.params.orderId);
    const doc_template_id = parseInt(req.params.docTemplateId);

    final_doc = {}

    //doc_template_details = await getTemplateDetail();
    //console.log(doc_template_details);

    list_of_general_details  = ['company_name_address','date','order_number','invoice_number','consignee_details',
    'bank_details','IEC_number','customer_notes','terms_and_conditions']
    
    // get doctemplate details 
    try{
        doc_template_details = await db.doc_template.findOne({
            where: { id: doc_template_id },
            raw:true
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get doc template details.' });
    }

    console.log(doc_template_details);

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

        if (doc_template_details.details.general_details.includes('company_name_address')){
            final_doc.company_name = company_details.name;
            final_doc.company_address = company_details.address;
        }

        if (doc_template_details.details.general_details.includes('IEC_number')){
            final_doc.IEC_number = company_details.iec_number;
        }

        if (doc_template_details.details.general_details.includes('bank_details')){
            final_doc.bank_details = company_details.bank_details;
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get company details.' });
    }


    // get order details 
    try {
        order_details = await order.findOne({
            where: { user_id: user_id, id: order_id },
        });

        if (order_details === null ) {
            return res.status(404).json({ msg: 'Order details not found' });
        }

        //'date','order_number','invoice_number','consignee_details',

        if (doc_template_details.details.general_details.includes('date')){
            final_doc.date = order_details.date;
        }

        if (doc_template_details.details.general_details.includes('order_number')){
            final_doc.order_number = order_details.order_number;
        }

        if (doc_template_details.details.general_details.includes('invoice_number')){
            final_doc.invoice_number = order_details.invoice_number;
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get order details.' });
    }

    // get contact details of user based on order.contact_id
    if (doc_template_details.details.general_details.includes('consignee_details')){
        try {
            contact_details = await db.contact.findOne({
                where: { user_id: user_id, id: order_details.contact_id },
                attributes:['name','company','city','country'],
                raw:true,
            });
            if (contact_details === null ) {
                return res.status(404).json({ msg: 'Contact details not found' });
            }else{
                final_doc.consignee_details = contact_details;
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    // get prouct details of order
    try {
        product_details = await product.findAll({
            where: { order_id: order_id },
            raw: true,
        });
        
        if (product_details === null ) {
            return res.status(404).json({ msg: 'Product details not found' });
        }else{
            for (const product_instance of product_details){
                other_details = product_instance.other_details;
                //console.log(product_details);
                for(const key in doc_template_details.details.product_details){
                    if (key in other_details){
                        product_instance[key] = other_details[key];
                    }
                }
                delete product_instance.other_details;
            }
            final_doc.prodcuts = product_details;
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not get product details.' });
    }

    if (doc_template_details.details.product_details.includes('price')){
        [total_amount, total_amount_in_words] = getTotalAmount(product_details);
        final_doc.total_amount = total_amount;
        final_doc.total_amount_in_words = total_amount_in_words;
    }

    try {
        res.status(200).json(final_doc);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not create document order.' });
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
                product_instance.pallets = other_details.pallets;
                product_instance.box = other_details.box
                product_instance.pcsperbox = other_details.pcsperbox;
                product_instance.sqm = other_details.sqm;
                product_instance.brand = other_details.brand;
                product_instance.grossweight = other_details.grossweight;
                delete product_instance.other_details;
                // "SR.
               // O."	PRODUCT DESCRIPTION		CONTAINER	DESIGN PHOTO	PALLETS	BOXES	PCS PER BOX	BRAND	SQM	GROSS WEIGHT
										
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



exports.getCurrencies = async(req,res,next)=>{
    
    try {

        currencies = await db.currency.findAll({attributes:['currency'],raw:true});
        res.status(200).json(currencies)
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json({ error: 'Could not create performa invoice order.' });
    }

};