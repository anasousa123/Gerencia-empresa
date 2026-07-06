// ======================================
// SMART BURGUER ERP
// Dashboard
// ======================================

// Data atual
function atualizarData() {

    const data = new Date();

    const opcoes = {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    };

    const elemento = document.getElementById("dataAtual");

    if (elemento) {
        elemento.innerHTML = data.toLocaleDateString("pt-BR", opcoes);
    }

}

atualizarData();


// ======================================
// Gráfico de vendas
// ======================================

const vendas = document.getElementById("graficoVendas");

if(vendas){

new Chart(vendas,{

type:"line",

data:{

labels:[
"Seg",
"Ter",
"Qua",
"Qui",
"Sex",
"Sáb",
"Dom"
],

datasets:[{

label:"Vendas",

data:[
1500,
2200,
1800,
2600,
3100,
4200,
3900
],

borderColor:"#6D4C41",

backgroundColor:"rgba(109,76,65,.15)",

fill:true,

tension:.4

}]

},

options:{

responsive:true,

plugins:{

legend:{
display:false
}

}

}

});

}



// ======================================
// Produtos mais vendidos
// ======================================

const produtos = document.getElementById("graficoProdutos");

if(produtos){

new Chart(produtos,{

type:"doughnut",

data:{

labels:[
"X-Bacon",
"Smash",
"X-Salada",
"Batata",
"Refrigerante"
],

datasets:[{

data:[
42,
25,
18,
10,
5
],

backgroundColor:[

"#6D4C41",
"#8D6E63",
"#A1887F",
"#D7CCC8",
"#5D4037"

]

}]

},

options:{

responsive:true,

plugins:{

legend:{
position:"bottom"
}

}

}

});

}