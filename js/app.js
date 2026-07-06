// ===============================
// SMART BURGER - APP PRINCIPAL
// ===============================

// Inicialização geral do sistema
document.addEventListener("DOMContentLoaded", function () {
    console.log("🍔 Smart Burger iniciado com sucesso!");

    inicializarSistema();
});

// Função principal de inicialização
function inicializarSistema() {
    atualizarResumoGlobal();
}

// ===============================
// RESUMO GERAL DO SISTEMA
// ===============================

function atualizarResumoGlobal() {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

    const pendentes = pedidos.filter(p => p.status === "Pendente").length;
    const concluidos = pedidos.filter(p => p.status === "Concluído").length;

    // Atualiza elementos globais (se existirem na página)
    if (document.getElementById("resTotalProdutos")) {
        document.getElementById("resTotalProdutos").innerText = produtos.length;
    }

    if (document.getElementById("resTotalPedidos")) {
        document.getElementById("resTotalPedidos").innerText = pedidos.length;
    }

    if (document.getElementById("resPendentes")) {
        document.getElementById("resPendentes").innerText = pendentes;
    }

    if (document.getElementById("resConcluidos")) {
        document.getElementById("resConcluidos").innerText = concluidos;
    }

    if (document.getElementById("resFornecedores")) {
        document.getElementById("resFornecedores").innerText = fornecedores.length;
    }
}

// ===============================
// LIMPAR DADOS (RESET DO SISTEMA)
// ===============================

function resetarSistema() {
    const confirmar = confirm("Deseja realmente apagar todos os dados do sistema?");

    if (confirmar) {
        localStorage.removeItem("produtos");
        localStorage.removeItem("pedidos");
        localStorage.removeItem("fornecedores");

        alert("Sistema resetado com sucesso!");

        location.reload();
    }
}