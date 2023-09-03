const prisma = require('../db/config')

class CommonService {
  constructor(modelName) {
    this.modelName = modelName
  }

  // #################################### BUSCAR DOCUMENTOS #################################### \\
  // (Route Default) Busca e Conta todos os documentos
  async findMany(req, options = { where: {} }) {
    return new Promise(async (resolve, reject) => {
      try {

        // Verifica se a req.query não é vazia
        if (Object.keys(req.query).length !== 0) {
          // Mapeia todos os atributos da req.query como parâmetro de busca
          Object.entries(req.query).map(([key, value]) => {
            // Cria ou Insere o atributo da query no obj options.where
            if (!['page', 'perPage'].includes(key) && !options.where[key]) {
              options.where[key] = value
            }
          })
        }

        // Paginação
        options.take = req.query?.perPage ? parseInt(req.query.perPage) : undefined
        options.skip = req.query?.page ? parseInt(options.take * (req.query.page - 1)) : undefined

        // Consulta na Collection
        let result = await prisma[this.modelName].findMany(options)
        resolve({ count: result.length, success: true, rows: result })

      } catch (error) {
        reject(error)
      }
    })
  }

  // #################################### INSERIR DOCUMENTOS #################################### \\
  // (Route Default) Insere apenas um único documento por vez
  async create(object, req) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await prisma[this.modelName].create({ data: object })
        resolve({ success: true, document: result })

      } catch (error) {
        reject(error)
      }
    })
  }

  // #################################### ATUALIZAR DOCUMENTOS #################################### \\
  // (Route Default) Atualiza um único documento
  async update(object, req, options = {
    where: req.query?.id ? { id: req.query.id } : // Caso tenha ID na query
      req.body?.id ? { id: req.body?.id } : undefined // Senão verifica no body
  }
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await prisma[this.modelName].update({ data: object, ...options })
        resolve({ success: true, result: result })

      } catch (error) {
        reject(error)
      }
    })
  }

  // #################################### DELETAR DOCUMENTOS #################################### \\
  // (Route Default) Deleta apenas um documento
  async delete(id, req) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await prisma[this.modelName].delete({ where: { id: id } })
        resolve(result)

      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = CommonService
