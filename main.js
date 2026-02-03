// Calculadora V.1
// Se você está lendo o código da primeira versão da minha calcularoa,
// É um prazer, ela será atualizada ao longo do tempo. Obrigado pela atenção ;)

let expressao = "" // variavel de input da calculadora
const regex = /\d+(\.\d+)?|[+\-\/x]/g;
document.getElementById("resultado").innerText = "0" // Resultado aparece como 0 ao iniciar calculadora

window.addEventListener("keydown", function(event) { // Aqui é ativados todos eventos de teclado
    const tecla = event.key; // Pega o nome da tecla (ex: "1", "+", "Enter")

    if (/\d|[+\-x/.]/.test(tecla)) { // regex básico para se for numero ou um dos sinais
        adicionar(tecla); // a tecla é enviada para a const tecla
    }

    if (tecla === "Enter") { // Enter -> inicia função botaoResultado()
        botaoResultado();
    }

    if (tecla === "Backspace") { // Backspace -> inicia a função apagarUm()
        apagarUm();
    }

    if (tecla === "Delete") { // // Inicia a função limpar() -> C
        limpar();
    }
});

function adicionar(tecla) {
    let ultimoCaractere = expressao.slice(-1); // aqui é capturado o ultimo caractere dentro da expressao
    if (tecla === ".") { // se a tecla for == .
        if (expressao === "" || isNaN(ultimoCaractere)) { // Se o ultimo caractere não for numero e a expressao estiver vazia.
            expressao  = expressao + "0."; // expresssão vai receber 0.
            document.getElementById("visor").innerText = expressao; // mostra o qu etemn no visor
            return; 
        }

        let partes = expressao.split(/[+\-x/]/); // regex -> partes
        let numeroAtual = partes[partes.length - 1]; // numero atual -> tamanho da lista - 1 para acompanhar o indice que sempre -1, se o tamanho é 1 o indice é 0
        if (numeroAtual.includes(".")) return; // se no indice atual tiver . então return para não ter dois pontos ..
    }

    if (isNaN(ultimoCaractere) && isNaN(tecla)) { // se o indice atual já ser um sinal, então apagará
        expressao = expressao.slice(0, -1);
    }

    expressao = expressao + tecla;
    document.getElementById("visor").innerText = expressao;
    visor.scrollLeft = visor.scrollWidth; // joga o scroll para direita caso o conteúdo seja muito grande
}

function botaoResultado() {
    let tokens = expressao.match(regex) // começa a criar os tokens

    if (!tokens) return;

    let numeroAtual = tokens[tokens.length - 1];
    if (/[/+\-x]/.test(numeroAtual)) return;

    if (tokens[0] === "-") {
        tokens.splice(0, 2, "-" + tokens[1]); // removendo o sinal que ficou antes no indice 0
    }

    if (tokens[0] === "/" || tokens[0] === "x" || tokens[0] === "+") {
        tokens.unshift("0"); // para que seja feita a conta com o zero, ja que nao tem numeros antes do sinal
    } 

    for (let i = 0; i < tokens.length; i++) { // começa um looping onde irá varrer a lista completa criando um indice que contará até ser maior que o numero da lista.
        if (isNaN(tokens[i])) { // Se não for numero, no caso seja sinal...
            if (tokens[i] === "/" || tokens[i] === "x") { // se for / ou *
                let sucessor = Number(tokens[i + 1]); // criando numero sucessor do indice atual sucessor
                let antecessor = Number(tokens[i - 1]); // criando numero antecessor do indice atual 

                if(tokens[i] == "x") { // Se for multiplicação 
                    resultado = antecessor * sucessor; // antecessor * sucessor
                } else {
                    resultado = antecessor / sucessor; // antecessor / sucessor 
                }

                tokens.splice(i - 1, 3, resultado.toString()); // substitui o antecessor, o sinal atual utilizado e o sucessor. 

                i--; // Volta um indice para corrigir a posição do laço, assim verfiicando se não tem nenhum outro operador de sinal forte ( / e * ) 
            }
        }
    }

    // A lógica irá se repetir

    for (let i = 0; i < tokens.length;  i++) {
        if (isNaN(tokens[i])) {
            if (tokens[i] === "+" || tokens[i] === "-") {
                let sucessor = Number(tokens[i + 1]);
                let antecessor = Number(tokens[i - 1]);

                if(tokens[i] == "+") {
                    resultado = antecessor + sucessor; // antecessor / sucessor
                } else {
                    resultado = antecessor - sucessor;
                }

                tokens.splice(i - 1, 3, resultado.toString());
                i--;
            }
        }
    }

    let resultadoFormatado = resultado.toFixed(2);
    if (Number.isInteger(resultado)) {
        document.getElementById("visor").innerText = resultado;
        document.getElementById("resultado").innerText = resultado;
        expressao = resultado.toString();
    } else {
        document.getElementById("visor").innerText = resultadoFormatado;
        document.getElementById("resultado").innerText = resultadoFormatado;
        expressao = resultadoFormatado.toString()
    }
    visor.scrollLeft = visor.scrollWidth; // joga o scroll para direita caso o conteúdo seja muito grande
}

function apagarUm() {
    expressao = expressao.slice(0, -1)
    document.getElementById("visor").innerText = expressao;

    if (expressao === "") {
        document.getElementById("resultado").innerText = "0"; // caso o visor estiver vazio
    }
}

function limpar() {
    expressao = ""; // expressão não tera mais strings 
    resultado = 0;  // resultado fica em branco
    document.getElementById("visor").innerText = ""; 
    document.getElementById("resultado").innerText = ""; 
}

// FIM ;) aceito sugestôes