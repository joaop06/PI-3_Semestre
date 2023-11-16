const PostService = require('../services/PostService')
const CommonController = require('./CommonController')

class PostController extends CommonController {
    constructor() {
        super(PostService, 'Post')
    }

    async totalLikes(req, res, next) {
        try {
            const result = await this.service.totalLikes(req, next)
            res.status(200).send({ ...result })

        } catch (e) {
            next(e)
        }
    }
}

module.exports = PostController