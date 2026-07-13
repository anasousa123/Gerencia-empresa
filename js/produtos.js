//==================================================
// NEXUS ERP
// MÓDULO PRODUTOS
//==================================================

//------------------------------
// ELEMENTOS
//------------------------------

import { db } from "./firebase.js";

import {

collection,

addDoc,

getDocs,

deleteDoc,

doc,

updateDoc

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

async function salvarProduto(){

    await addDoc(collection(db,"produtos"),{

        nome:nome.value,

        categoria:categoria.value,

        compra:Number(compra.value),

        venda:Number(venda.value),

        estoque:Number(estoque.value),

        codigo:codigo.value,

        descricao:descricao.value,

        criadoEm:new Date()

    });

    alert("Produto cadastrado!");

    carregarProdutos();

}

//==================================================
// ATUALIZAR TABELA
//==================================================

async function carregarProdutos(){

    listaProdutos.innerHTML="";

    const querySnapshot =
    await getDocs(collection(db,"produtos"));

    querySnapshot.forEach((documento)=>{

        const produto=documento.data();

        listaProdutos.innerHTML += `

        <tr>

        <td>${produto.nome}</td>

        <td>${produto.categoria}</td>

        <td>${produto.estoque}</td>

        <td>R$ ${produto.venda.toFixed(2)}</td>

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