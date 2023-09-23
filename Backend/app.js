require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

// Config
app.use(cors())
app.use(express.json())

// Start Server
app.listen(process.env.SERVER_PORT ?? 7000, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT ?? 7000}`)
});

// Routes
require("./app/routes")(app)

// Middleware de Erro
app.use(function onError(err, req, res, next) {
  const statusCode = err.statusCode || 500
  res.status(statusCode).send({ error: err.message })
})



