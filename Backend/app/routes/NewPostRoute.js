const CommonRoute = require('./CommonRoute')
const NewPostController = require('../controllers/NewPostController')

class NewPostRoute extends CommonRoute {
    constructor(app) {
        super(NewPostController, app, 'new-post')
    }
}

module.exports = (app) => {
    return new NewPostRoute(app)
}