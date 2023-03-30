const express = require('express')
const router = express.Router()

const produtoMid = require('../middleware/validarProduto.middleware')

//const produtos = {};

const { v4: uuidv4 } = require('uuid');

const { Produto } = require('../models')

router.post('/', produtoMid)
router.put('/', produtoMid)


router.get('/', async (req, res) => {
    const prods = await Produto.findAll()
    res.json({ Produtos: prods })
});

router.post('/', async (req, res) => {
    const prods = await Produto.create(req.body)
    res.json({msg: "Produto adicionado com sucesso!"})
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const prod = await Produto.findByPk(id)
    if (prod){
        prod.nome = req.body.nome
        prod.descrição = req.body.descrição
        prod.preço = req.body.preço
        await prod.save()
        res.json({msg: "Produto atualizado com sucesso!"})
    }else{
        res.status(400).json({msg: "Produto não encontrado!"})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const prod = await Produto.findByPk(id)
    if (prod){
        await prod.destroy()
        res.json({msg: "Produto deletado com sucesso!"})
    }else{
        res.status(400).json({msg: "Produto não encontrado!"})
    }
})


module.exports = router