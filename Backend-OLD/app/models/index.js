const fs = require("fs")
const path = require("path")
const basename = path.basename(__filename) // Nome do arquivo atual (index.js)

var db = {} // Armazenará as informações das Models

// Função para ler os atributos das Models
function readModelsAttrs() {
  // Lê todos os arquivos no diretório atual
  const allFilesDir = fs.readdirSync(__dirname);

  // Filtra os arquivos pelo nome e extensão
  allFilesDir
    .filter((file) => file.indexOf(".") !== 0 && file !== basename)

    .forEach((file) => {
      // Itera sobre os arquivos e carrega os modelos
      const model = require(path.join(__dirname, file)); // Carrega o modelo usando require
      db[file.slice(0, -3)] = model[file.slice(0, -3)]; // Armazena o modelo no objeto db com o nome do arquivo (sem extensão) como chave
    })

  return db
}

// Função para obter uma instância do objeto db como promessa
function getInstance() {
  return new Promise((resolve, reject) => {
    readModelsAttrs()
    return resolve(db)
  });
}

// Exporta a instância do objeto db
module.exports = () => {
  return readModelsAttrs()
}
