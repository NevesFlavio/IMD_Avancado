const Ajv = require('ajv')
const ajv = new Ajv()
const addFormats = require("ajv-formats")
const produtoSchema = require('../schema/produto.schema')

addFormats(ajv)
    
function validarProduto (req, res, next){
    const prod = req.body
    const validate = ajv.compile(produtoSchema)
    const valid = validate(prod)
    if (valid){
        next()
    }else{
        res.status(400).json({msg: "Dados inválidos", erros: validate.errors})
    }
}

module.exports = validarProduto