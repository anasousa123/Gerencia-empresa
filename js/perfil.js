//==================================================
// SMART BURGUER ERP
// PERFIL.JS
//==================================================

//==========================================
// ELEMENTOS
//==========================================

const btnSalvar = document.getElementById("btnSalvar");

const trocarFoto = document.getElementById("trocarFoto");

const fotoUsuario = document.getElementById("fotoUsuario");

const nome = document.getElementById("nome");

const email = document.getElementById("email");

const telefone = document.getElementById("telefone");

const cep = document.getElementById("cep");

const cidade = document.getElementById("cidade");

const estado = document.getElementById("estado");

const bairro = document.getElementById("bairro");

const rua = document.getElementById("rua");

const numero = document.getElementById("numero");

const senhaAtual = document.getElementById("senhaAtual");

const novaSenha = document.getElementById("novaSenha");

const confirmarSenha = document.getElementById("confirmarSenha");

//==========================================
// TROCAR FOTO
//==========================================

const inputFoto = document.createElement("input");

inputFoto.type = "file";

inputFoto.accept = "image/*";

inputFoto.style.display = "none";

document.body.appendChild(inputFoto);

trocarFoto.addEventListener("click", () => {

    inputFoto.click();

});

inputFoto.addEventListener("change", () => {

    const arquivo = inputFoto.files[0];

    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = function (e) {

        fotoUsuario.src = e.target.result;

        localStorage.setItem("fotoPerfil", e.target.result);

    };

    leitor.readAsDataURL(arquivo);

});

//==========================================
// CARREGAR FOTO
//==========================================

const fotoSalva = localStorage.getItem("fotoPerfil");

if (fotoSalva) {

    fotoUsuario.src = fotoSalva;

}

//==========================================
// MENSAGEM
//==========================================

function mostrarMensagem(texto, cor = "#22c55e") {

    let toast = document.querySelector(".toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = texto;

    toast.style.background = cor;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}
//==================================================
// SMART BURGUER ERP
// PERFIL.JS - PARTE 2
//==================================================

//==========================================
// SALVAR DADOS
//==========================================

btnSalvar.addEventListener("click", salvarPerfil);

function salvarPerfil(){

    const usuario = {

        nome: nome.value.trim(),

        email: email.value.trim(),

        telefone: telefone.value.trim(),

        cep: cep.value.trim(),

        cidade: cidade.value.trim(),

        estado: estado.value.trim(),

        bairro: bairro.value.trim(),

        rua: rua.value.trim(),

        numero: numero.value.trim()

    };

    localStorage.setItem(

        "usuarioERP",

        JSON.stringify(usuario)

    );

    document.getElementById("nomePerfil").textContent = usuario.nome;

    mostrarMensagem("Perfil salvo com sucesso!");

}

//==========================================
// CARREGAR DADOS
//==========================================

function carregarPerfil(){

    const dados = localStorage.getItem("usuarioERP");

    if(!dados) return;

    const usuario = JSON.parse(dados);

    nome.value = usuario.nome || "";

    email.value = usuario.email || "";

    telefone.value = usuario.telefone || "";

    cep.value = usuario.cep || "";

    cidade.value = usuario.cidade || "";

    estado.value = usuario.estado || "";

    bairro.value = usuario.bairro || "";

    rua.value = usuario.rua || "";

    numero.value = usuario.numero || "";

    document.getElementById("nomePerfil").textContent = usuario.nome || "Usuário";

}

carregarPerfil();

//==========================================
// ALTERAÇÃO DE SENHA
//==========================================

function alterarSenha(){

    if(

        senhaAtual.value === "" ||

        novaSenha.value === "" ||

        confirmarSenha.value === ""

    ){

        return;

    }

    if(novaSenha.value.length < 6){

        mostrarMensagem(

            "A senha deve possuir no mínimo 6 caracteres.",

            "#ef4444"

        );

        return;

    }

    if(novaSenha.value !== confirmarSenha.value){

        mostrarMensagem(

            "As senhas não coincidem.",

            "#ef4444"

        );

        return;

    }

    localStorage.setItem(

        "senhaERP",

        novaSenha.value

    );

    senhaAtual.value = "";

    novaSenha.value = "";

    confirmarSenha.value = "";

    mostrarMensagem("Senha alterada com sucesso!");

}

confirmarSenha.addEventListener("blur", alterarSenha);

//==========================================
// BUSCAR CEP
//==========================================

cep.addEventListener("blur", ()=>{

    if(cep.value.length < 8){

        return;

    }

    fetch(`https://viacep.com.br/ws/${cep.value}/json/`)

    .then(res=>res.json())

    .then(endereco=>{

        cidade.value = endereco.localidade || "";

        estado.value = endereco.uf || "";

        bairro.value = endereco.bairro || "";

        rua.value = endereco.logradouro || "";

    })

    .catch(()=>{

        mostrarMensagem(

            "CEP não encontrado.",

            "#ef4444"

        );

    });

});

//==========================================
// MODO ESCURO
//==========================================

const checkTema = document.querySelectorAll("input[type='checkbox']")[2];

if(checkTema){

    const tema = localStorage.getItem("temaERP");

    if(tema === "escuro"){

        document.body.classList.add("dark");

        checkTema.checked = true;

    }

    checkTema.addEventListener("change",()=>{

        if(checkTema.checked){

            document.body.classList.add("dark");

            localStorage.setItem("temaERP","escuro");

        }else{

            document.body.classList.remove("dark");

            localStorage.setItem("temaERP","claro");

        }

    });

}

//==========================================
// INICIALIZAÇÃO
//==========================================

window.addEventListener("load",()=>{

    carregarPerfil();

});