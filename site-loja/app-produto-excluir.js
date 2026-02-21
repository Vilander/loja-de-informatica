// function fnExcluirProduto(id) {
//   fetch("http://localhost:3000/produto/" + id, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((resposta) => resposta.json())
//     .then((dados) => {
//       console.dir(dados);
//     })
//     .catch((erro) => console.log(erro.message));
// }

function fnExcluirProduto(id, botao) {
  if (confirm("Deseja realmente excluir este item?")) {
    fetch("http://localhost:3000/produto/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resposta) => {
        if (resposta.ok) {
          const linha = botao.closest("tr");
          if (linha) {
            linha.style.opacity = "0";
            setTimeout(() => linha.remove(), 300);
          }
        } else {
          alert("Erro ao excluir o produto do servidor.");
        }
      })
      .catch((erro) => {
        console.error("Erro:", erro.message);
        alert("Erro de conexão ao tentar excluir.");
      });
  }
}
