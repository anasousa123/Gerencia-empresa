// ======================================================
// SMART BURGUER ERP
// CONFIGURAÇÕES
// ======================================================

// ==========================================
// ELEMENTOS
// ==========================================

const formEmpresa = document.getElementById("formEmpresa");
const formUsuario = document.getElementById("formUsuario");
const formSenha = document.getElementById("formSenha");

const btnSalvar = document.getElementById("salvarConfiguracoes");

const logoEmpresa = document.getElementById("logoEmpresa");

let imagemLogo = "";

// ==========================================
// LOCAL STORAGE
// ==========================================

let empresa =
JSON.parse(localStorage.getItem("empresa")) || {};

let usuario =
JSON.parse(localStorage.getItem("usuario")) || {};

let preferencias =
JSON.parse(localStorage.getItem("preferencias")) || {};

// ==========================================
// CARREGAR DADOS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    carregarEmpresa();

    carregarUsuario();

    carregarPreferencias();

    aplicarModoEscuro();

    animarBoxes();

});

// ==========================================
// CARREGAR EMPRESA
// ==========================================

function carregarEmpresa(){

    document.getElementById("nomeEmpresa").value =
    empresa.nome || "";

    document.getElementById("razaoSocial").value =
    empresa.razaoSocial || "";

    document.getElementById("cnpjEmpresa").value =
    empresa.cnpj || "";

    document.getElementById("ieEmpresa").value =
    empresa.ie || "";

    document.getElementById("telefoneEmpresa").value =
    empresa.telefone || "";

    document.getElementById("whatsappEmpresa").value =
    empresa.whatsapp || "";

    document.getElementById("emailEmpresa").value =
    empresa.email || "";

    document.getElementById("siteEmpresa").value =
    empresa.site || "";

    document.getElementById("cepEmpresa").value =
    empresa.cep || "";

    document.getElementById("cidadeEmpresa").value =
    empresa.cidade || "";

    document.getElementById("estadoEmpresa").value =
    empresa.estado || "";

    document.getElementById("enderecoEmpresa").value =
    empresa.endereco || "";

    document.getElementById("instagramEmpresa").value =
    empresa.instagram || "";

    document.getElementById("facebookEmpresa").value =
    empresa.facebook || "";

    document.getElementById("tiktokEmpresa").value =
    empresa.tiktok || "";

    document.getElementById("linkedinEmpresa").value =
    empresa.linkedin || "";

    imagemLogo = empresa.logo || "";

}

// ==========================================
// SALVAR EMPRESA
// ==========================================

function salvarEmpresa(){

    empresa = {

        nome:
        document.getElementById("nomeEmpresa").value,

        razaoSocial:
        document.getElementById("razaoSocial").value,

        cnpj:
        document.getElementById("cnpjEmpresa").value,

        ie:
        document.getElementById("ieEmpresa").value,

        telefone:
        document.getElementById("telefoneEmpresa").value,

        whatsapp:
        document.getElementById("whatsappEmpresa").value,

        email:
        document.getElementById("emailEmpresa").value,

        site:
        document.getElementById("siteEmpresa").value,

        cep:
        document.getElementById("cepEmpresa").value,

        cidade:
        document.getElementById("cidadeEmpresa").value,

        estado:
        document.getElementById("estadoEmpresa").value,

        endereco:
        document.getElementById("enderecoEmpresa").value,

        instagram:
        document.getElementById("instagramEmpresa").value,

        facebook:
        document.getElementById("facebookEmpresa").value,

        tiktok:
        document.getElementById("tiktokEmpresa").value,

        linkedin:
        document.getElementById("linkedinEmpresa").value,

        logo:
        imagemLogo

    };

    localStorage.setItem(

        "empresa",

        JSON.stringify(empresa)

    );

}

// ==========================================
// UPLOAD DA LOGO
// ==========================================

if(logoEmpresa){

    logoEmpresa.addEventListener("change",(e)=>{

        const arquivo = e.target.files[0];

        if(!arquivo) return;

        const reader = new FileReader();

        reader.onload=(evento)=>{

            imagemLogo = evento.target.result;

        }

        reader.readAsDataURL(arquivo);

    });

}
// ==========================================
// CARREGAR USUÁRIO
// ==========================================

function carregarUsuario(){

    document.getElementById("nomeUsuario").value =
    usuario.nome || "";

    document.getElementById("emailUsuario").value =
    usuario.email || "";

    document.getElementById("usuarioSistema").value =
    usuario.login || "";

    document.getElementById("cargoUsuario").value =
    usuario.cargo || "Administrador";

}

// ==========================================
// SALVAR USUÁRIO
// ==========================================

function salvarUsuario(){

    usuario = {

        nome:
        document.getElementById("nomeUsuario").value,

        email:
        document.getElementById("emailUsuario").value,

        login:
        document.getElementById("usuarioSistema").value,

        cargo:
        document.getElementById("cargoUsuario").value

    };

    localStorage.setItem(

        "usuario",

        JSON.stringify(usuario)

    );

}

// ==========================================
// CARREGAR PREFERÊNCIAS
// ==========================================

function carregarPreferencias(){

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

// ==========================================
// SALVAR PREFERÊNCIAS
// ==========================================

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

// ==========================================
// ALTERAR SENHA
// ==========================================

function validarSenha(){

    const atual =
    document.getElementById("senhaAtual").value;

    const nova =
    document.getElementById("novaSenha").value;

    const confirmar =
    document.getElementById("confirmarSenha").value;

    // Nenhuma senha informada
    if(
        atual === "" &&
        nova === "" &&
        confirmar === ""
    ){
        return true;
    }

    // Nova senha pequena
    if(nova.length < 6){

        mostrarMensagem(
            "A senha deve possuir no mínimo 6 caracteres."
        );

        return false;

    }

    // Confirmação incorreta
    if(nova !== confirmar){

        mostrarMensagem(
            "As senhas não coincidem."
        );

        return false;

    }

    localStorage.setItem(

        "senhaSistema",

        nova

    );

    return true;

}

// ==========================================
// MODO ESCURO
// ==========================================

const chkModoEscuro =
document.getElementById("modoEscuro");

if(chkModoEscuro){

    chkModoEscuro.addEventListener("change",()=>{

        if(chkModoEscuro.checked){

            document.body.classList.add("dark");

        }else{

            document.body.classList.remove("dark");

        }

    });

}

function aplicarModoEscuro(){

    if(preferencias.modoEscuro){

        document.body.classList.add("dark");

    }else{

        document.body.classList.remove("dark");

    }

}
// ==========================================
// BOTÃO SALVAR CONFIGURAÇÕES
// ==========================================

if(btnSalvar){

    btnSalvar.addEventListener("click",(e)=>{

        e.preventDefault();

        if(!validarSenha()){
            return;
        }

        salvarEmpresa();

        salvarUsuario();

        salvarPreferencias();

        aplicarModoEscuro();

        mostrarMensagem(
            "Configurações salvas com sucesso!"
        );

    });

}

// ==========================================
// FORMULÁRIO EMPRESA
// ==========================================

if(formEmpresa){

    formEmpresa.addEventListener("submit",(e)=>{

        e.preventDefault();

        salvarEmpresa();

        mostrarMensagem(
            "Dados da empresa atualizados!"
        );

    });

}

// ==========================================
// FORMULÁRIO USUÁRIO
// ==========================================

if(formUsuario){

    formUsuario.addEventListener("submit",(e)=>{

        e.preventDefault();

        salvarUsuario();

        mostrarMensagem(
            "Dados do usuário atualizados!"
        );

    });

}

// ==========================================
// FORMULÁRIO SENHA
// ==========================================

if(formSenha){

    formSenha.addEventListener("submit",(e)=>{

        e.preventDefault();

        if(validarSenha()){

            mostrarMensagem(
                "Senha alterada com sucesso!"
            );

            formSenha.reset();

        }

    });

}

// ==========================================
// TOAST
// ==========================================

function mostrarMensagem(texto){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `

        <i class="fa-solid fa-circle-check"></i>

        <span>${texto}</span>

    `;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("mostrar");

    },100);

    setTimeout(()=>{

        toast.classList.remove("mostrar");

    },3000);

    setTimeout(()=>{

        toast.remove();

    },3400);

}

// ==========================================
// ANIMAÇÃO DAS BOXES
// ==========================================

function animarBoxes(){

    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box,index)=>{

        box.style.opacity = "0";

        box.style.transform = "translateY(25px)";

        setTimeout(()=>{

            box.style.transition = ".5s ease";

            box.style.opacity = "1";

            box.style.transform = "translateY(0)";

        },index * 120);

    });

}

// ==========================================
// SALVAR AUTOMATICAMENTE PREFERÊNCIAS
// ==========================================

document.querySelectorAll("input[type='checkbox']").forEach(item=>{

    item.addEventListener("change",()=>{

        salvarPreferencias();

        aplicarModoEscuro();

    });

});

// ==========================================
// PROTEÇÃO CONTRA TELA BRANCA
// ==========================================

window.onerror = function(mensagem,arquivo,linha){

    console.error("Erro:", mensagem);

    console.error("Arquivo:", arquivo);

    console.error("Linha:", linha);

};

// ==========================================
// FIM DO ARQUIVO
// ==========================================

console.log("✅ Configurações carregadas com sucesso.");