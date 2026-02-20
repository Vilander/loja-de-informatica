function fnMontarProduto(produto) {
  document.getElementById("foto-produto").src = produto.foto;
  document.getElementById("titulo-produto").innerHTML = produto.titulo;
  document.getElementById("categoria-produto").innerHTML = produto.categoria;
  document.getElementById("preco-produto").innerHTML =
    produto.preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  document.getElementById("avaliacao-produto").innerHTML =
    "⭐".repeat(produto.avaliacao) + `(${produto.avaliacao})`;
  document.getElementById("descricao-produto").innerHTML = produto.descricao;
}

function fnCarregarDados() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id") + "/";
  fetch("http://localhost:3000/produto/" + id, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((produtos) => {
      produtos.forEach((produto) => {
        fnMontarProduto(produto);
      });
    })
    .catch((erro) => console.log(erro.message));
}

fnCarregarDados();
