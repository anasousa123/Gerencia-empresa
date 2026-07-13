//==================================================
// NEXUS ERP
// MÓDULO PRODUTOS
//==================================================

//------------------------------
// ELEMENTOS
//------------------------------

const modal = document.getElementById("modalProduto");

const btnNovo = document.getElementById("btnNovo");

const fecharModal = document.getElementById("fecharModal");

const cancelar = document.querySelector(".cancelar");

const form = document.getElementById("formProduto");

const listaProdutos = document.getElementById("listaProdutos");

const pesquisar = document.getElementById("pesquisar");

//------------------------------
// CAMPOS
//------------------------------

const nome = document.getElementById("nome");

const categoria = document.getElementById("categoriaProduto");

const compra = document.getElementById("compra");

const venda = document.getElementById("venda");

const estoque = document.getElementById("estoque");

const codigo = document.getElementById("codigo");

const descricao = document.getElementById("descricao");

//==================================================
// LOCAL STORAGE
//==================================================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

//==================================================
// ABRIR MODAL
//==================================================

btnNovo.addEventListener("click", () => {

    modal.classList.add("ativo");

});

//==================================================
// FECHAR MODAL
//==================================================

function fechar(){

    modal.classList.remove("ativo");

    form.reset();

}

fecharModal.addEventListener("click", fechar);

cancelar.addEventListener("click", fechar);

//==================================================
// CADASTRAR PRODUTO
//==================================================

form.addEventListener("submit", function(e){

    e.preventDefault();

    const produto = {

        id: Date.now(),

        nome: nome.value,

        categoria: categoria.value,

        compra: compra.value,

        venda: venda.value,

        estoque: estoque.value,

        codigo: codigo.value,

        descricao: descricao.value

    };

    produtos.push(produto);

    salvar();

    atualizarTabela();

    fechar();

});
//==================================================
// SALVAR LOCALSTORAGE
//==================================================

function salvar() {

    localStorage.setItem("produtos", JSON.stringify(produtos));

}

//==================================================
// ATUALIZAR TABELA
//==================================================

function atualizarTabela(lista = produtos) {

    listaProdutos.innerHTML = "";

    if (lista.length === 0) {

        listaProdutos.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;padding:30px;">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    lista.forEach(produto => {

        const status = Number(produto.estoque) > 10
            ? '<span class="status ativo">Disponível</span>'
            : '<span class="status baixo">Estoque Baixo</span>';

        listaProdutos.innerHTML += `

            <tr>

                <td>${produto.id}</td>

                <td>${produto.nome}</td>

                <td>${produto.categoria}</td>

                <td>${produto.estoque}</td>

                <td>R$ ${Number(produto.compra).toFixed(2)}</td>

                <td>R$ ${Number(produto.venda).toFixed(2)}</td>

                <td>${status}</td>

                <td>

                    <div class="acoes">

                        <button
                            class="btn-editar"
                            onclick="editarProduto(${produto.id})">

                            <i class="fa-solid fa-pen"></i>

                        </button>

                        <button
                            class="btn-excluir"
                            onclick="excluirProduto(${produto.id})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>

        `;

    });

}

//==================================================
// EXCLUIR
//==================================================

function excluirProduto(id){

    if(confirm("Deseja realmente excluir este produto?")){

        produtos = produtos.filter(produto => produto.id !== id);

        salvar();

        atualizarTabela();

    }

}

//==================================================
// EDITAR
//==================================================

function editarProduto(id){

    const produto = produtos.find(p => p.id === id);

    if(!produto) return;

    nome.value = produto.nome;

    categoria.value = produto.categoria;

    compra.value = produto.compra;

    venda.value = produto.venda;

    estoque.value = produto.estoque;

    codigo.value = produto.codigo;

    descricao.value = produto.descricao;

    excluirProduto(id);

    modal.classList.add("ativo");

}

//==================================================
// PESQUISA
//==================================================

pesquisar.addEventListener("keyup", () => {

    const texto = pesquisar.value.toLowerCase();

    const resultado = produtos.filter(produto =>

        produto.nome.toLowerCase().includes(texto) ||

        produto.categoria.toLowerCase().includes(texto)

    );

    atualizarTabela(resultado);

});

//==================================================
// INICIAR
//==================================================

atualizarTabela();