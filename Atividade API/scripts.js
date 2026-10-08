function converterMoeda() {
    var moeda = document.getElementById("moeda").value;
    var valor = Number(document.getElementById("valor").value);

    if (valor <= 0) {
        document.getElementById("resultado").innerHTML =
            "Digite um valor válido.";
    } else {
        buscarCotacao(moeda, valor);
    }
}

function buscarCotacao(moeda, valor) {
    var url = "https://economia.awesomeapi.com.br/json/last/" + moeda;

    fetch(url)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            mostrarCotacao(dados, moeda, valor);
        })
        .catch(function () {
            document.getElementById("resultado").innerHTML =
                "Erro ao consultar a cotação.";
        });
}

function mostrarCotacao(dados, moeda, valor) {
    var codigo = moeda.replace("-", "");
    var cotacao = Number(dados[codigo].bid);
    var resultado = valor * cotacao;

    document.getElementById("resultado").innerHTML =
        "Valor convertido: " + resultado.toFixed(2) +
        " " + moeda.split("-")[1];
}