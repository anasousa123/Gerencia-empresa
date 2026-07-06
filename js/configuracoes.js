//==================================================
// SMART BURGUER ERP
// CONFIGURAÇÕES
//==================================================

//==========================================
// ELEMENTOS
//==========================================

const formEmpresa = document.getElementById("formEmpresa");
const formUsuario = document.getElementById("formUsuario");
const formSenha = document.getElementById("formSenha");

const btnSalvar = document.getElementById("salvarConfiguracoes");

const logoEmpresa = document.getElementById("logoEmpresa");

let imagemLogo = "";


//==========================================
// LOCAL STORAGE
//==========================================

let empresa = JSON.parse(localStorage.getItem("empresa")) || {};

let usuario = JSON.parse(localStorage.getItem("usuario")) || {};

let preferencias = JSON.parse(localStorage.getItem("preferencias")) || {};


//==========================================
// CARREGAR DADOS
//==========================================

window.addEventListener("load", carregarConfiguracoes);

function carregarConfiguracoes(){

    // Empresa

    document.getElementById("nomeEmpresa").value =
    empresa.nome || "";

    document.getElementById("cnpjEmpresa").value =
    empresa.cnpj || "";

    document.getElementById("telefoneEmpresa").value =
    empresa.telefone || "";

    document.getElementById("emailEmpresa").value =
    empresa.email || "";

    document.getElementById("siteEmpresa").value =
    empresa.site || "";

    document.getElementById("enderecoEmpresa").value =
    empresa.endereco || "";

    document.getElementById("instagramEmpresa").value =
    empresa.instagram || "";

    document.getElementById("facebookEmpresa").value =
    empresa.facebook || "";



    // Usuário

    document.getElementById("nomeUsuario").value =
    usuario.nome || "";

    document.getElementById("emailUsuario").value =
    usuario.email || "";

    document.getElementById("usuarioSistema").value =
    usuario.login || "";

    document.getElementById("cargoUsuario").value =
    usuario.cargo || "Administrador";



    // Preferências

    document.getElementById("modoEscuro").checked =
    preferencias.modoEscuro || false;

    document.getElementById("notificacoes").checked =
    preferencias.notificacoes ?? true;

    document.getElementById("somSistema").checked =
    preferencias.som ?? true;

    document.getElementById("backupAutomatico").checked =
    preferencias.backup ?? true;

    document.getElementById("idioma").value =
    preferencias.idioma || "Português (Brasil)";

    document.getElementById("moeda").value =
    preferencias.moeda || "Real (R$)";

    document.getElementById("formatoData").value =
    preferencias.formato || "DD/MM/AAAA";

    document.getElementById("fusoHorario").value =
    preferencias.fuso || "Brasília (GMT-3)";

}
//==================================================
// SALVAR DADOS DA EMPRESA
//==================================================

function salvarEmpresa(){

    empresa = {

        nome: document.getElementById("nomeEmpresa").value,

        cnpj: document.getElementById("cnpjEmpresa").value,

        telefone: document.getElementById("telefoneEmpresa").value,

        email: document.getElementById("emailEmpresa").value,

        site: document.getElementById("siteEmpresa").value,

        endereco: document.getElementById("enderecoEmpresa").value,

        instagram: document.getElementById("instagramEmpresa").value,

        facebook: document.getElementById("facebookEmpresa").value,

        logo: imagemLogo

    };

    localStorage.setItem(

        "empresa",

        JSON.stringify(empresa)

    );

}



//==================================================
// SALVAR USUÁRIO
//==================================================

function salvarUsuario(){

    usuario = {

        nome: document.getElementById("nomeUsuario").value,

        email: document.getElementById("emailUsuario").value,

        login: document.getElementById("usuarioSistema").value,

        cargo: document.getElementById("cargoUsuario").value

    };

    localStorage.setItem(

        "usuario",

        JSON.stringify(usuario)

    );

}



//==================================================
// SALVAR PREFERÊNCIAS
//==================================================

function salvarPreferencias(){

    preferencias = {

        modoEscuro:

        document.getElementById("modoEscuro").checked,

        notificacoes:

        document.getElementById("notificacoes").checked,

        som:

        document.getElementById("somSistema").checked,

        backup:

        document.getElementById("backupAutomatico").checked,

        idioma:

        document.getElementById("idioma").value,

        moeda:

        document.getElementById("moeda").value,

        formato:

        document.getElementById("formatoData").value,

        fuso:

        document.getElementById("fusoHorario").value

    };

    localStorage.setItem(

        "preferencias",

        JSON.stringify(preferencias)

    );

}



//==================================================
// LOGO DA EMPRESA
//==================================================

logoEmpresa.addEventListener("change",(e)=>{

    const arquivo = e.target.files[0];

    if(!arquivo) return;

    const reader = new FileReader();

    reader.onload=function(event){

        imagemLogo = event.target.result;

    }

    reader.readAsDataURL(arquivo);

});



//==================================================
// BOTÃO SALVAR
//==================================================

btnSalvar.addEventListener("click",(e)=>{

    e.preventDefault();

    salvarEmpresa();

    salvarUsuario();

    salvarPreferencias();

    mostrarMensagem(

        "Configurações salvas com sucesso!"

    );

});
//==================================================
// VALIDAÇÃO DE SENHA
//==================================================

function validarSenha(){

    const atual = document.getElementById("senhaAtual").value;

    const nova = document.getElementById("novaSenha").value;

    const confirmar = document.getElementById("confirmarSenha").value;

    if(atual === "" && nova === "" && confirmar === ""){

        return true;

    }

    if(nova.length < 6){

        mostrarMensagem("A nova senha deve ter no mínimo 6 caracteres.");

        return false;

    }

    if(nova !== confirmar){

        mostrarMensagem("As senhas não coincidem.");

        return false;

    }

    localStorage.setItem("senhaSistema", nova);

    return true;

}



//==================================================
// MODO ESCURO
//==================================================

const chkModoEscuro = document.getElementById("modoEscuro");

chkModoEscuro.addEventListener("change",()=>{

    if(chkModoEscuro.checked){

        document.body.classList.add("dark");

    }else{

        document.body.classList.remove("dark");

    }

});



//==================================================
// CARREGAR MODO ESCURO
//==================================================

window.addEventListener("load",()=>{

    if(preferencias.modoEscuro){

        document.body.classList.add("dark");

    }

});



//==================================================
// TOAST
//==================================================

function mostrarMensagem(texto){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerHTML=`

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
// LOGO
//==================================================

window.addEventListener("load",()=>{

    if(empresa.logo){

        imagemLogo = empresa.logo;

    }

});



//==================================================
// ANIMAÇÃO DAS BOXES
//==================================================

window.addEventListener("load",()=>{

    const boxes=document.querySelectorAll(".box");

    boxes.forEach((box,index)=>{

        box.style.opacity="0";

        box.style.transform="translateY(30px)";

        setTimeout(()=>{

            box.style.transition=".5s";

            box.style.opacity="1";

            box.style.transform="translateY(0px)";

        },index*150);

    });

});



//==================================================
// SALVAR SENHA JUNTO COM AS CONFIGURAÇÕES
//==================================================

btnSalvar.addEventListener("click",(e)=>{

    e.preventDefault();

    if(!validarSenha()){

        return;

    }

    salvarEmpresa();

    salvarUsuario();

    salvarPreferencias();

    mostrarMensagem("Configurações salvas com sucesso!");

});