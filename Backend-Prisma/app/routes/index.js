const fs = require("fs")

const routes = async (app) => {
  const basename = "CommonRoute.js"
  const result = fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file !== "index.js" &&
        file.slice(-3) === ".js"
      )
    })
    .map((file) => {
      const Router = require(`./${file}`)
      return Router(app)
    })
  await Promise.all(result)
}

module.exports = routes
