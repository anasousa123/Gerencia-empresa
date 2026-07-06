// Recuperar pedidos do localStorage
function getPedidos() {
    return JSON.parse(localStorage.getItem("pedidos")) || [];
}

// Salvar pedidos no localStorage
function savePedidos(pedidos) {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

// Adicionar novo pedido
function adicionarPedido() {
    const nomeCliente = document.getElementById("cliente").value;
    const item = document.getElementById("item").value;
    const quantidade = document.getElementById("quantidade").value;

    if (!nomeCliente || !item || !quantidade) {
        alert("Preencha todos os campos!");
        return;
    }

    const pedidos = getPedidos();

    const novoPedido = {
        id: Date.now(),
        cliente: nomeCliente,
        item: item,
        quantidade: quantidade,
        status: "Pendente"
    };

    pedidos.push(novoPedido);
    savePedidos(pedidos);

    limparCampos();
    listarPedidos();
}

// Limpar campos do formulário
function limparCampos() {
    document.getElementById("cliente").value = "";
    document.getElementById("item").value = "";
    document.getElementById("quantidade").value = "";
}
// Listar pedidos na tela
function listarPedidos() {
    const lista = document.getElementById("listaPedidos");
    const pedidos = getPedidos();

    lista.innerHTML = "";

    pedidos.forEach((pedido) => {
        const card = document.createElement("div");
        card.classList.add("pedido-card");

        card.innerHTML = `
            <h3>Cliente: ${pedido.cliente}</h3>
            <p>Item: ${pedido.item}</p>
            <p>Quantidade: ${pedido.quantidade}</p>
            <p>Status: <strong>${pedido.status}</strong></p>

            <button onclick="concluirPedido(${pedido.id})">Concluir</button>
            <button onclick="cancelarPedido(${pedido.id})">Cancelar</button>
        `;

        lista.appendChild(card);
    });
}

// Concluir pedido
function concluirPedido(id) {
    const pedidos = getPedidos();

    const index = pedidos.findIndex(p => p.id === id);

    if (index !== -1) {
        pedidos[index].status = "Concluído";
        savePedidos(pedidos);
        listarPedidos();
    }
}

// Cancelar pedido
function cancelarPedido(id) {
    let pedidos = getPedidos();

    pedidos = pedidos.filter(p => p.id !== id);

    savePedidos(pedidos);
    listarPedidos();
}

// Filtrar pedidos por status
function filtrarPedidos(status) {
    const lista = document.getElementById("listaPedidos");
    const pedidos = getPedidos();

    lista.innerHTML = "";

    const filtrados = status === "Todos"
        ? pedidos
        : pedidos.filter(p => p.status === status);

    filtrados.forEach((pedido) => {
        const card = document.createElement("div");
        card.classList.add("pedido-card");

        card.innerHTML = `
            <h3>Cliente: ${pedido.cliente}</h3>
            <p>Item: ${pedido.item}</p>
            <p>Quantidade: ${pedido.quantidade}</p>
            <p>Status: <strong>${pedido.status}</strong></p>

            <button onclick="concluirPedido(${pedido.id})">Concluir</button>
            <button onclick="cancelarPedido(${pedido.id})">Cancelar</button>
        `;

        lista.appendChild(card);
    });
}

// Contador de pedidos
function atualizarContadores() {
    const pedidos = getPedidos();

    const total = pedidos.length;
    const pendentes = pedidos.filter(p => p.status === "Pendente").length;
    const concluidos = pedidos.filter(p => p.status === "Concluído").length;

    document.getElementById("totalPedidos").innerText = total;
    document.getElementById("pedidosPendentes").innerText = pendentes;
    document.getElementById("pedidosConcluidos").innerText = concluidos;
}

// Recarregar tudo (lista + contador)
function atualizarPedidos() {
    listarPedidos();
    atualizarContadores();
}

// Atualizar automaticamente ao iniciar página
document.addEventListener("DOMContentLoaded", atualizarPedidos);