//====================================================
// SMART BURGUER ERP
// APP.JS
//====================================================

//==========================================
// ELEMENTOS
//==========================================

const sidebar = document.getElementById("sidebar");

const btnMenu = document.getElementById("btnMenu");

const menuItens = document.querySelectorAll(".sidebar li");

const pesquisa = document.querySelector(".search input");

//==========================================
// MENU LATERAL
//==========================================

btnMenu.addEventListener("click", () => {

    sidebar.classList.toggle("minimizada");

});

//==========================================
// MENU ATIVO
//==========================================

menuItens.forEach(item => {

    item.addEventListener("click", () => {

        menuItens.forEach(menu => {

            menu.classList.remove("active");

        });

        item.classList.add("active");

    });

});

//==========================================
// PESQUISA
//==========================================

pesquisa.addEventListener("keyup", () => {

    const texto = pesquisa.value.toLowerCase();

    menuItens.forEach(item => {

        const nome = item.innerText.toLowerCase();

        if (nome.includes(texto)) {

            item.style.display = "block";

        } else {

            item.style.display = "none";

        }

    });

});

//==========================================
// TOAST
//==========================================

function mostrarToast(mensagem, cor = "#22c55e") {

    let toast = document.querySelector(".toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.innerHTML = mensagem;

    toast.style.background = cor;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

//==========================================
// BOAS VINDAS
//==========================================

window.addEventListener("load", () => {

    mostrarToast("Bem-vinda ao SMART BURGUER ERP 🚀");

});
//====================================================
// SMART BURGUER ERP
// PARTE 2
//====================================================

//==========================================
// SUBMENUS
//==========================================

const menusComSubmenu = document.querySelectorAll(".menu-dropdown");

menusComSubmenu.forEach(menu => {

    menu.addEventListener("click", () => {

        menu.classList.toggle("menu-open");

    });

});

//==========================================
// ALTERAR TÍTULO DA PÁGINA
//==========================================

const tituloPagina = document.querySelector(".page-title h1");

menuItens.forEach(item => {

    item.addEventListener("click", () => {

        const texto = item.querySelector("span").textContent;

        if(tituloPagina){

            tituloPagina.textContent = texto;

        }

    });

});

//==========================================
// ANIMAÇÃO DOS CARDS
//==========================================

const cards = document.querySelectorAll(".card");

cards.forEach((card, index)=>{

    card.style.opacity = "0";

    card.style.transform = "translateY(30px)";

    setTimeout(()=>{

        card.style.transition = ".5s";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    },150 * index);

});

//==========================================
// EFEITO HOVER NOS BOTÕES
//==========================================

const botoes = document.querySelectorAll("button");

botoes.forEach(botao=>{

    botao.addEventListener("mouseenter",()=>{

        botao.style.transform="translateY(-3px)";

    });

    botao.addEventListener("mouseleave",()=>{

        botao.style.transform="translateY(0)";

    });

});

//==========================================
// ATALHO DE TECLADO
// CTRL + K ABRE A PESQUISA
//==========================================

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="k"){

        e.preventDefault();

        pesquisa.focus();

    }

});

//==========================================
// RELÓGIO
//==========================================

function atualizarHorario(){

    const agora = new Date();

    const hora = agora.toLocaleTimeString("pt-BR");

    console.log("Horário:",hora);

}

setInterval(atualizarHorario,1000);

//==========================================
// LOADING
//==========================================

function mostrarLoading(){

    const loading = document.createElement("div");

    loading.className="loading";

    loading.id="loading";

    document.body.appendChild(loading);

}

function esconderLoading(){

    const loading=document.getElementById("loading");

    if(loading){

        loading.remove();

    }

}

//==========================================
// EXEMPLO
//==========================================

setTimeout(()=>{

    mostrarLoading();

    setTimeout(()=>{

        esconderLoading();

    },1200);

},800);