const prisma = require('../config/prisma')

class CommonService {
  constructor(modelName) {
    this.modelName = modelName
  }

  // #################################### BUSCAR DOCUMENTOS #################################### \\
  // (Route Default) Busca e Conta todos os documentos
  async findMany(req, options = { where: {} }) {
    try {

      // Verifica se a req.query não é vazia
      // Mapeia todos os atributos da req.query como parâmetro de busca
      if (Object.keys(req.query).length !== 0) {
        Object.entries(req.query).map(([key, value]) => {
          // Cria ou Insere o atributo da query no obj options.where
          if (this.modelName in prisma && key in prisma[this.modelName].fields) {
            options.where[key] = value
          }

        })
      }

      // Paginação
      options.take = req.query?.perPage ? parseInt(req.query.perPage) : 10 // Documentos exibidos por página
      options.skip = req.query?.page ? parseInt(options.perPage * (req.query.page - 1)) : 0 // Quantos documentos irá pular para buscar somente os da página indicada

      // Consulta na Collection
      const result = await prisma[this.modelName].findMany(options)
      return { count: result.length, success: true, rows: result }

    } catch (error) {
      return { error: error }
    }
  }

  // #################################### INSERIR DOCUMENTOS #################################### \\
  // (Route Default) Insere apenas um único documento por vez
  async create(object, req) {
    try {
      const result = await prisma[this.modelName].create({ data: object })
      return { success: true, document: result }

    } catch (error) {
      return { error: error }
    }
  }

  // #################################### ATUALIZAR DOCUMENTOS #################################### \\
  // (Route Default) Atualiza um único documento
  async update(object, req, options = {
    where: req.query?.id ? { id: req.query.id } : // Caso tenha ID na query
      req.body?.id ? { id: req.body?.id } : undefined // Senão verifica no body
  }
  ) {
    try {
      const result = await prisma[this.modelName].update({ where: options.where, data: object })
      return { success: true, result: result }

    } catch (error) {
      return { error: error }
    }
  }

  // #################################### DELETAR DOCUMENTOS #################################### \\
  // (Route Default) Deleta apenas um documento
  async delete(id, req) {
    try {
      const result = await prisma[this.modelName].delete({ where: { id: id } })
      return result

    } catch (error) {
      return { error: error }
    }
  }
}

module.exports = CommonService
