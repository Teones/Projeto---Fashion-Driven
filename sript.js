// let nome = prompt("Qual o seu nome?")

const promessa = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
promessa.then(processarResposta);

function processarResposta(resposta) {
    let pedido = document.querySelectorAll(".pedido")
    
    for (i = 0; i < 10; i++) {
        pedido[i].innerHTML = `
        <img class="pedidoPronto" src="${resposta.data[i]["image"]}">
        <b>Criador:</b> ${resposta.data[i]["owner"]}`
    }
}



let contadorItems = 0

function escolhaModelo(tipo) {
    let selecionado = document.querySelector(".modelo .selecionado")

    if (selecionado !== null) {
        selecionado.classList.remove("selecionado")
    } else {
        contadorItems += 1
    }

    tipo.classList.add("selecionado")
    verificarPedido()
}
function escolhaGola(tipo) {
    const selecionado = document.querySelector(".gola .selecionado")

    if (selecionado !== null) {
        selecionado.classList.remove("selecionado")
    } else {
        contadorItems += 1
    }

    tipo.classList.add("selecionado")
    verificarPedido()
}
function escolhaTecido(tipo) {
    const selecionado = document.querySelector(".tecido .selecionado")

    if (selecionado !== null) {
        selecionado.classList.remove("selecionado")
    } else {
        contadorItems += 1
    }

    tipo.classList.add("selecionado")
    verificarPedido()
}


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
         contadorItems += 1
    }
    console.log(contadorItems)
}

function verificarPedido() {
    checkLink()
    if (contadorItems >= 4) {
        const botao = document.querySelector(".confimarPedido");
        botao.classList.add("ativo");
    }
}

function enviarPedido() {
    let input = document.querySelector("input")
    let valor = input.value
    let pedido = {
        "model": "t-shirt",
        "neck": "v-neck",
        "material": "silk",
        "image": valor,
        "owner": nome,
        "author": nome
    }

    let enviandoPedido = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", pedido);
    enviandoPedido.then(pedidoSucesso);
    enviandoPedido.catch(pedidoFalhou);
}
function pedidoRepetido(pedido) {
    console.log(pedido)
}

function pedidoSucesso(response) {
    alert("Pedido enviado")
}

function pedidoFalhou (erro) {
    alert("Ops, não conseguimos processar sua encomenda")
}