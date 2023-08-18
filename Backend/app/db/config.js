require('dotenv').config()
const mongoose = require('mongoose')

async function main() {
    try {
        // await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tdoicso.mongodb.net/?retryWrites=true&w=majority`)
        console.log(`Connected in DataBase`)

    } catch (error) {
        console.log("Error: ", error)
    }
}

module.exports = main