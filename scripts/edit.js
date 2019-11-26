function getGoblin() {

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let goblin = JSON.parse(this.responseText);
            console.log(goblin);
            editGoblin(goblin);
            createWeapons(goblin);
        }
    };

    xhttp.open('GET', 'http://localhost:8080/api/goblins/' + localStorage.getItem('idGoblin'));
    xhttp.setRequestHeader('Accept', 'application/json');
    xhttp.send();
}

function editGoblin(goblin) {
    document.getElementById('goblinName').value = goblin.name;
    document.getElementById('goblinAge').value = goblin.age;
    let buttonSave = document.getElementById('editGoblin');

    buttonSave.addEventListener('click', (e) => {
        let name = document.getElementById('goblinName').value;
        let age = document.getElementById('goblinAge').value;

        let xhttp = new XMLHttpRequest();

        xhttp.open('PUT', 'http://localhost:8080/api/goblins/'
            + localStorage.getItem('idGoblin'), true);

        xhttp.setRequestHeader("Authorization", `Basic ${localStorage.getItem('auth')}`);
        xhttp.setRequestHeader('Content-type', 'application/json');
        let expense = {id: localStorage.getItem('idGoblin'), name: name, age: age};
        xhttp.send(JSON.stringify(expense));
    })
}

function createWeapons(goblin) {
    let tbody = document.getElementById("goblinsWeapon");
    for (let i = 0; i < goblin.weapons.length; i++) {
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        let td1 = document.createElement('td');
        tr.appendChild(td1);
        let td2 = document.createElement('td');
        tr.appendChild(td2);
        let goblinName = document.createTextNode(goblin.weapons[i].name);
        let goblinAge = document.createTextNode(goblin.weapons[i].power);
        td1.appendChild(goblinName);
        td2.appendChild(goblinAge);
        let td3 = document.createElement('td');
        tr.appendChild(td3);

        let deleteButton = document.createElement('button');
        let text2 = document.createTextNode('delete');

        deleteButton.appendChild(text2);
        td3.appendChild(deleteButton);
        deleteButton.addEventListener('click', (e) => {
            deleteWeapon(goblin.weapons[i].id);
        });

    }
}

function deleteWeapon(i) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', 'http://localhost:8080/api/goblins/' + localStorage.getItem('idGoblin') + '/weapons/' + i, true
    )
    ;
    xhttp.setRequestHeader("Authorization", `Basic ${localStorage.getItem('auth')}`);
    xhttp.send();
    window.location.reload(true);
}
addButton = document.getElementById('add');
addButton.addEventListener('click', (e) => {
    showPopout();
});
saveButton = document.getElementById('save');
saveButton.addEventListener('click', (e) => {
    saveWeapon();
});

function showPopout(){
    document.getElementById('addDialog').style.display = 'block';
}

function saveWeapon(){
    let name = document.getElementById('nameWeapon').value;
    let power = document.getElementById('powerWeapon').value;
    let xhttp = new XMLHttpRequest();

    xhttp.open('POST', 'http://localhost:8080/api/goblins/' + localStorage.getItem('idGoblin') + '/weapons/', true);

    xhttp.setRequestHeader("Authorization", `Basic ${localStorage.getItem('auth')}`);
    xhttp.setRequestHeader('Content-type', 'application/json');
    let expense = { name: name, power: power};
    xhttp.send(JSON.stringify(expense));
}

window.onload = function (e) {
    getGoblin();
    generateLogged();
}
