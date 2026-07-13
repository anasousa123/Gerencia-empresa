//==================================================
// NEXUS ERP
// MÓDULO SITE
//==================================================

//==============================
// ELEMENTOS
//==============================

const form = document.getElementById("formSite");

const empresa = document.getElementById("empresa");
const slogan = document.getElementById("slogan");
const whatsapp = document.getElementById("whatsapp");
const telefone = document.getElementById("telefone");
const instagram = document.getElementById("instagram");
const facebook = document.getElementById("facebook");
const endereco = document.getElementById("endereco");
const horario = document.getElementById("horario");
const taxa = document.getElementById("taxa");
const pix = document.getElementById("pix");
const cor = document.getElementById("cor");

//==============================
// CARREGAR DADOS
//==============================

const dados = JSON.parse(localStorage.getItem("empresa")) || {};

empresa.value = dados.empresa || "";
slogan.value = dados.slogan || "";
whatsapp.value = dados.whatsapp || "";
telefone.value = dados.telefone || "";
instagram.value = dados.instagram || "";
facebook.value = dados.facebook || "";
endereco.value = dados.endereco || "";
horario.value = dados.horario || "";
taxa.value = dados.taxa || "";
pix.value = dados.pix || "";
cor.value = dados.cor || "#2563EB";

//==============================
// SALVAR
//==============================

form.addEventListener("submit", function(e){

    e.preventDefault();

    const empresaDados = {

        empresa: empresa.value,
        slogan: slogan.value,
        whatsapp: whatsapp.value,
        telefone: telefone.value,
        instagram: instagram.value,
        facebook: facebook.value,
        endereco: endereco.value,
        horario: horario.value,
        taxa: taxa.value,
        pix: pix.value,
        cor: cor.value

    };

    localStorage.setItem(
        "empresa",
        JSON.stringify(empresaDados)
    );

    alert("Informações salvas com sucesso!");

});
//==============================
// RESUMO
//==============================

function mostrarResumo(){

    console.log("===== DADOS DA EMPRESA =====");

    console.log("Empresa:", empresa.value);

    console.log("WhatsApp:", whatsapp.value);

    console.log("Telefone:", telefone.value);

    console.log("Instagram:", instagram.value);

    console.log("PIX:", pix.value);

}

mostrarResumo();