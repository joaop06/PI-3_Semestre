const CommonService = require('./CommonService')
const moment = require('moment')

class PostService extends CommonService {
    constructor(modelName) {
        super(modelName)
        this.modelName = modelName
    }

    async findMany(req) {
        return await prisma[this.modelName].findMany({
            include: {
                users_likes: true
            }
        })
    }

    async create(Post, req) {

        const bodyPost = {
            title: "Título Bom",
            description: "Descrição Legal!",
            usersIDs: {
                create: ["64f119a6b776830fdb79ca56"]
            }
        }

        return await super.create(bodyPost, req)
    }

    async update(Post, req) {

        // Atualização de Curtidas no Post
        if ([true, false].includes(Post.likes)) {
            let quantityLikes = await this.findMany(req, { where: { id: req.query.id } })
            quantityLikes = quantityLikes.rows[0].likes

            if (Post.likes) Post.likes = quantityLikes + 1
            else Post.likes = quantityLikes - 1
        }

        return super.update(Post, req)
    }
}

module.exports = PostService