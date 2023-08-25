const { resolve } = require("path");
const User = require("../models/User");
const { rejects } = require("assert");

class CommonService {
  constructor(modelName, models, repositoryName) {
    this.modelName = modelName;
    this.models = models;
  }

  // #################################### BUSCAR DOCUMENTOS #################################### \\

  // Validated
  // (Route Default) Busca e Conta todos os documentos
  async find(req, where = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const page = parseInt(req.query?.page) || 1;
        const perPage = parseInt(req.query?.perPage) || 10;

        // Mapeia todos os atributos da req.query como parâmetro de busca
        Object.entries(req.query).map(([key, value]) => {
          if (!["page", "perPage"].includes(key)) {
            if (key == "id") key = "_id";
            where[key] = value;
          }
        });

        // Realiza a consulta na tabela
        let result = await this.models[this.modelName]
          .find(where)
          .skip((page - 1) * perPage)
          .limit(perPage);
        resolve({ count: result.length, success: true, rows: result });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Busca apenas um documento pelo ID
  async findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.models[this.modelName].findById(id);
        resolve({ success: true, result: result });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Validated
  // Busca apenas o primeiro Documento encontrado
  async findOne(where) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.models[this.modelName].findOne(where);
        if (result) resolve({ success: true, found: true, result: result });
        else resolve({ success: true, found: false, result: result });
      } catch (error) {
        reject(error);
      }
    });
  }

  // #################################### INSERIR DOCUMENTOS #################################### \\

  // Validated
  // (Route Default) Insere apenas um único documento por vez
  async create(object) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.models[this.modelName].create(object);
        resolve({ success: true, document: result?._doc });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Insere vários documentos de uma vez
  async insertMany(objects) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.models[this.modelName].insertMany(objects);
        resolve({ success: true, result: result });
      } catch (error) {
        reject(error);
      }
    });
  }

  // #################################### ATUALIZAR DOCUMENTOS #################################### \\

  // Validated
  // (Route Default) Atualiza um único documento
  async update(
    req,
    object,
    where = {
      _id: req.query?.id
        ? req.query.id
        : req.body?.id
        ? req.body?.id
        : undefined,
    }
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.models[this.modelName].updateOne(
          where,
          object
        );
        resolve({ success: true, result: result });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Atualiza vários documentos
  async updateMany(where, objects) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.models[this.modelName].updateMany(where, {
          $set: objects,
        });
        resolve({ success: true, result: result?._doc });
      } catch (error) {
        reject(error);
      }
    });
  }

  // #################################### DELETAR DOCUMENTOS #################################### \\

  // Validated
  // (Route Default) Deleta apenas um documento
  async delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.models[this.modelName].findByIdAndDelete({
          _id: id,
        });
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Deleta vários documentos
  async deleteMany(where) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.models[this.modelName].deleteMany(where);
        resolve({ success: true, result: result });
      } catch (error) {
        reject(error);
      }
    });

    // returns {deletedCount: x} where x is the number of documents deleted.
  }
}

module.exports = CommonService;
