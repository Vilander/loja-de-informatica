const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//necessárop para permitir requisições de diferentes origens(domínios/servidores)
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  //    res.setHeader('Access-Control-Allow-Origin', '*')
  res.send("ZecaInfo");
});

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

let mysql = require("mysql");
let conexao = mysql.createConnection({
  host: "108.179.193.209",
  user: "gutoxa27_alunos",
  password: "JD_eXLNHp1ZG",
  database: "gutoxa27_bd_loja",
});

// host: 108.179.193.209
// banco: gutoxa27_bd_loja
// usuario: gutoxa27_alunos
// senha: JD_eXLNHp1ZG

conexao.connect(function (erro) {
  if (erro) {
    console.log("Não foi possível estabelecer conexão \n");
    throw erro;
  } else {
    console.log("Sucesso na Conexão \n");
  }
});

//READY ALL
app.get("/produtos", function (req, res) {
  //res.setHeader('Access-Control-Allow-Origin', '*')
  //res.send(lista_produtos)
  conexao.query(
    "SELECT * FROM `produtos` ORDER BY avaliacao ASC",
    function (erro, lista_produtos, campos) {
      //console.log(lista_produtos);
      res.send(lista_produtos);
    },
  );
});

//READY BY CATEGORIA
app.get("/produtos/:categoria", function (req, res) {
  //res.setHeader('Access-Control-Allow-Origin', '*')
  //pegamos a categoria que foi enviada na requisição
  const categoria = req.params.categoria;
  conexao.query(
    `SELECT * FROM produtos WHERE categoria = '${categoria}'`,
    function (erro, lista_produtos, campos) {
      res.send(lista_produtos);
    },
  );
});

app.get("/produtos/:categoria/:ordem", function (req, res) {
  //res.setHeader('Access-Control-Allow-Origin', '*')
  const categoria = req.params.categoria;
  const ordem = req.params.ordem;
  //console.log(ordem)
  conexao.query(
    `SELECT * FROM produtos WHERE categoria = '${categoria}' ORDER BY ${ordem} ASC`,
    function (erro, lista_produtos, campos) {
      res.send(lista_produtos);
      //console.log()
    },
  );
});

app.post("/produto/", function (req, res) {
  const data = req.body;
  conexao.query(
    `INSERT INTO produtos set ?`,
    [data],
    function (erro, resultado) {
      if (erro) {
        res.json(erro);
      }
      res.send(resultado.insertId);
    },
  );
});

//READ ONE - [GET] / produto /: id

app.get("/produto/:id", function (req, res) {
  const id = req.params.id;
  conexao.query(
    "SELECT * FROM produtos WHERE id = ?",
    [id],
    function (erro, dados, campos) {
      res.json(dados);
    },
  );
});

//==========================================================//
//READY ALL UNIDADES
app.get("/unidades", function (req, res) {
  //res.setHeader('Access-Control-Allow-Origin', '*')
  conexao.query(
    "SELECT * FROM `unidades`",
    function (erro, lista_unidades, campos) {
      //console.log(lista_unidades);
      res.send(lista_unidades);
    },
  );
});

app.post("/unidade/", function (req, res) {
  const data = req.body;
  conexao.query(
    `INSERT INTO unidades set ?`,
    [data],
    function (erro, resultado) {
      if (erro) {
        res.json(erro);
      }
      res.send(resultado.insertId);
    },
  );
});

//==========================================================//
//LOGIN E CADASTRO DE USUÁRIOS
app.post("/login/", (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;
  conexao.query(
    `SELECT * FROM usuarios WHERE usuario = '${usuario}' AND senha = '${senha}'`,
    (erro, resultado, campo) => {
      if (erro) {
        res.send(erro);
      } else {
        if (resultado.length > 0) {
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      }
    },
  );
});

app.post("/cadastro/", (req, res) => {
  const data = req.body;

  console.log(data);

  conexao.query(
    "INSERT INTO usuarios set ?",
    [data],
    (erro, resultado, campo) => {
      if (erro) {
        res.sendStatus(401);
      } else {
        res.sendStatus(200);
      }
    },
  );
});

//====================Update - [PUT] / produto/:id ========================//
app.put("/produto/:id", function (req, res) {
  const id = req.params.id;
  const data = req.body;

  conexao.query(
    `UPDATE produtos set ? WHERE id = ${id}`,
    [data],
    function (erro, resultado) {
      if (erro) {
        res.send(erro);
      }
      res.send({ status: 200, message: "Produto atualizado com sucesso!" });
    },
  );
});

//====================Delete - [DELETE] / produto/:id ========================//
app.delete("/produto/:id", function (req, res) {
  const id = req.params.id;

  conexao.query(
    `DELETE FROM produtos WHERE id = ${id}`,
    function (erro, resultado) {
      if (erro) {
        res.send(erro);
      }
      res.json({ status: 200, message: "Produto excluído com sucesso!" });
    },
  );
});

app.listen(3000);
