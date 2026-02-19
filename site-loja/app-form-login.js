function fnLimparCampos() {
    document.getElementById("form-usuario").reset()
}

let btn_cadastro = document.getElementById("btn-cadastrarUsuario")
btn_cadastro.addEventListener("click", function () {
    fnCadastrarUsuario()
})

function fnCadastrarUsuario() {
    let formDados = {
        usuario: document.getElementById("usuario").value,
        senha: document.getElementById("senha").value,
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        permissao: document.getElementById("permissaoUsuario").value
    }

    console.dir(formDados)

    fetch("http://localhost:3000/cadastro/", {
        method: "POST",
        headers:{
            'Content-type': 'application/json',
        },
        body: JSON.stringify(formDados)
    })
        .then(resposta => resposta.status)
        .then((dados) => {
            fnLimparCampos()
            if (dados == 200) {
                console.log("Usuario Cadasrado")
            } else if (dados == 401) {
                console.log("Erro no Cadastro")
            }
        })
        .catch(erro => console.log(erro.message))
} 