//==================================================
// SMART BURGUER ERP
// MÓDULO FINANCEIRO
//==================================================

//==========================================
// ELEMENTOS
//==========================================

const modal = document.getElementById("modalFinanceiro");

const btnNova = document.getElementById("novaMovimentacao");

const fecharModal = document.querySelector(".fechar-modal");

const cancelar = document.querySelector(".cancelar");

const form = document.getElementById("formFinanceiro");

const tabela = document.getElementById("tabelaFinanceiro");

const pesquisa = document.getElementById("pesquisaFinanceiro");

const filtroTipo = document.getElementById("filtroTipo");

const filtroData = document.getElementById("filtroData");


//==========================================
// CARDS
//==========================================

const totalReceitas = document.getElementById("totalReceitas");

const totalDespesas = document.getElementById("totalDespesas");

const lucroLiquido = document.getElementById("lucroLiquido");

const saldoCaixa = document.getElementById("saldoCaixa");


//==========================================
// LOCAL STORAGE
//==========================================

let financeiro = JSON.parse(

    localStorage.getItem("financeiro")

) || [];



//==========================================
// ABRIR MODAL
//==========================================

btnNova.addEventListener("click",()=>{

    modal.style.display="flex";

    document.getElementById("data").value=

    new Date().toISOString().split("T")[0];

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
// CADASTRAR MOVIMENTAÇÃO
//==================================================

form.addEventListener("submit", function(e){

    e.preventDefault();

    const movimentacao = {

        id: Date.now(),

        descricao: document.getElementById("descricao").value,

        categoria: document.getElementById("categoria").value,

        tipo: document.getElementById("tipo").value,

        pagamento: document.getElementById("pagamento").value,

        valor: Number(document.getElementById("valor").value),

        data: document.getElementById("data").value,

        status: document.getElementById("status").value,

        observacoes: document.getElementById("observacoes").value

    };

    financeiro.push(movimentacao);

    salvarFinanceiro();

    renderizarTabela();

    atualizarCards();

    fechar();

    mostrarMensagem("Movimentação salva com sucesso!");

});



//==================================================
// SALVAR LOCAL STORAGE
//==================================================

function salvarFinanceiro(){

    localStorage.setItem(

        "financeiro",

        JSON.stringify(financeiro)

    );

}



//==================================================
// MENSAGEM (TOAST)
//==================================================

function mostrarMensagem(texto){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `

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

    if(financeiro.length === 0){

        tabela.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;padding:30px;">
                    Nenhuma movimentação cadastrada.
                </td>
            </tr>
        `;

        return;

    }

    financeiro.forEach(item=>{

        const tipoClasse =
            item.tipo === "Receita"
            ? "sucesso"
            : "perigo";

        const statusClasse =
            item.status === "Pago"
            ? "sucesso"
            : "alerta";

        tabela.innerHTML += `

        <tr>

            <td>${item.descricao}</td>

            <td>${item.categoria}</td>

            <td>

                <span class="badge ${tipoClasse}">

                    ${item.tipo}

                </span>

            </td>

            <td>${item.pagamento}</td>

            <td>

                R$ ${item.valor.toFixed(2)}

            </td>

            <td>

                ${formatarData(item.data)}

            </td>

            <td>

                <span class="badge ${statusClasse}">

                    ${item.status}

                </span>

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

    return new Date(data).toLocaleDateString("pt-BR");

}



//==================================================
// ATUALIZAR CARDS
//==================================================

function atualizarCards(){

    let receitas = 0;

    let despesas = 0;

    financeiro.forEach(item=>{

        if(item.tipo==="Receita"){

            receitas += item.valor;

        }

        else{

            despesas += item.valor;

        }

    });

    const lucro = receitas - despesas;

    totalReceitas.textContent =
        "R$ " + receitas.toFixed(2);

    totalDespesas.textContent =
        "R$ " + despesas.toFixed(2);

    lucroLiquido.textContent =
        "R$ " + lucro.toFixed(2);

    saldoCaixa.textContent =
        "R$ " + lucro.toFixed(2);

}



//==================================================
// CARREGAR SISTEMA
//==================================================

renderizarTabela();

atualizarCards();
//==================================================
// PESQUISA EM TEMPO REAL
//==================================================

pesquisa.addEventListener("keyup", ()=>{

    const texto = pesquisa.value.toLowerCase();

    const linhas = tabela.querySelectorAll("tr");

    linhas.forEach(linha=>{

        const descricao = linha.cells[0]?.innerText.toLowerCase() || "";

        linha.style.display = descricao.includes(texto)
            ? ""
            : "none";

    });

});



//==================================================
// FILTRO POR TIPO
//==================================================

filtroTipo.addEventListener("change", ()=>{

    const tipo = filtroTipo.value;

    const linhas = tabela.querySelectorAll("tr");

    linhas.forEach(linha=>{

        const tipoLinha = linha.cells[2]?.innerText.trim() || "";

        if(tipo==="Todos"){

            linha.style.display="";

        }else{

            linha.style.display =

            tipoLinha.includes(tipo)

            ? ""

            : "none";

        }

    });

});



//==================================================
// FILTRO POR DATA
//==================================================

filtroData.addEventListener("change",()=>{

    if(filtroData.value===""){

        renderizarTabela();

        return;

    }

    const dataSelecionada = new Date(filtroData.value)
        .toLocaleDateString("pt-BR");

    const linhas = tabela.querySelectorAll("tr");

    linhas.forEach(linha=>{

        const dataLinha = linha.cells[5]?.innerText || "";

        linha.style.display =

        dataLinha===dataSelecionada

        ? ""

        : "none";

    });

});



//==================================================
// EXCLUIR
//==================================================

function excluirMovimentacao(id){

    if(!confirm("Deseja excluir esta movimentação?")){

        return;

    }

    financeiro = financeiro.filter(item=>item.id!==id);

    salvarFinanceiro();

    renderizarTabela();

    atualizarCards();

    atualizarDashboard();

    mostrarMensagem("Movimentação excluída!");

}



//==================================================
// EDITAR
//==================================================

function editarMovimentacao(id){

    const item = financeiro.find(m=>m.id===id);

    if(!item) return;

    document.getElementById("descricao").value = item.descricao;

    document.getElementById("categoria").value = item.categoria;

    document.getElementById("tipo").value = item.tipo;

    document.getElementById("pagamento").value = item.pagamento;

    document.getElementById("valor").value = item.valor;

    document.getElementById("data").value = item.data;

    document.getElementById("status").value = item.status;

    document.getElementById("observacoes").value = item.observacoes;

    financeiro = financeiro.filter(m=>m.id!==id);

    salvarFinanceiro();

    renderizarTabela();

    atualizarCards();

    modal.style.display="flex";

}



//==================================================
// DASHBOARD
//==================================================

function atualizarDashboard(){

    const receitas = financeiro
        .filter(item=>item.tipo==="Receita")
        .reduce((total,item)=>total+item.valor,0);

    const despesas = financeiro
        .filter(item=>item.tipo==="Despesa")
        .reduce((total,item)=>total+item.valor,0);

    localStorage.setItem("receitas", receitas);

    localStorage.setItem("despesas", despesas);

    localStorage.setItem("lucro", receitas-despesas);

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

            linha.style.transform="translateY(0)";

        },index*70);

    });

});