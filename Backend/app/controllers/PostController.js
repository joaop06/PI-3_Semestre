const PostService = require('../services/PostService')
const CommonController = require('./CommonController')

class PostController extends CommonController {
    constructor() {
        super(PostService, 'Post')
    }
}

module.exports = PostController