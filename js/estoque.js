//==================================================
// NEXUS ERP
// ESTOQUE
//==================================================

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    await addDoc(collection(db,"estoque"),{

        data:new Date(),

        produto:produto.value,

        tipo:tipo.value,

        quantidade:Number(quantidade.value),

        responsavel:responsavel.value,

        observacao:observacao.value

    });

    alert("Movimentação salva!");

    fechar();

    carregarMovimentos();

});
async function carregarMovimentos(){

    listaMovimentos.innerHTML="";

    const snapshot =
    await getDocs(collection(db,"estoque"));

    snapshot.forEach((documento)=>{

        const mov=documento.data();

        listaMovimentos.innerHTML+=`

        <tr>

        <td>${new Date(mov.data.seconds*1000).toLocaleDateString()}</td>

        <td>${mov.produto}</td>

        <td>${mov.tipo}</td>

        <td>${mov.quantidade}</td>

        <td>${mov.responsavel}</td>

        <td>${mov.observacao}</td>

        <td>

        <button
        onclick="excluir('${documento.id}')">

        Excluir

        </button>

        </td>

        </tr>

        `;

    });

}
window.excluir = async(id)=>{

    if(confirm("Excluir movimentação?")){

        await deleteDoc(doc(db,"estoque",id));

        carregarMovimentos();

    }

}
btnMovimento.onclick=()=>{

    modal.classList.add("ativo");

}

function fechar(){

    modal.classList.remove("ativo");

    form.reset();

}

fecharModal.onclick=fechar;

cancelar.onclick=fechar;

carregarMovimentos();
import {
collection,
getDocs,
doc,
updateDoc,
getDoc,
addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
async function carregarProdutos(){

    produto.innerHTML =
    '<option value="">Selecione um produto</option>';

    const snapshot =
    await getDocs(collection(db,"produtos"));

    snapshot.forEach(documento=>{

        const p=documento.data();

        produto.innerHTML += `

        <option value="${documento.id}">

            ${p.nome}

        </option>

        `;

    });

}
produto.addEventListener("change", async()=>{

    const id=produto.value;

    if(!id) return;

    const documento =
    await getDoc(doc(db,"produtos",id));

    const dados=documento.data();

    document.getElementById("estoqueAtual").innerHTML=

    "Estoque Atual: "+dados.estoque;

});
const documento =
await getDoc(doc(db,"produtos",produto.value));

const dados=documento.data();

let novoEstoque=dados.estoque;

if(tipo.value=="Entrada"){

    novoEstoque += Number(quantidade.value);

}else{

    novoEstoque -= Number(quantidade.value);

    if(novoEstoque<0){

        alert("Estoque insuficiente.");

        return;

    }

}

await updateDoc(doc(db,"produtos",produto.value),{

    estoque:novoEstoque

});