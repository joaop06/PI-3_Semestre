const CommonService = require('./CommonService')
const UserService = require('./UserService')
const moment = require('moment')
const prisma = require('../config/prisma')

class PostService extends CommonService {
    constructor(modelName) {
        super(modelName)
        this.modelName = modelName

        const userService = new UserService('User')
        this.userService = userService
    }

    async findMany(req) {

        // Mapeia as opções de busca incluindo o relacionamento
        let options = {
            where: {},
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        isAdmin: true
                    }
                }
            }
        }

        // Busca Parcial para o campo `title`
        if (Object.keys(req.query).length !== 0 && req.query?.title) {
            options.where = { title: { contains: req.query.name } }
        }

        // Caso seja passado full=false, será desconsiderado as informações do relacionamento
        if (req.query.full === 'false') {
            options.include = {}
        }

        return await super.findMany(req, options)
    }

    async update(Post, req, next) {
        const { liked } = req.query

        // Curtidas da Postagem
        if (liked) {
            let dataUser = { postsLikedID: {} }
            let options = {
                where: { id: Post.usersLikeID }
            }

            // Remove Curtida
            if (liked == 'false') dataUser.postsLikedID = { disconnect: { id: Post.id } }

            // Adiciona Curtida
            if (liked == 'true') dataUser.postsLikedID = { connect: { id: Post.id } }

            try {
                await this.userService.update(dataUser, req, next, options)
            } catch (error) {
                error.statusCode = 400
                return next(error)
            }
        }

        return await super.update(Post, req, next, options)
    }
}

module.exports = PostService