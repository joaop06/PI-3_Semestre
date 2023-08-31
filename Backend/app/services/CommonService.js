const prisma = require('../db/config')

class CommonService {
  constructor(modelName) {
    this.modelName = modelName
  }

  // #################################### BUSCAR DOCUMENTOS #################################### \\

  // (Route Default) Busca e Conta todos os documentos
  async find(req, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {

        // Mapeia todos os atributos da req.query como parâmetro de busca
        if (req.query) {
          Object.entries(req.query).map(([key, value]) => {
            if (!["page", "perPage"].includes(key)) { // Exclui os parâmetros page e perPage da consulta
              if (key == "id") key = "_id"
              options.where[key] = value
            }
          })
        }

        let result = await prisma[this.modelName].findMany(options)
        resolve({ count: result.length, success: true, rows: result })

      } catch (error) {
        reject(error)
      }
    })
  }

  // Busca apenas um documento pelo ID
  // async findById(id) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const result = await prisma[this.modelName].findById(id)
  //       resolve({ success: true, result: result })

  //     } catch (error) {
  //       reject(error)
  //     }
  //   })
  // }

  // Busca apenas o primeiro Documento encontrado   // Validated
  // async findOne(where) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const result = await prisma[this.modelName].findOne(where)
  //       if (result) resolve({ success: true, found: true, result: result })
  //       else resolve({ success: true, found: false, result: result })

  //     } catch (error) {
  //       reject(error)
  //     }
  //   })
  // }

  // #################################### INSERIR DOCUMENTOS #################################### \\

  // (Route Default) Insere apenas um único documento por vez   // Validated
  async create(object) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await prisma[this.modelName].create({ data: object })
        resolve({ success: true, document: result?._doc })

      } catch (error) {
        reject(error)
      }
    })
  }

  // Insere vários documentos de uma vez
  // async insertMany(objects) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const result = await prisma[this.modelName].insertMany(objects)
  //       resolve({ success: true, result: result })

  //     } catch (error) {
  //       reject(error)
  //     }
  //   })
  // }

  // #################################### ATUALIZAR DOCUMENTOS #################################### \\

  // (Route Default) Atualiza um único documento   // Validated
  async update(req, object, where = {
    _id: req.query?.id ? req.query.id : req.body?.id ? req.body?.id : undefined
  }
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await prisma[this.modelName].updateOne(where, object)
        resolve({ success: true, result: result })

      } catch (error) {
        reject(error)
      }
    })
  }

  // Atualiza vários documentos
  // async updateMany(where, objects) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const result = await prisma[this.modelName].updateMany(where, { $set: objects })
  //       resolve({ success: true, result: result?._doc })

  //     } catch (error) {
  //       reject(error)
  //     }
  //   })
  // }

  // #################################### DELETAR DOCUMENTOS #################################### \\

  // (Route Default) Deleta apenas um documento   // Validated
  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await prisma[this.modelName].findByIdAndDelete({ _id: id })
        resolve(result)

      } catch (error) {
        reject(error)
      }
    })
  }

  // Deleta vários documentos
  // async deleteMany(where) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const result = await prisma[this.modelName].deleteMany(where)
  //       resolve({ success: true, result: result })

  //     } catch (error) {
  //       reject(error)
  //     }
  //   })
  // }
}

module.exports = CommonService
