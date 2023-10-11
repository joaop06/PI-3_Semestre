const prisma = require('../config/prisma')

class CommonService {
  constructor(modelName) {
    this.modelName = modelName
  }

  // #################################### BUSCAR DOCUMENTOS #################################### \\
  // (Route Default) Busca e Conta todos os documentos
  async findMany(req, next, options = {
    where: req?.query?.id ? { id: req.query.id } : {}
  }) {
    try {

      // Verifica se a req.query não é vazia
      // Mapeia todos os atributos da req.query como parâmetro de busca
      if (req?.query && Object.keys(req?.query).length !== 0) {
        Object.entries(req.query).map(([key, value]) => {
          // Cria ou Insere o atributo da query no obj options.where
          // if (this.modelName in prisma && key in prisma[this.modelName].fields) {
          //   options.where[key] = value
          // }
          if (!['page', 'perPage', 'liked'].includes(key) && options.where && !options.where[key]) {
            options.where[key] = value
          }
          if (!options.where) {
            options = {
              where: { [key]: value }
            }
          }
        })
      }

      // Paginação
      options.take = req?.query?.perPage ? parseInt(req.query.perPage) : 10 // Documentos exibidos por página
      options.skip = req?.query?.page ? parseInt(options.perPage * (req.query.page - 1)) : 0 // Quantos documentos irá pular para buscar somente os da página indicada

      // Consulta na Collection
      const result = await prisma[this.modelName].findMany(options)
      return { count: result.length, success: true, rows: result }

    } catch (error) {
      const errorLines = error.message.split('\n')
      error.message = errorLines[errorLines.length - 1].trim()
      return next(error)
    }
  }

  async findUnique(next, options) {
    try {
      return await prisma[this.modelName].findFirst(options)
    } catch (error) {
      const errorLines = error.message.split('\n')
      error.message = errorLines[errorLines.length - 1].trim()
      return next(error)
    }
  }

  // #################################### INSERIR DOCUMENTOS #################################### \\
  // (Route Default) Insere apenas um único documento por vez
  async create(object, req, next) {
    try {
      const result = await prisma[this.modelName].create({ data: object })
      return { success: true, document: result }

    } catch (error) {
      const errorLines = error.message.split('\n')
      error.message = errorLines[errorLines.length - 1].trim()
      return next(error)
    }
  }

  // #################################### ATUALIZAR DOCUMENTOS #################################### \\
  // (Route Default) Atualiza um único documento
  async update(object, req, next, options = {
    where: req?.query?.id ? { id: req.query.id } : // Caso tenha ID na query
      object?.id ? { id: object.id } : undefined // Senão verifica no body
  }
  ) {
    try {
      let result
      if (object.where && object.data) {
        result = await prisma[this.modelName].update(object)
      } else {
        result = await prisma[this.modelName].update({ where: options.where, data: object })
      }
      return { success: true, result: result }

    } catch (error) {
      error.statusCode = 400
      const errorLines = error.message.split('\n')
      error.message = errorLines[errorLines.length - 1].trim()
      return next(error)
    }
  }

  async directUpdate(object, next) {
    try {
      return await prisma[this.modelName].update(object)

    } catch (error) {
      error = new Error(`Erro ao Atualizar diretamente em ${this.modelName}`)
      error.statusCode = 400
      return next(error)
    }
  }

  // #################################### DELETAR DOCUMENTOS #################################### \\
  // (Route Default) Deleta apenas um documento
  async delete(id, req, next, options = {
    where: { id: id }
  }) {
    try {
      const result = await prisma[this.modelName].delete(options)
      return result

    } catch (error) {
      const errorLines = error.message.split('\n')
      error.message = errorLines[errorLines.length - 1].trim()
      return next(error)
    }
  }
}

module.exports = CommonService
