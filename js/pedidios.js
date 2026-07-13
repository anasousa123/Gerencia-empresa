//==================================================
// NEXUS ERP
// MÓDULO PEDIDOS
//==================================================

//==============================
// ELEMENTOS
//==============================

const modal = document.getElementById("modalPedido");
const btnPedido = document.getElementById("btnPedido");
const fecharModal = document.getElementById("fecharModal");
const cancelar = document.querySelector(".cancelar");
const form = document.getElementById("formPedido");

const listaPedidos = document.getElementById("listaPedidos");
const pesquisar = document.getElementById("pesquisar");

//==============================
// CAMPOS
//==============================

const cliente = document.getElementById("cliente");
const telefone = document.getElementById("telefone");
const produto = document.getElementById("produto");
const quantidade = document.getElementById("quantidade");
const pagamento = document.getElementById("pagamento");
const status = document.getElementById("status");
const observacoes = document.getElementById("observacoes");

//==============================
// DADOS
//==============================

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

//==============================
// CARREGAR PRODUTOS
//==============================

function carregarProdutos() {

    produto.innerHTML =
        '<option value="">Selecione um produto</option>';

    produtos.forEach(item => {

        if(Number(item.estoque) > 0){

            produto.innerHTML += `

            <option value="${item.id}">

                ${item.nome} - R$ ${Number(item.venda).toFixed(2)}

            </option>

            `;

        }

    });

}

carregarProdutos();

//==============================
// MODAL
//==============================

btnPedido.addEventListener("click", ()=>{

    carregarProdutos();

    modal.classList.add("ativo");

});

function fechar(){

    modal.classList.remove("ativo");

    form.reset();

}

fecharModal.addEventListener("click",fechar);

cancelar.addEventListener("click",fechar);

//==============================
// SALVAR PEDIDO
//==============================

form.addEventListener("submit",function(e){

    e.preventDefault();

    const item = produtos.find(p=>p.id==produto.value);

    if(!item){

        alert("Selecione um produto.");

        return;

    }

    const qtd = Number(quantidade.value);

    if(qtd > item.estoque){

        alert("Estoque insuficiente!");

        return;

    }

    const total = qtd * Number(item.venda);

    const pedido = {

        id:Date.now(),

        data:new Date().toLocaleString("pt-BR"),

        cliente:cliente.value,

        telefone:telefone.value,

        produto:item.nome,

        quantidade:qtd,

        pagamento:pagamento.value,

        status:status.value,

        observacoes:observacoes.value,

        total:total

    };

    pedidos.push(pedido);

    item.estoque -= qtd;

    salvar();

    atualizarTabela();

    atualizarCards();

    fechar();

});
//==================================================
// SALVAR LOCALSTORAGE
//==================================================

function salvar() {

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    localStorage.setItem("produtos", JSON.stringify(produtos));

}

//==================================================
// TABELA
//==================================================

function atualizarTabela(lista = pedidos){

    listaPedidos.innerHTML = "";

    if(lista.length === 0){

        listaPedidos.innerHTML = `

        <tr>

            <td colspan="7" style="text-align:center;padding:30px;">

                Nenhum pedido cadastrado.

            </td>

        </tr>

        `;

        return;

    }

    lista.forEach(pedido=>{

        let classe = "";

        switch(pedido.status){

            case "Em preparo":
                classe="preparo";
                break;

            case "Saiu para entrega":
                classe="entrega";
                break;

            case "Finalizado":
                classe="finalizado";
                break;

            case "Cancelado":
                classe="cancelado";
                break;

        }

        listaPedidos.innerHTML += `

        <tr>

            <td>#${pedido.id}</td>

            <td>${pedido.cliente}</td>

            <td>${pedido.telefone}</td>

            <td>R$ ${pedido.total.toFixed(2)}</td>

            <td>${pedido.pagamento}</td>

            <td>

                <span class="status ${classe}">

                    ${pedido.status}

                </span>

            </td>

            <td>

                <button
                    class="btn-excluir"
                    onclick="excluirPedido(${pedido.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

//==================================================
// EXCLUIR
//==================================================

function excluirPedido(id){

    if(confirm("Deseja excluir este pedido?")){

        pedidos = pedidos.filter(p=>p.id!==id);

        salvar();

        atualizarTabela();

        atualizarCards();

    }

}

//==================================================
// PESQUISA
//==================================================

pesquisar.addEventListener("keyup",()=>{

    const texto = pesquisar.value.toLowerCase();

    const resultado = pedidos.filter(p=>

        p.cliente.toLowerCase().includes(texto) ||

        p.produto.toLowerCase().includes(texto)

    );

    atualizarTabela(resultado);

});

//==================================================
// CARDS
//==================================================

function atualizarCards(){

    document.getElementById("pedidosHoje").innerHTML =
        pedidos.length;

    document.getElementById("preparo").innerHTML =
        pedidos.filter(p=>p.status==="Em preparo").length;

    document.getElementById("entrega").innerHTML =
        pedidos.filter(p=>p.status==="Saiu para entrega").length;

    const faturamento = pedidos
        .filter(p=>p.status==="Finalizado")
        .reduce((total,p)=> total + p.total,0);

    document.getElementById("faturamento").innerHTML =
        "R$ " + faturamento.toFixed(2);

}

//==================================================
// INICIAR
//==================================================

atualizarTabela();

atualizarCards();

console.log("Módulo Pedidos carregado com sucesso.");