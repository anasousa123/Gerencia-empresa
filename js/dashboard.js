//==================================================
// NEXUS ERP
// DASHBOARD
//==================================================

//------------------------------
// VERIFICAR LOGIN
//------------------------------

const usuario = localStorage.getItem("usuarioLogado");

if (!usuario) {
    window.location.href = "../index.html";
}

//------------------------------
// GRÁFICO DE VENDAS
//------------------------------

const ctx = document.getElementById("graficoVendas");

if (ctx) {

    new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago",
                "Set",
                "Out",
                "Nov",
                "Dez"
            ],

            datasets: [{

                label: "Vendas",

                data: [
                    12000,
                    18000,
                    15000,
                    25000,
                    28000,
                    32000,
                    35000,
                    38000,
                    42000,
                    46000,
                    50000,
                    52800
                ],

                borderColor: "#2563EB",

                backgroundColor: "rgba(37,99,235,.15)",

                borderWidth: 4,

                fill: true,

                tension: .4

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: true

                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}

//------------------------------
// ANIMAÇÃO DOS CARDS
//------------------------------

function animarNumero(elemento, valorFinal){

    let atual = 0;

    const incremento = Math.ceil(valorFinal / 100);

    const intervalo = setInterval(() => {

        atual += incremento;

        if(atual >= valorFinal){

            atual = valorFinal;

            clearInterval(intervalo);

        }

        elemento.innerText = atual.toLocaleString("pt-BR");

    },20);

}

const cards = document.querySelectorAll(".card h2");

if(cards.length >= 4){

    animarNumero(cards[0],52800);

    animarNumero(cards[1],348);

    animarNumero(cards[2],1240);

    animarNumero(cards[3],620);

}

//------------------------------
// BOAS-VINDAS
//------------------------------

console.log("Bem-vindo ao Nexus ERP!");

console.log("Usuário:", usuario);

//------------------------------
// DATA ATUAL
//------------------------------

const hoje = new Date();

console.log(

    hoje.toLocaleDateString("pt-BR"),

    hoje.toLocaleTimeString("pt-BR")

);

//------------------------------
// EFEITO NOS CARDS
//------------------------------

const listaCards = document.querySelectorAll(".card");

listaCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

//------------------------------
// NOTIFICAÇÃO DE DEMONSTRAÇÃO
//------------------------------

setTimeout(() => {

    console.log("Você possui novas notificações.");

},3000);
//==============================
// DASHBOARD
//==============================

const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

document.getElementById("totalProdutos").innerHTML = produtos.length;

const categorias = [...new Set(produtos.map(p => p.categoria))];

document.getElementById("totalCategorias").innerHTML = categorias.length;

//------------------------------
// PREPARAÇÃO FIREBASE
//------------------------------

// Futuramente iremos buscar:
//
// Produtos
// Clientes
// Vendas
// Financeiro
// Estoque
//
// diretamente do Firestore.

//==================================================
// FIM
//==================================================