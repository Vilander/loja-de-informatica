function fnMontarCardUnidade(unidade){
    let cartao = `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
                <div class="card-unidade">
                    <img src="${unidade.foto}"
                        class="card-img-top" alt="${unidade.nome_da_loja}">
                    <div class="card-body">
                        <h5 class="card-title">${unidade.nome_da_loja}</h5>
                        <p class="card-text">${unidade.endereco}</p>
                        <div class="contato">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="h5 mb-0"> ${unidade.telefone}</span>
                            </div>
                            <div>
                                <span class="h5 mb-0"> ${unidade.email}</span>
                            </div>
                        <div>
                    </div>
                    <div class="mt-2">
                        <a 
                        href="https://www.google.com/maps?q=${unidade.latitude},${unidade.longitude}" 
                        target="_blank"
                        class="btn btn-sm btn-outline-primary"
                        >
                            <i class="bi bi-geo-alt"></i> Ver no mapa
                        </a>
                    </div>  
                </div>
            </div>
    `
    document.querySelector(".lista-unidades").innerHTML += cartao
}

function fnCarregarDados(){
    fetch('http://localhost:3000/unidades/', { method: 'GET'})
    .then(response => response.json ())
    .then((unidades) => {
        unidades.forEach(unidade => {
            fnMontarCardUnidade(unidade)
        });
    })
    .catch(erro => console.log(erro.message))
}

fnCarregarDados()