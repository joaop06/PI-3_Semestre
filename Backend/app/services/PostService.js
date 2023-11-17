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

        // ERRO Caso ID não informado
        if (!postId) throw Object.assign(new Error('ID de postagem não informado'), { statusCode: 400 })


        // Atualização de Curtidas da Publicação
        if (![null, undefined].includes(liked) && post.usersLikeID) {

            this.userService = new UserService('User') // Nova Instância UserService

            // Encontra a Publicação a ser Atualizada
            const findUser = await this.userService.findUnique(next, { where: { id: post.usersLikeID[0] } })
            const findPost = await super.findUnique(next, { where: { id: postId } })


            // ERRO Caso não encontre Postagem
            if (!findPost) throw Object.assign(new Error('Postagem não encontrada'), { statusCode: 404 })


            // Objeto com parâmetros para update (Adicionar ou remover curtida)
            const userUpdate = {}
            const postUpdate = {}

            if (liked === 'true') {
                /* Adiciona os IDs correspondentes as listagens de like, tanto da Publicação
                    quanto do Usuário, adicionando uma nova curtida */

                let verifyLiked = await super.findUnique(next, { where: { id: postId } })
                verifyLiked = verifyLiked.usersLikeID.find(like => like === post.usersLikeID[0])

                // ERRO Caso já tenha curtido
                if (verifyLiked) throw Object.assign(new Error('Usuário já curtiu essa postagem'), { statusCode: 409 })


                userUpdate.push = [postId] // Add ID da Publicação
                postUpdate.push = post.usersLikeID[0] // Add ID do Usuário
            }

            if (liked === 'false') {
                // Filtra as listas removendo o respectivo ID (Da Postagem e Usuário)
                userUpdate.set = findUser.postsLikedID.filter(id => id !== postId)
                postUpdate.set = findPost.usersLikeID.filter(id => id !== post.usersLikeID[0])
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

    async postStatistics(req, next) {
        const posts = await prisma[this.modelName].findMany({
            include: {
                favoritesLists: true
            }
        })

        let totalLikes = 0
        let listPosts = []
        posts.forEach(post => {
            totalLikes += post?.usersLikeID?.length
            listPosts.push({
                id: post.id,
                likes: post?.usersLikeID?.length,
                favorited: post?.favoritesListId?.length > 0 ? (post?.favoritesListId.filter(favoriteList => favoriteList)).length : 0
            })
        })

        return {
            totalLikes,
            listPosts: listPosts
        }
    }
}

module.exports = PostService