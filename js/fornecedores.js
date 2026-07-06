//==================================================
// SMART BURGUER ERP
// MÓDULO FORNECEDORES
//==================================================


//==========================================
// ELEMENTOS
//==========================================

const modal = document.getElementById("modalFornecedor");

const btnNovo = document.getElementById("novoFornecedor");

const fecharModal = document.querySelector(".fechar-modal");

const cancelar = document.querySelector(".cancelar");

const form = document.getElementById("formFornecedor");

const tabela = document.getElementById("tabelaFornecedores");

const pesquisa = document.getElementById("pesquisaFornecedor");

const filtroStatus = document.getElementById("filtroStatus");


//==========================================
// CARDS
//==========================================

const totalFornecedores =
document.getElementById("totalFornecedores");

const fornecedoresAtivos =
document.getElementById("fornecedoresAtivos");

const fornecedoresInativos =
document.getElementById("fornecedoresInativos");

const valorCompras =
document.getElementById("valorCompras");


//==========================================
// LOCAL STORAGE
//==========================================

let fornecedores = JSON.parse(

localStorage.getItem("fornecedores")

) || [];


//==========================================
// ABRIR MODAL
//==========================================

btnNovo.addEventListener("click",()=>{

    modal.style.display="flex";

    document.getElementById("ultimaCompra").value=

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
// CADASTRAR FORNECEDOR
//==================================================

form.addEventListener("submit", function(e){

    e.preventDefault();

    const fornecedor = {

        id: Date.now(),

        empresa: document.getElementById("empresa").value,

        responsavel: document.getElementById("responsavel").value,

        cnpj: document.getElementById("cnpj").value,

        telefone: document.getElementById("telefone").value,

        email: document.getElementById("email").value,

        endereco: document.getElementById("endereco").value,

        produto: document.getElementById("produto").value,

        valorCompra: Number(document.getElementById("valorCompra").value || 0),

        ultimaCompra: document.getElementById("ultimaCompra").value,

        prazoEntrega: document.getElementById("prazoEntrega").value,

        status: document.getElementById("status").value,

        observacoes: document.getElementById("observacoes").value

    };

    fornecedores.push(fornecedor);

    salvarFornecedores();

    renderizarTabela();

    atualizarCards();

    fechar();

    mostrarMensagem("Fornecedor cadastrado com sucesso!");

});



//==================================================
// SALVAR LOCAL STORAGE
//==================================================

function salvarFornecedores(){

    localStorage.setItem(

        "fornecedores",

        JSON.stringify(fornecedores)

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

    if(fornecedores.length === 0){

        tabela.innerHTML = `

        <tr>

            <td colspan="8" style="text-align:center;padding:30px;">

                Nenhum fornecedor cadastrado.

            </td>

        </tr>

        `;

        return;

    }

    fornecedores.forEach(item=>{

        const statusClasse =

        item.status==="Ativo"

        ? "sucesso"

        : "alerta";

        tabela.innerHTML += `

        <tr>

            <td>${item.empresa}</td>

            <td>${item.responsavel}</td>

            <td>${item.telefone}</td>

            <td>${item.email}</td>

            <td>${item.produto}</td>

            <td>${formatarData(item.ultimaCompra)}</td>

            <td>

                <span class="badge ${statusClasse}">

                    ${item.status}

                </span>

            </td>

            <td>

                <button
                class="btn-editar"
                onclick="editarFornecedor(${item.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                class="btn-excluir"
                onclick="excluirFornecedor(${item.id})">

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

    totalFornecedores.textContent = fornecedores.length;

    const ativos = fornecedores.filter(

        fornecedor=>fornecedor.status==="Ativo"

    ).length;

    const inativos = fornecedores.filter(

        fornecedor=>fornecedor.status==="Inativo"

    ).length;

    fornecedoresAtivos.textContent = ativos;

    fornecedoresInativos.textContent = inativos;

    let total = 0;

    fornecedores.forEach(item=>{

        total += item.valorCompra;

    });

    valorCompras.textContent =

    "R$ " + total.toFixed(2);

}



//==================================================
// CARREGAR DADOS
//==================================================

renderizarTabela();

atualizarCards();
// Atualizar fornecedor (editar)
function atualizarFornecedor(id) {
    const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

    const index = fornecedores.findIndex(f => f.id === id);

    if (index !== -1) {
        fornecedores[index].nome = document.getElementById("editNome").value;
        fornecedores[index].produto = document.getElementById("editProduto").value;
        fornecedores[index].telefone = document.getElementById("editTelefone").value;

        localStorage.setItem("fornecedores", JSON.stringify(fornecedores));

        fecharModal(); // fecha popup de edição
        listarFornecedores(); // recarrega lista
    }
}

// Remover fornecedor
function removerFornecedor(id) {
    let fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

    fornecedores = fornecedores.filter(f => f.id !== id);

    localStorage.setItem("fornecedores", JSON.stringify(fornecedores));

    listarFornecedores();
}

// Abrir modal de edição
function abrirModalEditar(id) {
    const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

    const fornecedor = fornecedores.find(f => f.id === id);

    if (fornecedor) {
        document.getElementById("editId").value = fornecedor.id;
        document.getElementById("editNome").value = fornecedor.nome;
        document.getElementById("editProduto").value = fornecedor.produto;
        document.getElementById("editTelefone").value = fornecedor.telefone;

        document.getElementById("modalEditar").style.display = "block";
    }
}

// Fechar modal
function fecharModal() {
    document.getElementById("modalEditar").style.display = "none";
}

// Inicializar lista ao abrir página
document.addEventListener("DOMContentLoaded", listarFornecedores);