const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
dotenv.config();

var corsOptions = {
  origin: "http://localhost:8081"
};

//app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//app.use(fileUpload());
// app.use('/public', express.static('public'));

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
  res.json({ message: "Welcome to bezkoder application." });
});


require("./app/routes/user.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/contact.routes")(app);
require("./app/routes/order.routes")(app);

module.exports = app;

// app.listen({port: PORT}, async() =>{
//   await User.sync({ force: true });
//   console.log(`Server is running on port ${PORT}.`);

// });
