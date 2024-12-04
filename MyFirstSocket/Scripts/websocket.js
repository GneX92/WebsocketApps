"use strict";

const socket = new WebSocket("ws://127.0.0.1:8081");
let counter = 0;
const users = [];


socket.onopen = function () {
    if (!localStorage.getItem("id").length) {
        localStorage.setItem("id", guid())
    }

    users.push(localStorage.getItem("id"))
    counter++   
    document.getElementById('counter').innerHTML = `Besucher: ${users.length}`;
};

socket.onclose = function () {
    users.splice(users.indexOf(localStorage.getItem("id")), 1);
    counter--;
    document.getElementById('counter').innerHTML = `Besucher: ${users.length}`;
};

socket.onerror = function (event) {
    document.getElementById('log').innerHTML = "Fehler: " + JSON.stringify(event);
};

document.getElementById('message').onblur = function () {
    const message = document.getElementById('message').value;
    const li = document.createElement("li");
    li.innerHTML = message;
    document.getElementById('log').prepend(li);
};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
