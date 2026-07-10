// ==========================================
// SMART BURGUER ERP
// APP.JS
// ==========================================

// MENU LATERAL

const btnMenu = document.getElementById("btnMenu");
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");

let menuAberto = true;

btnMenu.addEventListener("click", () => {

    if(menuAberto){

        sidebar.style.width = "80px";

        main.style.marginLeft = "80px";
        main.style.width = "calc(100% - 80px)";

        document.querySelectorAll(".sidebar span").forEach(item=>{

            item.style.display = "none";

        });

        document.querySelector(".logo h2").style.display = "none";

    }else{

        sidebar.style.width = "260px";

        main.style.marginLeft = "260px";
        main.style.width = "calc(100% - 260px)";

        document.querySelectorAll(".sidebar span").forEach(item=>{

            item.style.display = "inline";

        });

        document.querySelector(".logo h2").style.display = "block";

    }

    menuAberto = !menuAberto;

});

// MENU ATIVO

const links = document.querySelectorAll(".sidebar li");

links.forEach(link=>{

    link.addEventListener("click",()=>{

        links.forEach(item=>{

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

});

// MENSAGEM DE BOAS-VINDAS

window.addEventListener("load",()=>{

    console.log("SMART BURGUER ERP carregado com sucesso!");

});