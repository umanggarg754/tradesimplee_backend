module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "passpass",
  DB: "uat",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// const user = await UserDAO.getUserByEmail('test@test.at')

// user.password.set({hash: 'i am changed now'})

// await user.password.save()