const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();


//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e) {;
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const sessionCheck = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Usuário ou senha inválidas.");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Usuario ou senha inválidas.")
            return;
        } 

        saveSession(email, sessionCheck); 

        window.location.href = "home.html";
    }
} );


//CRIAR CONTA
    document.getElementById("register-form").addEventListener("submit", function(e) { 
    e.preventDefault();

    const email = document.getElementById("email-modal").value;
    const password = document.getElementById("password-modal").value;


    if(email.length < 5) {
        alert("E-mail inválido, por favor insira um endereço de e-mail válido")
        return;
    }

    if(password.length < 6) {
        alert("A sua senha deve ter, no mínimo, 6 dígitos. Por favor, insira uma senha cumprindo os requisitos.")
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    } );

    myModal.hide();

    alert("Conta criada com sucesso.");
} );

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session)

        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
     if(saveSession) {
         localStorage.setItem("session", data);
     }

     sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}
