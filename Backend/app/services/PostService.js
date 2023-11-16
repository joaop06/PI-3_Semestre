const prisma = require('../config/prisma')
const UserService = require('./UserService')
const CommonService = require('./CommonService')


class PostService extends CommonService {
    constructor(modelName) {
        super(modelName)
        this.modelName = modelName
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

    async update(post, req, next) {
        const { id: postId, liked } = req.query

        // Verifica se o ID da postagem é válido (você pode adicionar validações adicionais)
        if (!postId) {
            const error = new Error('ID de postagem não informado')
            error.statusCode = 400
            return next(error)
        }

        // Atualização de Curtidas da Publicação
        if (![null, undefined].includes(liked) && post.usersLikeID) {
            // Nova Instância UserService
            this.userService = new UserService('User')

            // Encontra a Publicação a ser Atualizada
            const findUser = await this.userService.findUnique(next, { where: { id: post.usersLikeID[0] } })
            const findPost = await super.findUnique(next, { where: { id: postId } })


            // Tratativa caso não encontre
            if (!findPost) {
                const error = new Error('Postagem não encontrada')
                error.statusCode = 404
                return next(error)
            }

            // Objeto com parâmetros para update (Adicionar ou remover curtida)
            const userUpdate = {}
            const postUpdate = {}

            if (liked === 'true') {
                /* Adiciona os IDs correspondentes as listagens de like, tanto da Publicação
                    quanto do Usuário, adicionando uma nova curtida */

                let verifyLiked = await super.findUnique(next, { where: { id: postId } })
                verifyLiked = verifyLiked.usersLikeID.find(like => like === post.usersLikeID[0])

                if (verifyLiked) {
                    const error = new Error('Usuário já curtiu essa postagem')
                    error.statusCode = 400
                    return next(error)
                }

                userUpdate.push = [postId] // Add ID da Publicação
                postUpdate.push = post.usersLikeID[0] // Add ID do Usuário
            }

            if (liked === 'false') {
                /* O filter serve para deixar na lista de like somente os IDs que são diferentes do ID informado,
                    ou seja, remove o ID informado, tanto da publicação, quanto do usuário, removendo a curtida. */
                userUpdate.set = findUser.postsLikedID.filter(id => id !== postId) // Remove ID da Publicação
                postUpdate.set = findPost.usersLikeID.filter(id => id !== post.usersLikeID[0]) // Remove ID do Usuário
            }

            // Atualiza no registro do usuário, removendo a curtida
            await this.userService.directUpdate({
                where: { id: post.usersLikeID[0] },
                data: {
                    postsLikedID: {
                        ...userUpdate
                    }
                }
            })

            // Atualiza a postagem com a nova quantidade de curtidas
            return await super.update({
                where: { id: postId },
                data: {
                    usersLikeID: {
                        ...postUpdate // Adicione aqui o ID do usuário a ser adicionado à matriz
                    }
                }
            })
        }

        // Caso não entre na alteração de curtidas
        if (post.usersLikeID) delete post.usersLikeID

        return await super.update(post, req, next)
    }

    async totalLikes(req, next) {
        const totalPosts = await prisma[this.modelName].findMany()

        let totalLikes = 0
        let listPosts = []

        totalPosts.forEach(post => {
            totalLikes += post?.usersLikeID?.length
            listPosts.push({
                id: post.id,
                likes: post?.usersLikeID?.length
            })
        })

        return {
            totalLikes,
            listPosts: listPosts
        }
    }
}

module.exports = PostService