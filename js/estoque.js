//==================================================
// SMART BURGUER ERP
// MÓDULO ESTOQUE
//==================================================


//==========================================
// ELEMENTOS
//==========================================

const modal = document.getElementById("modalEstoque");

const btnNovo = document.getElementById("novoProduto");

const fecharModal = document.querySelector(".fechar-modal");

const cancelar = document.querySelector(".cancelar");

const form = document.getElementById("formEstoque");

const tabela = document.getElementById("tabelaEstoque");

const pesquisa = document.getElementById("pesquisaProduto");

const filtroCategoria = document.getElementById("categoria");


//==========================================
// DASHBOARD
//==========================================

const totalProdutos = document.getElementById("totalProdutos");

const estoqueBaixo = document.getElementById("estoqueBaixo");

const produtosEsgotados = document.getElementById("produtosEsgotados");

const valorEstoque = document.getElementById("valorEstoque");


//==========================================
// LOCAL STORAGE
//==========================================

let estoque = JSON.parse(

    localStorage.getItem("estoque")

) || [];



//==========================================
// ABRIR MODAL
//==========================================

btnNovo.addEventListener("click",()=>{

    modal.style.display="flex";



    document.getElementById("dataMovimentacao").value =

    new Date().toISOString().slice(0,16);

});



//==========================================
// FECHAR MODAL
//==========================================

function fechar(){

    modal.style.display="none";

    form.reset();

}

fecharModal.addEventListener("click",fechar);

cancelar.addEventListener("click",fechar);

window.addEventListener("click",(e)=>{

    if(e.target===modal){

        fechar();

    }

});
//==================================================
// REGISTRAR MOVIMENTAÇÃO
//==================================================

form.addEventListener("submit", function(e){

    e.preventDefault();

    const movimentacao = {

        id: Date.now(),

        produto: document.getElementById("produto").value,

        categoria: obterCategoria(document.getElementById("produto").value),

        tipo: document.getElementById("tipoMovimentacao").value,

        quantidade: Number(document.getElementById("quantidade").value),

        custo: Number(document.getElementById("custo").value),

        motivo: document.getElementById("motivo").value,

        responsavel: document.getElementById("responsavel").value,

        data: document.getElementById("dataMovimentacao").value

    };

    estoque.push(movimentacao);

    salvarEstoque();

    renderizarTabela();

    atualizarIndicadores();

    fechar();

    mostrarMensagem("Movimentação registrada com sucesso!");

});


//==================================================
// SALVAR LOCAL STORAGE
//==================================================

function salvarEstoque(){

    localStorage.setItem(

        "estoque",

        JSON.stringify(estoque)

    );

}



//==================================================
// DESCOBRIR CATEGORIA
//==================================================

function obterCategoria(produto){

    if(produto.includes("Coca")){

        return "Bebida";

    }

    if(produto.includes("Batata")){

        return "Porção";

    }

    if(produto.includes("Combo")){

        return "Combo";

    }

    return "Hambúrguer";

}



//==================================================
// MENSAGEM
//==================================================

function mostrarMensagem(texto){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerHTML=`

        <i class="fa-solid fa-circle-check"></i>

        ${texto}

    `;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("mostrar");

    },100);

    setTimeout(()=>{

        toast.classList.remove("mostrar");

    },2800);

    setTimeout(()=>{

        toast.remove();

    },3200);

}
//==================================================
// RENDERIZAR TABELA
//==================================================

function renderizarTabela(){

    tabela.innerHTML = "";

    if(estoque.length === 0){

        tabela.innerHTML = `

        <tr>

            <td colspan="8" style="text-align:center;padding:30px;">

                Nenhuma movimentação cadastrada.

            </td>

        </tr>

        `;

        return;

    }

    estoque.forEach(item=>{

        let status = "Normal";
        let classe = "sucesso";

        if(item.quantidade <= 10){

            status = "Baixo";
            classe = "alerta";

        }

        if(item.quantidade <= 0){

            status = "Esgotado";
            classe = "perigo";

        }

        tabela.innerHTML += `

        <tr>

            <td>${item.produto}</td>

            <td>${item.categoria}</td>

            <td>${item.quantidade}</td>

            <td>10</td>

            <td>R$ ${item.custo.toFixed(2)}</td>

            <td>

                <span class="badge ${classe}">

                    ${status}

                </span>

            </td>

            <td>

                ${formatarData(item.data)}

            </td>

            <td>

                <button
                class="btn-editar"
                onclick="editarMovimentacao(${item.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                class="btn-excluir"
                onclick="excluirMovimentacao(${item.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}



//==================================================
// FORMATAR DATA
//==================================================

function formatarData(data){

    if(!data) return "-";

    return new Date(data).toLocaleString("pt-BR");

}



//==================================================
// ATUALIZAR INDICADORES
//==================================================

function atualizarIndicadores(){

    totalProdutos.textContent = estoque.length;

    const baixo = estoque.filter(item=>item.quantidade<=10);

    estoqueBaixo.textContent = baixo.length;

    const esgotados = estoque.filter(item=>item.quantidade<=0);

    produtosEsgotados.textContent = esgotados.length;

    let total = 0;

    estoque.forEach(item=>{

        total += item.quantidade * item.custo;

    });

    valorEstoque.textContent =

    "R$ " + total.toFixed(2);

}



//==================================================
// CARREGAR SISTEMA
//==================================================

renderizarTabela();

atualizarIndicadores();
//==================================================
// PESQUISA
//==================================================

pesquisa.addEventListener("keyup",()=>{

    const texto = pesquisa.value.toLowerCase();

    const linhas = tabela.querySelectorAll("tr");

    linhas.forEach(linha=>{

        const produto = linha.cells[0]?.innerText.toLowerCase() || "";

        linha.style.display = produto.includes(texto)
            ? ""
            : "none";

    });

});



//==================================================
// FILTRO POR CATEGORIA
//==================================================

filtroCategoria.addEventListener("change",()=>{

    const categoria = filtroCategoria.value;

    const linhas = tabela.querySelectorAll("tr");

    linhas.forEach(linha=>{

        const categoriaLinha = linha.cells[1]?.innerText || "";

        if(categoria==="Todos"){

            linha.style.display="";

        }

        else{

            linha.style.display =
            categoriaLinha===categoria ? "" : "none";

        }

    });

});



//==================================================
// EXCLUIR
//==================================================

function excluirMovimentacao(id){

    if(!confirm("Deseja excluir esta movimentação?")){

        return;

    }

    estoque = estoque.filter(item=>item.id!==id);

    salvarEstoque();

    renderizarTabela();

    atualizarIndicadores();

    mostrarMensagem("Movimentação excluída!");

}



//==================================================
// EDITAR
//==================================================

function editarMovimentacao(id){

    const item = estoque.find(p=>p.id===id);

    if(!item) return;

    document.getElementById("produto").value = item.produto;

    document.getElementById("tipoMovimentacao").value = item.tipo;

    document.getElementById("quantidade").value = item.quantidade;

    document.getElementById("custo").value = item.custo;

    document.getElementById("motivo").value = item.motivo;

    document.getElementById("responsavel").value = item.responsavel;

    document.getElementById("dataMovimentacao").value = item.data;

    estoque = estoque.filter(p=>p.id!==id);

    salvarEstoque();

    renderizarTabela();

    atualizarIndicadores();

    modal.style.display="flex";

}



//==================================================
// ATUALIZAR DASHBOARD
//==================================================

function atualizarDashboard(){

    localStorage.setItem(

        "totalProdutos",

        estoque.length

    );

}

atualizarDashboard();



//==================================================
// ANIMAÇÕES
//==================================================

window.addEventListener("load",()=>{

    const linhas = tabela.querySelectorAll("tr");

    linhas.forEach((linha,index)=>{

        linha.style.opacity="0";

        linha.style.transform="translateY(20px)";

        setTimeout(()=>{

            linha.style.transition=".4s";

            linha.style.opacity="1";

            linha.style.transform="translateY(0px)";

        },index*80);

    });

});