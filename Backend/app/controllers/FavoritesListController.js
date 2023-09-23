const FavoritesListService = require('../services/FavoritesListService')
const CommonController = require('./CommonController')

class FavoritesListController extends CommonController {
    constructor() {
        super(FavoritesListService, 'FavoritesList')
    }
}

module.exports = FavoritesListController