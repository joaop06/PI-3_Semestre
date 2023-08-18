require('dotenv').config()

const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
console.log(`Database: ${process.env.DB_NAME}   //   User: ${process.env.DB_USER}`)

var db = {}

function readModelsAttrs() {
    db.modelAttrs = []

    // Lê todos os arquivos
    fs.readdirSync(__dirname)

        // Filtra pelo Nome do Arquivo e Extensão
        .filter(file => (file.indexOf('.') !== 0) && (file == basename) && (file.slice(-3) === '.js'))

        // Itera sobre os arquivos extraindo os Atributos
        .forEach(file => {
            db.modelAttrs.push(file)
            console.log(db.modelAttrs)
        })


    // fs
    //     .readdirSync(__dirname)
    //     .filter(file => (
    //         !file.includes('Attr') &&
    //         file.indexOf('.') !== 0) &&
    //         (file !== basename) &&
    //         (file !== 'Revision') &&
    //         (file.slice(-3) === '.js')
    //     )
    //     .forEach(file => {
    //         const model = require(path.join(__dirname, file));
    //         db[model.name] = model;

    //     })

    // Object.keys(db).forEach(modelName => {
    //     if (db[modelName].associate) {
    //         db[modelName].associate(db)
    //     }
    // })

    // console.log(db)
}


function getInstance() {
    return new Promise((resolve, reject) => {
        readModelsAttrs()
        return resolve(db)
    })
}


module.exports = () => {
    return getInstance()
}
