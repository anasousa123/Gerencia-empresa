// ================================
// NEXUS ERP - DASHBOARD
// ================================

// Cards
document.getElementById("vendasHoje").textContent = "R$ 2.580,00";
document.getElementById("faturamento").textContent = "R$ 38.750,00";
document.getElementById("lucro").textContent = "R$ 14.920,00";
document.getElementById("estoqueBaixo").textContent = "7";

// ================================
// GRÁFICO DE VENDAS
// ================================

new Chart(document.getElementById("graficoVendas"),{

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

            label:"Faturamento",

            data:[
                8500,
                9200,
                11000,
                9800,
                13500,
                15000,
                18750
            ],

            borderColor:"#4f8cff",

            backgroundColor:"rgba(79,140,255,.15)",

            fill:true,

            tension:.4

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

// ================================
// PRODUTOS MAIS VENDIDOS
// ================================

new Chart(document.getElementById("graficoProdutos"),{

    type:"doughnut",

    data:{

        labels:[
            "Hambúrguer",
            "Pizza",
            "Refrigerante",
            "Açaí"
        ],

        datasets:[{

            data:[
                42,
                30,
                18,
                10
            ]

        }]

    },

    options:{

        responsive:true

    }

});

// ================================
// ÚLTIMAS VENDAS
// ================================

const vendas=[

{
cliente:"João",
produto:"Pizza Grande",
valor:"R$ 79,90"
},

{
cliente:"Maria",
produto:"Hambúrguer Artesanal",
valor:"R$ 42,00"
},

{
cliente:"Carlos",
produto:"Combo Família",
valor:"R$ 129,90"
},

{
cliente:"Ana",
produto:"Açaí 700ml",
valor:"R$ 28,00"
}

];

const tabela=document.getElementById("ultimasVendas");

vendas.forEach(venda=>{

    tabela.innerHTML +=`

        <tr>

            <td>${venda.cliente}</td>

            <td>${venda.produto}</td>

            <td>${venda.valor}</td>

        </tr>

    `;

});

// ================================
// ESTOQUE BAIXO
// ================================

const estoque=[

{
produto:"Coca-Cola 2L",
quantidade:3
},

{
produto:"Batata Palito",
quantidade:5
},

{
produto:"Queijo Mussarela",
quantidade:2
},

{
produto:"Bacon",
quantidade:4
}

];

const tabelaEstoque=document.getElementById("estoqueTabela");

estoque.forEach(item=>{

    tabelaEstoque.innerHTML +=`

        <tr>

            <td>${item.produto}</td>

            <td>${item.quantidade}</td>

        </tr>

    `;

});