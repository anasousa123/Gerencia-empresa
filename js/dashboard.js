//==================================================
// SMART BURGUER ERP
// DASHBOARD
//==================================================

//==============================
// DADOS SIMULADOS
//==============================

const dashboard = {

    pedidosHoje: 38,

    faturamento: 4580.75,

    clientes: 184,

    produtos: 97

};

//==============================
// CARREGAR INDICADORES
//==============================

document.getElementById("pedidosHoje").textContent =
dashboard.pedidosHoje;

document.getElementById("faturamento").textContent =
dashboard.faturamento.toLocaleString("pt-BR",{
    style:"currency",
    currency:"BRL"
});

document.getElementById("clientesTotal").textContent =
dashboard.clientes;

document.getElementById("produtosTotal").textContent =
dashboard.produtos;

//==============================
// GRÁFICO DE VENDAS
//==============================

const vendas = document.getElementById("graficoVendas");

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
                850,
                1200,
                950,
                1800,
                2200,
                3100,
                2500
            ],

            fill:true,

            borderWidth:3,

            borderColor:"#ff9800",

            backgroundColor:"rgba(255,152,0,.15)",

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

//==============================
// GRÁFICO DE PRODUTOS
//==============================

const produtos = document.getElementById("graficoProdutos");

new Chart(produtos,{

    type:"doughnut",

    data:{

        labels:[
            "Hambúrguer",
            "Pizza",
            "Porções",
            "Bebidas",
            "Sobremesas"
        ],

        datasets:[{

            data:[
                42,
                21,
                17,
                12,
                8
            ],

            backgroundColor:[

                "#ff9800",

                "#ef4444",

                "#22c55e",

                "#3b82f6",

                "#8b5cf6"

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

//==============================
// ATUALIZAÇÃO AUTOMÁTICA
//==============================

setInterval(()=>{

    dashboard.pedidosHoje++;

    dashboard.faturamento += Math.random()*120;

    document.getElementById("pedidosHoje").textContent =
    dashboard.pedidosHoje;

    document.getElementById("faturamento").textContent =
    dashboard.faturamento.toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });

},15000);

//==============================
// DATA E HORA
//==============================

function atualizarHorario(){

    const agora = new Date();

    console.log(

        agora.toLocaleDateString("pt-BR"),

        agora.toLocaleTimeString("pt-BR")

    );

}

setInterval(atualizarHorario,1000);