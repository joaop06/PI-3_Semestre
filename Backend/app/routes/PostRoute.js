const CommonRoute = require('./CommonRoute')
const PostController = require('../controllers/PostController')

class PostRoute extends CommonRoute {
    constructor(app) {
        super(PostController, app, 'post')
    }

    setupRoutes() {
        this.app.get(`/${this.route}/total-likes`, this.controller.totalLikes.bind(this.controller))
        super.setupRoutes()
    }
}

module.exports = (app) => {
    return new PostRoute(app)
}