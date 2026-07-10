//==================================================
// SMART BURGUER ERP
// APP.JS
//==================================================

//==============================
// ELEMENTOS
//==============================

const sidebar = document.getElementById("sidebar");
const btnMenu = document.getElementById("btnMenu");
const frame = document.getElementById("frameSistema");

const menuLinks = document.querySelectorAll(".menu li a");

//==============================
// SIDEBAR
//==============================

let menuAberto = true;

btnMenu.addEventListener("click", () => {

    if(menuAberto){

        sidebar.style.width = "85px";

        document.querySelector(".principal").style.marginLeft = "85px";
        document.querySelector(".principal").style.width = "calc(100% - 85px)";

        document.querySelectorAll(".menu li a").forEach(link=>{

            link.childNodes.forEach(node=>{

                if(node.nodeType===3){

                    node.textContent="";

                }

            });

        });

        document.querySelector(".logo h2").style.display="none";

    }else{

        sidebar.style.width="270px";

        document.querySelector(".principal").style.marginLeft="270px";
        document.querySelector(".principal").style.width="calc(100% - 270px)";

        restaurarMenu();

        document.querySelector(".logo h2").style.display="block";

    }

    menuAberto=!menuAberto;

});

//==============================
// RESTAURA MENU
//==============================

function restaurarMenu(){

    const nomes=[
        "Dashboard",
        "Produtos",
        "Pedidos",
        "Clientes",
        "Cardápio",
        "Estoque",
        "Financeiro",
        "Fornecedores",
        "Relatórios",
        "Configurações",
        "Perfil"
    ];

    document.querySelectorAll(".menu li a").forEach((item,index)=>{

        item.innerHTML=`
            ${item.querySelector("i").outerHTML}
            ${nomes[index]}
        `;

    });

}

//==============================
// CARREGAR PÁGINAS
//==============================

menuLinks.forEach(link=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

        let pagina=link.getAttribute("href");

        frame.src=pagina;

        localStorage.setItem("paginaAtual",pagina);

        document.querySelectorAll(".menu li").forEach(li=>{

            li.classList.remove("ativo");

        });

        link.parentElement.classList.add("ativo");

    });

});

//==============================
// ABRIR ÚLTIMA PÁGINA
//==============================

window.addEventListener("load",()=>{

    const ultimaPagina=localStorage.getItem("paginaAtual");

    if(ultimaPagina){

        frame.src=ultimaPagina;

    }

});

//==============================
// LOADING
//==============================

function mostrarLoading(){

    if(document.querySelector(".loading")) return;

    const loading=document.createElement("div");

    loading.className="loading";

    loading.innerHTML=`
        <div class="spinner"></div>
    `;

    document.body.appendChild(loading);

}

function esconderLoading(){

    const loading=document.querySelector(".loading");

    if(loading){

        loading.remove();

    }

}

//==============================
// LOADING DO IFRAME
//==============================

frame.addEventListener("load",()=>{

    esconderLoading();

});

menuLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        mostrarLoading();

    });

});

//==============================
// TOAST
//==============================

function mostrarToast(mensagem,tipo="sucesso"){

    const toast=document.createElement("div");

    toast.className="toast";

    if(tipo==="erro"){

        toast.classList.add("erro");

    }

    if(tipo==="aviso"){

        toast.classList.add("aviso");

    }

    toast.innerHTML=`
        <i class="fa-solid fa-circle-check"></i>
        <span>${mensagem}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },400);

    },3000);

}

//==============================
// EXEMPLO
//==============================

// mostrarToast("Bem-vindo ao SMART BURGUER ERP!");
// mostrarToast("Produto salvo com sucesso!");
// mostrarToast("Erro ao salvar!","erro");
// mostrarToast("Estoque baixo!","aviso");