require('dotenv').config()
const mongoose = require('mongoose')

async function main() {
    try {
        await mongoose.connect(`${process.env.DB_HOST}`, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Connected in DataBase`)

    } catch (error) {
        console.log("Error: ", error)
    }
}

module.exports = main