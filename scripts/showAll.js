function getGoblins() {

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let goblins = JSON.parse(this.responseText);
            console.log(goblins);
            createHTML(goblins)
        }
    };

    xhttp.open('GET', 'http://localhost:8080/api/goblins/', true);
    xhttp.setRequestHeader('Accept', 'application/json');

    xhttp.send();
}

function createHTML(goblins) {
    let tbody = document.getElementById("goblinsTableBody");
    for (let i = 0; i < goblins.length; i++) {
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        let td1 = document.createElement('td');
        tr.appendChild(td1);
        let td2 = document.createElement('td');
        tr.appendChild(td2);
        let goblinName = document.createTextNode(goblins[i].name);
        let goblinAge = document.createTextNode(goblins[i].age);
        td1.appendChild(goblinAge);
        td2.appendChild(goblinName);
        let td3 = document.createElement('td');
        tr.appendChild(td1);
        let td4 = document.createElement('td');
        let link = document.createElement('a');
        link.appendChild(td3);
        link.href = '../html/edit.html';
        tr.appendChild(link);
        tr.appendChild(td4);

        let editButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        let text1 = document.createTextNode('edit');
        let text2 = document.createTextNode('delete');

        editButton.appendChild(text1);
        deleteButton.appendChild(text2);
        td3.appendChild(editButton);
        td4.appendChild(deleteButton);

        deleteButton.addEventListener('click', (e) => {
            deleteGoblin(goblins[i]);
        });
        editButton.addEventListener('click', (e) => {
            localStorage.setItem('idGoblin', goblins[i].id);
        })
    }
}
function deleteGoblin(goblin){
    let xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', 'http://localhost:8080/api/goblins/' + goblin.id, true);
    xhttp.setRequestHeader("Authorization", `Basic ${localStorage.getItem('auth')}`);
    xhttp.send();
    window.location.reload(true);
}


window.onload = function (e) {
    getGoblins();
    generateLogged();
}
