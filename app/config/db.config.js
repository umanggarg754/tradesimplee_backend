// module.exports = {
//   HOST: "localhost",
//   USER: "postgres",
//   PASSWORD: "passpass",
//   DB: "uat",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };


// postgres://umanggarg754:rPWFkN8C4etI@ep-odd-feather-65579617.ap-southeast-1.aws.neon.tech/tradesimplee


module.exports = {
  HOST: "ep-odd-feather-65579617.ap-southeast-1.aws.neon.tech",
  USER: "umanggarg754",
  PASSWORD: "rPWFkN8C4etI",
  DB: "tradesimplee",
  dialect: "postgres",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// const user = await UserDAO.getUserByEmail('test@test.at')

// user.password.set({hash: 'i am changed now'})

// await user.password.save()