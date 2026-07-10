/*==================================================
SMART BURGER ERP
PRODUTOS.JS
==================================================*/


//==================================================
// ELEMENTOS
//==================================================


const modal = document.querySelector(".modal");

const btnNovoProduto = document.querySelector(".btn-primary");

const btnCancelar = document.querySelector(".cancelar");

const formulario = document.querySelector(".form-produto");

const listaProdutos = document.querySelector(".grid-produtos");

const pesquisa = document.querySelector("#pesquisa");

const filtroCategoria = document.querySelector("#categoria");



//==================================================
// BANCO LOCAL
//==================================================


let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let produtoEditando = null;



//==================================================
// ABRIR MODAL
//==================================================


btnNovoProduto.addEventListener("click",()=>{


    modal.classList.add("active");

    formulario.reset();

    produtoEditando = null;


});



//==================================================
// FECHAR MODAL
//==================================================


btnCancelar.addEventListener("click",()=>{


    modal.classList.remove("active");


});



// Fechar clicando fora

modal.addEventListener("click",(e)=>{


    if(e.target === modal){

        modal.classList.remove("active");

    }


});



//==================================================
// CADASTRAR PRODUTO
//==================================================


formulario.addEventListener("submit",(e)=>{


    e.preventDefault();



    const nome =
    document.querySelector("#nome").value;



    const categoria =
    document.querySelector("#categoriaProduto").value;



    const preco =
    Number(
    document.querySelector("#preco").value
    );



    const estoque =
    Number(
    document.querySelector("#estoque").value
    );



    const imagem =
    document.querySelector("#imagem").value;



    const descricao =
    document.querySelector("#descricao").value;




    const produto = {


        id:
        Date.now(),


        nome,

        categoria,

        preco,

        estoque,

        imagem,

        descricao


    };



    if(produtoEditando){


        produtos =
        produtos.map(p=>{

            if(p.id === produtoEditando){

                return {

                    ...produto,

                    id:p.id

                }

            }


            return p;


        });



    }else{


        produtos.push(produto);


    }



    salvarProdutos();


    renderizarProdutos();



    modal.classList.remove("active");



    formulario.reset();



    mostrarToast(
    "Produto salvo com sucesso!",
    "sucesso"
    );


});



//==================================================
// SALVAR
//==================================================


function salvarProdutos(){


    localStorage.setItem(

        "produtos",

        JSON.stringify(produtos)

    );


}



//==================================================
// MOSTRAR PRODUTOS
//==================================================


function renderizarProdutos(){


    listaProdutos.innerHTML="";



    if(produtos.length === 0){


        listaProdutos.innerHTML=`

        <div class="sem-produtos">

            <i class="fa-solid fa-box-open"></i>

            <h3>Nenhum produto cadastrado</h3>

            <p>Adicione produtos ao sistema</p>

        </div>

        `;


        return;


    }



    produtos.forEach(produto=>{


        listaProdutos.innerHTML += `


        <div class="card-produto">


            <div class="produto-img">


                <img src="${produto.imagem || 'img/produto.png'}">


            </div>



            <div class="produto-info">


                <span class="categoria-produto">

                ${produto.categoria}

                </span>


                <h3>${produto.nome}</h3>


                <p>${produto.descricao}</p>



                <div class="preco">

                R$ ${produto.preco.toFixed(2)}

                </div>



                <div class="estoque">


                <span>Estoque</span>


                <strong>

                ${produto.estoque}

                </strong>


                </div>



            </div>



            <div class="acoes-produto">


                <button 
                class="btn-editar"
                onclick="editarProduto(${produto.id})">

                Editar

                </button>



                <button 
                class="btn-excluir"
                onclick="excluirProduto(${produto.id})">

                Excluir

                </button>


            </div>


        </div>


        `;


    });


}
/*==================================================
EDITAR PRODUTO
==================================================*/


function editarProduto(id){


    const produto = produtos.find(p=>p.id === id);



    if(!produto) return;



    produtoEditando = id;



    document.querySelector("#nome").value =
    produto.nome;



    document.querySelector("#categoriaProduto").value =
    produto.categoria;



    document.querySelector("#preco").value =
    produto.preco;



    document.querySelector("#estoque").value =
    produto.estoque;



    document.querySelector("#imagem").value =
    produto.imagem;



    document.querySelector("#descricao").value =
    produto.descricao;



    modal.classList.add("active");


}



//==================================================
// EXCLUIR PRODUTO
//==================================================


function excluirProduto(id){


    const confirmar =
    confirm(
    "Deseja realmente excluir este produto?"
    );



    if(!confirmar) return;



    produtos =
    produtos.filter(
    produto=>produto.id !== id
    );



    salvarProdutos();



    renderizarProdutos();



    mostrarToast(
    "Produto excluído!",
    "erro"
    );


}



//==================================================
// PESQUISA DE PRODUTOS
//==================================================


pesquisa.addEventListener("input",()=>{


    const valor =
    pesquisa.value.toLowerCase();



    const resultado = produtos.filter(produto=>{


        return produto.nome
        .toLowerCase()
        .includes(valor);


    });



    mostrarLista(resultado);



});



//==================================================
// FILTRO CATEGORIA
//==================================================


filtroCategoria.addEventListener("change",()=>{


    const categoria =
    filtroCategoria.value;



    if(categoria === "todos"){


        renderizarProdutos();


        return;

    }



    const filtrados =
    produtos.filter(produto=>{


        return produto.categoria === categoria;


    });



    mostrarLista(filtrados);



});



//==================================================
// MOSTRAR LISTA FILTRADA
//==================================================


function mostrarLista(lista){


    listaProdutos.innerHTML="";



    lista.forEach(produto=>{


        listaProdutos.innerHTML += `


        <div class="card-produto">


            <div class="produto-img">


                <img src="${produto.imagem || 'img/produto.png'}">


            </div>



            <div class="produto-info">


                <span class="categoria-produto">

                ${produto.categoria}

                </span>



                <h3>${produto.nome}</h3>



                <p>${produto.descricao}</p>



                <div class="preco">

                R$ ${produto.preco.toFixed(2)}

                </div>



                <div class="estoque">

                    <span>

                    Estoque

                    </span>


                    <strong>

                    ${produto.estoque}

                    </strong>


                </div>


            </div>



            <div class="acoes-produto">


                <button 
                class="btn-editar"
                onclick="editarProduto(${produto.id})">

                Editar

                </button>



                <button 
                class="btn-excluir"
                onclick="excluirProduto(${produto.id})">

                Excluir

                </button>


            </div>


        </div>


        `;


    });



}



//==================================================
// ATUALIZAR RESUMO
//==================================================


function atualizarResumo(){


    const totalProdutos =
    produtos.length;



    const totalEstoque =
    produtos.reduce(
    (total,p)=>total+p.estoque,
    0
    );



    const categorias =
    new Set(
    produtos.map(p=>p.categoria)
    ).size;



    const produtosAtivos =
    produtos.filter(
    p=>p.estoque > 0
    ).length;



    document.querySelector("#totalProdutos")
    .innerText =
    totalProdutos;



    document.querySelector("#totalEstoque")
    .innerText =
    totalEstoque;



    document.querySelector("#totalCategorias")
    .innerText =
    categorias;



    document.querySelector("#produtosAtivos")
    .innerText =
    produtosAtivos;



}



//==================================================
// TOAST
//==================================================


function mostrarToast(mensagem,tipo){


    const toast =
    document.querySelector(".toast");



    if(!toast) return;



    toast.className =
    `toast ${tipo} show`;



    toast.innerHTML = `


    <i class="fa-solid 
    ${tipo === "sucesso"
    ? "fa-circle-check"
    : "fa-circle-xmark"}"></i>



    <span>

    ${mensagem}

    </span>


    `;



    setTimeout(()=>{


        toast.classList.remove("show");


    },3000);



}



//==================================================
// INICIALIZAÇÃO
//==================================================


renderizarProdutos();


atualizarResumo();
/*==================================================
VALIDAÇÃO DOS CAMPOS
==================================================*/


function validarProduto(){


    const nome =
    document.querySelector("#nome").value.trim();


    const preco =
    document.querySelector("#preco").value;


    const estoque =
    document.querySelector("#estoque").value;


    const categoria =
    document.querySelector("#categoriaProduto").value;



    if(nome === ""){


        mostrarToast(
        "Informe o nome do produto!",
        "erro"
        );


        return false;

    }



    if(categoria === ""){


        mostrarToast(
        "Selecione uma categoria!",
        "erro"
        );


        return false;

    }



    if(preco <= 0){


        mostrarToast(
        "Digite um preço válido!",
        "erro"
        );


        return false;

    }



    if(estoque < 0 || estoque === ""){


        mostrarToast(
        "Digite um estoque válido!",
        "erro"
        );


        return false;

    }



    return true;


}



//==================================================
// FORMATAÇÃO DE PREÇO
//==================================================


const campoPreco =
document.querySelector("#preco");



campoPreco.addEventListener(
"input",
()=>{


    let valor =
    campoPreco.value;



    valor =
    valor.replace(/\D/g,"");



    valor =
    (valor / 100)
    .toFixed(2);



    campoPreco.value =
    valor;


});



//==================================================
// ALERTA DE ESTOQUE BAIXO
//==================================================


function verificarEstoque(){


    const baixos =
    produtos.filter(
    produto=>produto.estoque <= 5
    );



    const alerta =
    document.querySelector(
    ".alerta-estoque"
    );



    if(!alerta) return;



    if(baixos.length > 0){


        alerta.style.display="flex";


        alerta.innerHTML=`


        <i class="fa-solid fa-triangle-exclamation"></i>


        <div>


        <h4>
        Estoque baixo
        </h4>


        <p>

        ${baixos.length}
        produto(s) precisam de reposição.

        </p>


        </div>


        `;



    }else{


        alerta.style.display="none";


    }


}



//==================================================
// BARRA DE ESTOQUE
//==================================================


function calcularEstoque(quantidade){


    let porcentagem =
    quantidade * 10;



    if(porcentagem > 100){

        porcentagem = 100;

    }



    return porcentagem;


}



//==================================================
// STATUS DO ESTOQUE
//==================================================


function classeEstoque(quantidade){


    if(quantidade <=5){

        return "baixo";

    }


    if(quantidade <=20){

        return "medio";

    }


    return "alto";


}



//==================================================
// ATUALIZAR SISTEMA
//==================================================


function atualizarSistema(){


    salvarProdutos();


    renderizarProdutos();


    atualizarResumo();


    verificarEstoque();


}



//==================================================
// EXPORTAR PRODUTOS
//==================================================


function exportarProdutos(){


    const dados =
    JSON.stringify(
    produtos,
    null,
    2
    );



    const arquivo =
    new Blob(
    [dados],
    {
        type:"application/json"
    });



    const link =
    document.createElement("a");



    link.href =
    URL.createObjectURL(
    arquivo
    );



    link.download =
    "produtos-smart-burger.json";



    link.click();


}



//==================================================
// IMPORTAR PRODUTOS
//==================================================


function importarProdutos(event){


    const arquivo =
    event.target.files[0];



    if(!arquivo) return;



    const leitor =
    new FileReader();



    leitor.onload = function(e){


        produtos =
        JSON.parse(
        e.target.result
        );



        atualizarSistema();



        mostrarToast(
        "Produtos importados!",
        "sucesso"
        );


    }



    leitor.readAsText(arquivo);


}



//==================================================
// EXECUTAR AO CARREGAR
//==================================================


verificarEstoque();
/*==================================================
SMART BURGER ERP
PRODUTOS.JS
FIREBASE FIRESTORE
==================================================*/


//==================================================
// FIREBASE
//==================================================


import {

    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc

} from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";



import { db } from "./firebase.js";



//==================================================
// COLEÇÃO
//==================================================


const produtosRef =
collection(db,"produtos");



//==================================================
// CARREGAR PRODUTOS FIREBASE
//==================================================


async function carregarProdutosFirebase(){


    produtos = [];



    const dados =
    await getDocs(produtosRef);



    dados.forEach(item=>{


        produtos.push({

            id:item.id,

            ...item.data()

        });


    });



    renderizarProdutos();


    atualizarResumo();


    verificarEstoque();


}



//==================================================
// ADICIONAR PRODUTO FIREBASE
//==================================================


async function salvarProdutoFirebase(produto){


    try{


        await addDoc(

            produtosRef,

            produto

        );



        mostrarToast(

        "Produto cadastrado!",
        "sucesso"

        );



        carregarProdutosFirebase();



    }catch(error){


        console.log(error);



        mostrarToast(

        "Erro ao salvar produto!",
        "erro"

        );


    }


}



//==================================================
// EXCLUIR FIREBASE
//==================================================


async function excluirProdutoFirebase(id){


    try{


        await deleteDoc(

            doc(
            db,
            "produtos",
            id
            )

        );



        mostrarToast(

        "Produto removido!",
        "sucesso"

        );



        carregarProdutosFirebase();



    }catch(error){


        console.log(error);


    }


}



//==================================================
// EDITAR FIREBASE
//==================================================


async function editarProdutoFirebase(id, dados){



    try{


        await updateDoc(

            doc(
            db,
            "produtos",
            id
            ),

            dados

        );



        mostrarToast(

        "Produto atualizado!",
        "sucesso"

        );



        carregarProdutosFirebase();



    }catch(error){


        console.log(error);


    }


}



//==================================================
// UPLOAD DE IMAGEM
//==================================================


function previewImagem(event){


    const imagem =
    document.querySelector(
    "#preview"
    );



    imagem.src =
    URL.createObjectURL(
    event.target.files[0]
    );


}



//==================================================
// BUSCA FIREBASE
//==================================================


async function pesquisarFirebase(valor){


    const resultado=[];



    const dados =
    await getDocs(produtosRef);



    dados.forEach(item=>{


        const produto =
        item.data();



        if(
        produto.nome
        .toLowerCase()
        .includes(
        valor.toLowerCase()
        )
        ){


            resultado.push({

                id:item.id,

                ...produto

            });


        }


    });



    mostrarLista(resultado);


}



//==================================================
// ATUALIZAÇÃO AUTOMÁTICA
//==================================================


setInterval(()=>{


    carregarProdutosFirebase();


},30000);



//==================================================
// INICIALIZAÇÃO FIREBASE
//==================================================


carregarProdutosFirebase();