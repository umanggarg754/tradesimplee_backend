const dbConfig = require("../config/db.config.js");
const fs = require('fs');
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  native: true,
  ssl: true,
  dialectOptions: {
    project: "tradesimplee",
    ssl: {
      sslmode: 'require',
      rejectUnauthorized: false,
      // ca: fs.readFileSync(__dirname + '/../../ca-certificates.crt'),
      // key: fs.readFileSync('path_to_client.key'),
      // cert: fs.readFileSync(__dirname + '/../../ca-certificates.crt')
    },
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


// var sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: true
//   }
// });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize);
db.contact = require("./contact.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.user_company = require("./user_company.model.js")(sequelize, Sequelize);
db.currency = require("./currency.model.js")(sequelize, Sequelize);
// await tutorials.reload();
// await users.reload();



module.exports = db;
