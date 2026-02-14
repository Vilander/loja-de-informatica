function fnAlterarFoto() {
  if (foto.value != "") {
    document.getElementById("fundo-imagem").style.backgroundImage =
      `url('${foto.value}')`;
  } else {
    document.getElementById("fundo-imagem").style.backgroundImage =
      `url('https://images.unsplash.com/photo-1740630386542-6e0953160fb4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`;
  }
  console.log(foto.value);
}

function fnLimparCampos() {
  document.getElementById("form-unidades").reset();
}

function fnMensagemSalvar() {
  let toastElList = [].slice.call(document.querySelectorAll(".toast"));
  let toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });
  toastList.forEach((toast) => toast.show());
}

function fnCadastrarUnidades() {
  let formDados = {
    nome_da_loja: document.getElementById("nome_da_loja").value,
    foto: document.getElementById("foto").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value,
    endereco: document.getElementById("endereco").value,
    latitude: document.getElementById("latitude").value,
    longitude: document.getElementById("longitude").value,
  };

  console.dir(formDados);

  fetch("http://localhost:3000/unidade/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formDados),
  })
    .then((resposta) => resposta.json())
    .then((dados) => {
      fnLimparCampos();
      console.log(dados);
      fnMensagemSalvar();
    })
    .catch((erro) => console.log(erro.message));
}

let foto = document.getElementById("foto");
let btn_salvar = document.getElementById("btn-salvar-unidade");

foto.addEventListener("blur", function () {
  fnAlterarFoto();
});

btn_salvar.addEventListener("click", () => {
  fnCadastrarUnidades();
});

const telefoneInput = document.getElementById("telefone");

telefoneInput.addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, "");
  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
  valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
  e.target.value = valor;
});
