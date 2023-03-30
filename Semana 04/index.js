const express = require('express');

const rotaProduto = require('./rotas/produto.rota')
const app = express();

app.use(express.json());

app.use('/produtos', rotaProduto)

app.get('/', (req, res) =>{
    res.send("funcionando no Express!")
});




app.listen(8080, () => {
    console.log('servidor pronto na porta 8080')
});