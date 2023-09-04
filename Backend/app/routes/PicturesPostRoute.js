const CommonRoute = require('./CommonRoute')
const PicturesPostController = require('../controllers/PicturesPostController')

class PicturesPostRoute extends CommonRoute {
    constructor(app) {
        super(PicturesPostController, app, 'pictures-post')
    }
}

module.exports = (app) => {
    return new PicturesPostRoute(app)
}