/* ======================================================
   NEXUS ERP
   PRODUTOS.JS
====================================================== */

class Produtos {

    constructor() {

        this.produtos = [];

        this.iniciar();

    }

    iniciar() {

        this.carregarProdutos();

        this.eventos();

        this.atualizarCards();

    }

    /* ===============================
       EVENTOS
    =============================== */

    eventos() {

        const pesquisa = document.querySelector("#pesquisaProduto");

        if (pesquisa) {

            pesquisa.addEventListener("keyup", (e) => {

                this.pesquisar(e.target.value);

            });

        }

        const btnNovo = document.querySelector("#btnNovoProduto");

        if (btnNovo) {

            btnNovo.addEventListener("click", () => {

                this.novoProduto();

            });

        }

    }

    /* ===============================
       CARREGAR PRODUTOS
    =============================== */

    carregarProdutos() {

        const dados = localStorage.getItem("produtos");

        this.produtos = dados ? JSON.parse(dados) : [];

        this.renderizarTabela();

    }

    /* ===============================
       SALVAR
    =============================== */

    salvar() {

        localStorage.setItem(

            "produtos",

            JSON.stringify(this.produtos)

        );

    }

    /* ===============================
       RENDERIZAR
    =============================== */

    renderizarTabela(lista = this.produtos) {

        const tbody = document.querySelector("#tabelaProdutos");

        if (!tbody) return;

        tbody.innerHTML = "";

        if (lista.length === 0) {

            tbody.innerHTML = `

            <tr>

                <td colspan="10">

                    Nenhum produto cadastrado.

                </td>

            </tr>

            `;

            return;

        }

        lista.forEach((produto,index)=>{

            tbody.innerHTML += `

            <tr>

                <td>

                    <img class="product-image"

                    src="${produto.imagem || '../assets/img/sem-imagem.png'}">

                </td>

                <td>${produto.codigo}</td>

                <td>${produto.nome}</td>

                <td>${produto.categoria}</td>

                <td>${produto.fornecedor}</td>

                <td>R$ ${produto.compra}</td>

                <td>R$ ${produto.venda}</td>

                <td>${produto.estoque}</td>

                <td>

                    <span class="badge badge-success">

                        Ativo

                    </span>

                </td>

                <td>

                    <button onclick="app.editar(${index})"

                    class="btn btn-outline">

                    <i class="fa-solid fa-pen"></i>

                    </button>

                    <button onclick="app.excluir(${index})"

                    class="btn btn-danger">

                    <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

            `;

        });

    }

    /* ===============================
       PESQUISA
    =============================== */

    pesquisar(texto) {

        texto = texto.toLowerCase();

        const resultado = this.produtos.filter(produto =>

            produto.nome.toLowerCase().includes(texto) ||

            produto.codigo.toLowerCase().includes(texto)

        );

        this.renderizarTabela(resultado);

    }

    /* ===============================
       NOVO
    =============================== */

    novoProduto(){

        console.log("Abrir Modal");

    }

    /* ===============================
       EDITAR
    =============================== */

    editar(index){

        console.log(this.produtos[index]);

    }

    /* ===============================
       EXCLUIR
    =============================== */

    excluir(index){

        if(confirm("Deseja excluir este produto?")){

            this.produtos.splice(index,1);

            this.salvar();

            this.renderizarTabela();

            this.atualizarCards();

        }

    }

    /* ===============================
       CARDS
    =============================== */

    atualizarCards(){

        document.querySelectorAll(".totalProdutos")

        .forEach(el=>{

            el.innerHTML=this.produtos.length;

        });

    }

}

/* ==========================================
   INICIAR SISTEMA
========================================== */

const app = new Produtos();