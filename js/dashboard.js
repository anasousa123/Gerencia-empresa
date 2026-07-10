//==================================================
// SMART BURGUER ERP
// DASHBOARD.JS
//==================================================

//==========================================
// DADOS DO DASHBOARD
//==========================================

const dashboard = {

    pedidosHoje: 28,

    faturamento: 2840.90,

    clientes: 125,

    produtos: 94

};

//==========================================
// ELEMENTOS
//==========================================

const pedidosHoje = document.getElementById("pedidosHoje");

const faturamentoDia = document.getElementById("faturamentoDia");

const clientesTotal = document.getElementById("clientesTotal");

const produtosTotal = document.getElementById("produtosTotal");

//==========================================
// ATUALIZAR CARDS
//==========================================

function atualizarCards(){

    if(pedidosHoje){

        pedidosHoje.textContent = dashboard.pedidosHoje;

    }

    if(faturamentoDia){

        faturamentoDia.textContent =
        dashboard.faturamento.toLocaleString("pt-BR",{

            style:"currency",

            currency:"BRL"

        });

    }

    if(clientesTotal){

        clientesTotal.textContent = dashboard.clientes;

    }

    if(produtosTotal){

        produtosTotal.textContent = dashboard.produtos;

    }

}

//==========================================
// GRÁFICO DE VENDAS
//==========================================

const graficoVendas = document.getElementById("graficoVendas");

if(graficoVendas){

new Chart(graficoVendas,{

type:"line",

data:{

labels:[
"Jan",
"Fev",
"Mar",
"Abr",
"Mai",
"Jun",
"Jul"
],

datasets:[{

label:"Vendas",

data:[
1500,
2200,
1900,
3100,
4200,
3600,
5100
],

borderWidth:3,

tension:.4,

fill:true,

backgroundColor:"rgba(255,152,0,.15)",

borderColor:"#ff9800"

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:true

}

}

}

});

}

//==========================================
// GRÁFICO CATEGORIAS
//==========================================

const graficoCategorias = document.getElementById("graficoCategorias");

if(graficoCategorias){

new Chart(graficoCategorias,{

type:"doughnut",

data:{

labels:[

"Hambúrguer",

"Bebidas",

"Porções",

"Combos"

],

datasets:[{

data:[45,20,15,20]

}]

},

options:{

responsive:true

}

});

}

//==========================================
// INICIAR
//==========================================

window.onload=()=>{

atualizarCards();

};
//==================================================
// SMART BURGUER ERP
// DASHBOARD.JS - PARTE 2
//==================================================

//==========================================
// RELÓGIO
//==========================================

function atualizarRelogio(){

    const data = new Date();

    const hora = data.toLocaleTimeString("pt-BR");

    const elemento = document.getElementById("horaAtual");

    if(elemento){

        elemento.textContent = hora;

    }

}

setInterval(atualizarRelogio,1000);

//==========================================
// CONTADORES ANIMADOS
//==========================================

function animarNumero(elemento, destino){

    if(!elemento) return;

    let atual = 0;

    const incremento = Math.ceil(destino / 80);

    const intervalo = setInterval(()=>{

        atual += incremento;

        if(atual >= destino){

            atual = destino;

            clearInterval(intervalo);

        }

        elemento.textContent = atual;

    },20);

}

//==========================================
// ATUALIZAÇÃO DOS CARDS
//==========================================

window.addEventListener("load",()=>{

    animarNumero(pedidosHoje,dashboard.pedidosHoje);

    animarNumero(clientesTotal,dashboard.clientes);

    animarNumero(produtosTotal,dashboard.produtos);

});

//==========================================
// ATUALIZAÇÃO AUTOMÁTICA
//==========================================

function atualizarDashboard(){

    dashboard.pedidosHoje += Math.floor(Math.random()*2);

    dashboard.faturamento += Math.random()*80;

    atualizarCards();

}

setInterval(atualizarDashboard,30000);

//==========================================
// ESTOQUE BAIXO
//==========================================

const estoqueBaixo=[

    {
        nome:"Pão Brioche",
        quantidade:8
    },

    {
        nome:"Cheddar",
        quantidade:6
    },

    {
        nome:"Hambúrguer Bovino",
        quantidade:9
    }

];

function verificarEstoque(){

    estoqueBaixo.forEach(produto=>{

        if(produto.quantidade<=10){

            console.log(

                "⚠ Estoque baixo:",

                produto.nome

            );

        }

    });

}

verificarEstoque();

//==========================================
// ÚLTIMOS PEDIDOS
//==========================================

const pedidosRecentes=[

    {
        numero:1,
        cliente:"João",
        total:79.90
    },

    {
        numero:2,
        cliente:"Maria",
        total:45.00
    },

    {
        numero:3,
        cliente:"Carlos",
        total:129.50
    }

];

console.table(pedidosRecentes);

//==========================================
// MENSAGEM
//==========================================

console.log("Dashboard carregado com sucesso!");