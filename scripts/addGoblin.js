function addGoblin() {
    let name = document.getElementById('goblinName').value;
    let age = document.getElementById('goblinAge').value;

    let xhttp = new XMLHttpRequest();

    xhttp.open('POST', 'http://localhost:8080/api/goblins/', true);

    xhttp.setRequestHeader("Authorization", `Basic ${localStorage.getItem('auth')}`);
    xhttp.setRequestHeader('Content-type', 'application/json');
    let expense = {name: name, age: age};

    xhttp.send(JSON.stringify(expense));
}

buttonAdd.addEventListener('click', () => addGoblin());
