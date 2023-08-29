require("dotenv").config()
const mongoose = require("mongoose")

async function main() {
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect(`${process.env.DB_HOST}`, { useNewUrlParser: true, useUnifiedTopology: true, })
      console.log(`Connected in DataBase`)

    } catch (error) {
      reject(error)
    }
  })

}

module.exports = main
