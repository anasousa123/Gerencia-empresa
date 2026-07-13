//==================================================
// NEXUS ERP
// LOGIN
//==================================================

//------------------------------
// ELEMENTOS
//------------------------------

const formLogin = document.getElementById("formLogin");

const email = document.getElementById("email");

const senha = document.getElementById("senha");

const mostrarSenha = document.getElementById("mostrarSenha");

//==================================================
// MOSTRAR / OCULTAR SENHA
//==================================================

mostrarSenha.addEventListener("click", () => {

    if (senha.type === "password") {

        senha.type = "text";

        mostrarSenha.classList.remove("fa-eye");

        mostrarSenha.classList.add("fa-eye-slash");

    } else {

        senha.type = "password";

        mostrarSenha.classList.remove("fa-eye-slash");

        mostrarSenha.classList.add("fa-eye");

    }

});

//==================================================
// LOGIN
//==================================================

formLogin.addEventListener("submit", function(e){

    e.preventDefault();

    const usuario = email.value.trim();

    const password = senha.value.trim();

    if(usuario === ""){

        alert("ana.7410062@aluno.mg.gov.br");

        email.focus();

        return;

    }

    if(password === ""){

        alert("Ana0123");

        senha.focus();

        return;

    }

    // Login de demonstração
    if(
        usuario === "admin@nexuserp.com" &&
        password === "123456"
    ){

        localStorage.setItem("usuarioLogado", "Administrador");

        window.location.href = "pages/dashboard.html";

    }

    else{

        alert("E-mail ou senha incorretos.");

    }

});