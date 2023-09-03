const prisma = require('../db/config')
const CommonService = require('./CommonService')
const moment = require('moment')

class NewPostService extends CommonService {
    constructor(modelName) {
        super(modelName)
        this.modelName = modelName
    }

    async create(NewPost, req) {

        // Define data de criação e atualização padrão
        NewPost.createAt = moment()
        NewPost.updateAt = moment()
        NewPost.deleteAt = null

        return super.create(NewPost, req)
    }

    async update(NewPost, req) {

        // Atualização de Curtidas no Post
        if (NewPost.likes) {
            let quantityLikes = await this.findMany(req, { where: { id: req.query.id } })
            quantityLikes = quantityLikes.rows[0].likes

            if (NewPost.likes == 'more') NewPost.likes = quantityLikes + 1
            else NewPost.likes = quantityLikes - 1
        }

        return super.update(NewPost, req)
    }
}

module.exports = NewPostService