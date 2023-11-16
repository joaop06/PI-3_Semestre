const CommonRoute = require('./CommonRoute')
const PostController = require('../controllers/PostController')

class PostRoute extends CommonRoute {
    constructor(app) {
        super(PostController, app, 'post')
    }

    setupRoutes() {
        this.app.get(`/${this.route}/post-statistics`, this.controller.postStatistics.bind(this.controller))
        super.setupRoutes()
    }
}

module.exports = (app) => {
    return new PostRoute(app)
}