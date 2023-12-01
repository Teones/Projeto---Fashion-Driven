let nome = "";
let contadorItems = 0;

while (nome == null || nome == "") {
    nome = prompt("Qual o seu nome?");
}

let promessa = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
promessa.then(processarResposta);
let pedidos = {};

function processarResposta(resposta) {
    pedidos = resposta.data
    console.log(pedidos)
    let pedido = document.querySelectorAll(".pedido");

    for (let i = 0; i < 10; i++) {
        pedido[i].innerHTML = `
        <img class="pedidoPronto" src="${resposta.data[i]["image"]}">
        <b>Criador:</b> ${resposta.data[i]["owner"]}`;
    }
}

let pedido = {
    "model": "",
    "neck": "",
    "material": "",
    "image": "",
    "owner": nome,
    "author": nome
};

function escolhaModelo(tipo, model) {
    pedido.model = model;
    selecionarItem(tipo, ".modelo");
}

function escolhaGola(tipo, neck) {
    pedido.neck = neck;
    selecionarItem(tipo, ".gola");
}

function escolhaTecido(tipo, material) {
    pedido.material = material;
    selecionarItem(tipo, ".tecido");
}

function selecionarItem(tipo, classe) {
    const selecionado = document.querySelector(`${classe} .selecionado`);

    if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
    } else {
        contadorItems += 1;
    }

    tipo.classList.add("selecionado");
    habilitarBotao();
}

let input = document.querySelector("input");
input.addEventListener("input", habilitarBotao);

function checkLink() {
    let input = document.querySelector("input")
    let link = input.value
    let verificar = "https"
    let contadorLink = 0
    
    for (let i = 0; i <= 4; i++) {
        if (link[i] === verificar[i]) {
            contadorLink += 1
        }
    }

    if (contadorLink === 5) {
        pedido.image = link;
        return true;
    } else {
        return false;
    }
}

function habilitarBotao() {
    if (checkLink()){
        if (contadorItems == 3) {
            const botao = document.querySelector(".confimarPedido");
            botao.classList.add("ativo");
        }
    } else {
        const botao = document.querySelector(".confimarPedido");
        botao.classList.remove("ativo");
        return false
    }
}

function verificarPedido(){
    const botao = document.querySelector(".confimarPedido").classList.contains("ativo");
    return botao
}

function enviarPedido() {
    if (verificarPedido()){
        let enviandoPedido = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", pedido);
        enviandoPedido.then(pedidoSucesso);
        enviandoPedido.catch(pedidoFalhou);
    }
}
function pedidoRepetido(i) {
    console.log(i)
    console.log(pedidos)

    const pedidoAntigo = pedidos[i]
    let novoPedido = {
        "model": pedidoAntigo.model,
        "neck": pedidoAntigo.neck,
        "material": pedidoAntigo.material,
        "image": pedidoAntigo.image,
        "owner": pedidoAntigo.owner,
        "author": nome
    }
    console.log(novoPedido)
    let prosseguir = confirm("Prosseguir para realização do pedido?")
    if (prosseguir === true) {
        const enviandoPedido = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", novoPedido);
        enviandoPedido.then(pedidoSucesso);
        enviandoPedido.catch(pedidoFalhou);
    }
}

function pedidoSucesso(response) {
    alert("Pedido enviado")
    promessa = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
    promessa.then(processarResposta);
}

function pedidoFalhou (erro) {
    alert("Ops, não conseguimos processar sua encomenda")
    const statusCode = erro.response.status;
	console.log(statusCode);
}