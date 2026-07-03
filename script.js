document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // ALERTA DE LOGIN (INDEX)
    // =========================
    const loginForm = document.querySelector(".login");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = loginForm.querySelector("input[type='email']").value;
            const senha = loginForm.querySelector("input[type='password']").value;

            if (email === "" || senha === "") {
                alert("Preencha todos os campos!");
                return;
            }

            // Simulação de login
            alert("Login realizado com sucesso!");

            // redireciona para dashboard
            window.location.href = "dashboard.html";
        });
    }

    // =========================
    // BOTÕES (NOVO / AÇÕES)
    // =========================

    const botoesExcluir = document.querySelectorAll(".excluir");

    botoesExcluir.forEach(btn => {
        btn.addEventListener("click", function () {
            const confirmar = confirm("Tem certeza que deseja excluir este item?");

            if (confirmar) {
                alert("Item excluído (simulação)");
            }
        });
    });

    const botoesEditar = document.querySelectorAll(".editar");

    botoesEditar.forEach(btn => {
        btn.addEventListener("click", function () {
            alert("Função de edição em desenvolvimento...");
        });
    });

    // =========================
    // PESQUISA SIMPLES
    // =========================

    const pesquisa = document.querySelector(".pesquisa input");

    if (pesquisa) {
        pesquisa.addEventListener("keyup", function () {
            const valor = this.value.toLowerCase();
            const linhas = document.querySelectorAll("table tbody tr");

            linhas.forEach(linha => {
                const texto = linha.innerText.toLowerCase();

                if (texto.includes(valor)) {
                    linha.style.display = "";
                } else {
                    linha.style.display = "none";
                }
            });
        });
    }

    // =========================
    // MENU ATIVO (DESTAQUE)
    // =========================

    const links = document.querySelectorAll(".sidebar ul li");

    links.forEach(link => {
        link.addEventListener("click", function () {
            links.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

});