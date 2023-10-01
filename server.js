const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
dotenv.config();

var corsOptions = {
  origin: "http://localhost:8081"
};

//app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));  // 
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(fileUpload());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const db = require("./app/models");
db.sequelize.sync() 
  .then(() => { 
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EXIMSIMPLEE backend app." });
});


require("./app/routes/user.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/contact.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/template.routes")(app);
require("./app/routes/doc_template.routes")(app);

module.exports = app;

// app.listen({port: PORT}, async() =>{
//   await User.sync({ force: true });
//   console.log(`Server is running on port ${PORT}.`);

// });
