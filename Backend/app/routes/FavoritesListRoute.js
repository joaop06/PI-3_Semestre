const CommonRoute = require("./CommonRoute")
const FavoritesListController = require("../controllers/FavoritesListController")

class FavoritesListRoute extends CommonRoute {
  constructor(app) {
    super(FavoritesListController, app, "favorites-list")
  }
}

module.exports = (app) => {
  return new FavoritesListRoute(app)
}
