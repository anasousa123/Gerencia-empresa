//==================================================
// NEXUS ERP
// MÓDULO ESTOQUE
//==================================================

//==============================
// ELEMENTOS
//==============================

const modal = document.getElementById("modalMovimento");
const btnMovimento = document.getElementById("btnMovimento");
const fecharModal = document.getElementById("fecharModal");
const cancelar = document.querySelector(".cancelar");
const form = document.getElementById("formMovimento");
const listaMovimentos = document.getElementById("listaMovimentos");
const pesquisar = document.getElementById("pesquisar");

//==============================
// CAMPOS
//==============================

const produto = document.getElementById("produto");
const tipo = document.getElementById("tipo");
const quantidade = document.getElementById("quantidade");
const responsavel = document.getElementById("responsavel");
const observacao = document.getElementById("observacao");

//==============================
// DADOS
//==============================

let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

//==============================
// ABRIR MODAL
//==============================

btnMovimento.addEventListener("click", () => {

    modal.classList.add("ativo");

});

//==============================
// FECHAR MODAL
//==============================

function fechar() {

    modal.classList.remove("ativo");

    form.reset();

}

fecharModal.addEventListener("click", fechar);

cancelar.addEventListener("click", fechar);

//==============================
// SALVAR MOVIMENTAÇÃO
//==============================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const movimento = {

        id: Date.now(),

        data: new Date().toLocaleDateString("pt-BR"),

        produto: produto.value,

        tipo: tipo.value,

        quantidade: Number(quantidade.value),

        responsavel: responsavel.value,

        observacao: observacao.value

    };

    movimentacoes.push(movimento);

    atualizarEstoque(movimento);

    salvar();

    atualizarTabela();

    atualizarCards();

    fechar();

});
//==================================================
// SALVAR LOCALSTORAGE
//==================================================

function salvar() {

    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));
    localStorage.setItem("produtos", JSON.stringify(produtos));

}

//==================================================
// ATUALIZAR ESTOQUE
//==================================================

function atualizarEstoque(movimento) {

    const item = produtos.find(p => p.nome === movimento.produto);

    if (!item) return;

    if (movimento.tipo === "Entrada") {

        item.estoque =
            Number(item.estoque) + movimento.quantidade;

    } else {

        item.estoque =
            Number(item.estoque) - movimento.quantidade;

        if (item.estoque < 0) {

            item.estoque = 0;

        }

    }

}

//==================================================
// ATUALIZAR TABELA
//==================================================

function atualizarTabela(lista = movimentacoes) {

    listaMovimentos.innerHTML = "";

    if (lista.length === 0) {

        listaMovimentos.innerHTML = `

        <tr>

            <td colspan="7" style="text-align:center;padding:30px;">

                Nenhuma movimentação cadastrada.

            </td>

        </tr>

        `;

        return;

    }

    lista.forEach(mov => {

        listaMovimentos.innerHTML += `

        <tr>

            <td>${mov.data}</td>

            <td>${mov.produto}</td>

            <td class="${mov.tipo === "Entrada" ? "entrada" : "saida"}">

                ${mov.tipo}

            </td>

            <td>${mov.quantidade}</td>

            <td>${mov.responsavel}</td>

            <td>${mov.observacao}</td>

            <td>

                <div class="acoes">

                    <button
                        class="btn-excluir"
                        onclick="excluirMovimento(${mov.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}

//==================================================
// EXCLUIR MOVIMENTAÇÃO
//==================================================

function excluirMovimento(id) {

    if (confirm("Deseja excluir esta movimentação?")) {

        movimentacoes =
            movimentacoes.filter(m => m.id !== id);

        salvar();

        atualizarTabela();

        atualizarCards();

    }

}

//==================================================
// PESQUISA
//==================================================

pesquisar.addEventListener("keyup", () => {

    const texto = pesquisar.value.toLowerCase();

    const resultado = movimentacoes.filter(m =>

        m.produto.toLowerCase().includes(texto) ||

        m.responsavel.toLowerCase().includes(texto)

    );

    atualizarTabela(resultado);

});

//==================================================
// CARDS
//==================================================

function atualizarCards() {

    document.getElementById("totalProdutos").innerHTML =
        produtos.length;

    document.getElementById("totalEntradas").innerHTML =
        movimentacoes.filter(m => m.tipo === "Entrada").length;

    document.getElementById("totalSaidas").innerHTML =
        movimentacoes.filter(m => m.tipo === "Saída").length;

    document.getElementById("estoqueBaixo").innerHTML =
        produtos.filter(p => Number(p.estoque) <= 10).length;

}

//==================================================
// INICIAR
//==================================================

atualizarTabela();

atualizarCards();

console.log("Módulo de Estoque carregado com sucesso.");