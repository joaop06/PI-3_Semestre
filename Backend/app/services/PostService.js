const CommonService = require('./CommonService')
const moment = require('moment')

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
}

module.exports = PostService