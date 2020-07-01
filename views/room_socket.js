const socket = io();
let userid = sessionStorage.getItem("userid");
$('form').submit(() => {
    let message = $('#m').val();
    socket.emit('message', {id: userid, message, username, room: roomID});
    $('#m').val('');
    return false;
});

let messageUL = $('#messages');
let usersUL = $('#users');

function leave() {
    socket.emit('bye', {id: userid, room: roomID, username: username});
    document.location.href = "/";
}

socket.on('connect', () => {
    socket.emit('join', {id: userid, room: roomID, username: username});
});

socket.on('disconnecting', () => {
    socket.emit('bye', {id: userid, room: roomID, username: username});
});

socket.on('user joined', (data) => {
    $('#count').text(data.people.length === 1 ? "1 person" : `${data.people.length} people`);
    messageUL.append(`<li class="alert alert-success">${data.username} <span class="badge badge-secondary">@${data.id}</span> has entered the chat.</li>`);
    usersUL.text("");
    for (let x of data.people) {
        usersUL.append(`<li class="list-group-item">${x.username} <span class="badge badge-secondary">@${x.id}</span></li>`);
    }
});

socket.on('user left', (data) => {
    $('#count').text(data.people.length === 1 ? "1 person" : `${data.people.length} people`);
    messageUL.append(`<li class="alert alert-danger">${data.username} <span class="badge badge-secondary">@${data.id}</span> has left the chat.</li>`);
    usersUL.text("");
    for (let x of data.people) {
        usersUL.append(`<li class="list-group-item">${x.username} <span class="badge badge-secondary">@${x.id}</span></li>`);
    }
});

socket.on('message', (data) => {
    messageUL.append(`<li><b>${data.username}</b> <span class="badge badge-secondary">@${data.id}</span>: ${data.message}</li>`);
    messageUL.scrollTo(messageUL.scrollHeight);
})