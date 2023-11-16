const PostService = require('../services/PostService')
const CommonController = require('./CommonController')

class PostController extends CommonController {
    constructor() {
        super(PostService, 'Post')
    }

    async postStatistics(req, res, next) {
        try {
            const result = await this.service.postStatistics(req, next)
            res.status(200).send({ ...result })

        } catch (e) {
            next(e)
        }
    }
}

module.exports = PostController