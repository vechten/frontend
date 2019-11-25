let login;
let password;
let buttonLogin = document.getElementById('buttonLogin');
let buttonLogout = document.getElementById('buttonLogout');
let buttonAdd = document.getElementById('addGoblin');

function getLogin() {
    return localStorage.getItem('user');
}

function onLogin() {
    localStorage.setItem('user', login);
    localStorage.setItem('password', password)
}

function onLogOut() {
    localStorage.removeItem('user');
    login = undefined;
    localStorage.removeItem('password');
    password = undefined;
}

function isLogged() {
    if (localStorage.getItem('user')) {
        return true;
    }
    return false;
}

buttonLogin.addEventListener("click", () => {
    document.getElementById('unlogged').style.zIndex = "-1";
    document.getElementById('logged').style.zIndex = '1';
    login = document.getElementById('login').value;
    password = document.getElementById('password').value;
    onLogin();
    let auth = btoa(login + ":" + password);
    window.localStorage.setItem('auth', auth);
    document.getElementById('userName').innerHTML = `WELCOME BACK ${login}`;
});

buttonLogout.addEventListener("click", () => {
    document.getElementById('unlogged').style.zIndex = "1";
    document.getElementById('logged').style.zIndex = '-1';
    onLogOut();
    document.getElementById('login').value = '';
    document.getElementById('password').value = '';
});


function generateLogged() {
    if (isLogged()) {
        document.getElementById('unlogged').style.zIndex = "-1";
        document.getElementById('logged').style.zIndex = '1';
        document.getElementById('userName').innerHTML = `WELCOME BACK ${getLogin()}`;
    } else {
        document.getElementById('unlogged').style.zIndex = "1";
        document.getElementById('logged').style.zIndex = '-1';
    }

}



window.onload = function (e) {
    generateLogged();
}
