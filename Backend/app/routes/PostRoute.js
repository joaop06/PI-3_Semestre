const CommonRoute = require('./CommonRoute')
const PostController = require('../controllers/PostController')

class PostRoute extends CommonRoute {
    constructor(app) {
        super(PostController, app, 'post')
    }
}

module.exports = (app) => {
    return new PostRoute(app)
}