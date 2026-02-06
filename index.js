const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send ('ZecaInfo')
})

//----CARREGANDO DADOS JSON DIRETO NO ARQUIVO
// const lista_produtos = [
//     {
//         "titulo": "Red Nike",
//         "foto":"https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxzaG9lfGVufDB8MHx8fDE3MjEwNDEzNjd8MA&ixlib=rb-4.0.3&q=80&w=1080",
//         "descricao": "Tênis leve, com design versátil e acabamento moderno, perfeito para acompanhar sua rotina.",
//         "preco": 499.00,
//         "avaliacao": 5
//     },
//     {
//         "titulo": "Blue Nike",
//         "foto":"https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "descricao": "Modelo confortável, resistente e ideal para quem busca um visual urbano sem abrir mão do bem-estar.",
//         "preco": 699.00,
//         "avaliacao": 3
//     },
//     {
//         "titulo": "Black Nike",
//         "foto":"https://images.unsplash.com/photo-1643584549066-fc993fc9cb43?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "descricao": "Tênis com ajuste confortável, visual clean e solado que garante estabilidade em cada passo.",
//         "preco": 799.00,
//         "avaliacao": 4
//     }
// ]

//---CARREGANDO ARQUIVO dados.json
//const lista_produtos = require ('./dados.json')
// Read All - [GET] / produtos

let mysql = require('mysql')
let conexao = mysql.createConnection({
    host:"108.179.193.209",
    user: "gutoxa27_alunos",
    password:"JD_eXLNHp1ZG",
    database:"gutoxa27_bd_loja"
})


// host: 108.179.193.209
// banco: gutoxa27_bd_loja
// usuario: gutoxa27_alunos
// senha: JD_eXLNHp1ZG

conexao.connect(function(erro){
    if(erro){
        console.log("Não foi possível estabelecer conexão \n")
        throw erro;
    }else{
        console.log("Sucesso na Conexão \n")
    }
});

//READY ALL
app.get("/produtos", function (req, res){
    res.setHeader('Access-Control-Allow-Origin', '*')
    //res.send(lista_produtos)
    conexao.query("SELECT * FROM `produtos` ORDER BY avaliacao ASC", function(erro,lista_produtos,campos){
        console.log(lista_produtos);
        res.send(lista_produtos);
    })
})

//READY BY CATEGORIA
app.get("/produtos/:categoria", function (req, res){
    res.setHeader('Access-Control-Allow-Origin', '*')
    //pegamos a categoria que foi enviada na requisição
    const categoria = req.params.categoria
    conexao.query(`SELECT * FROM produtos WHERE categoria = '${categoria}'`, function(erro,lista_produtos,campos){
        res.send(lista_produtos);
    })
})

app.get("/unidades", function (req, res){
    res.setHeader('Access-Control-Allow-Origin', '*')
    conexao.query("SELECT * FROM `unidades`", function(erro,lista_unidades,campos){
        console.log(lista_unidades);
        res.send(lista_unidades);
    })
})

app.listen (3000)