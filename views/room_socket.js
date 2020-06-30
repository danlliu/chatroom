const socket = io();
$('form').submit(() => {
    let message = $('#m').val();
    socket.emit('message', {message, username, room: roomID});
    $('#m').val('');
    return false;
});

let messageUL = $('#messages');

function leave() {
    socket.emit('bye', {room: roomID, username: username});
    document.location.href = "/";
}

socket.on('connect', () => {
    socket.emit('join', {room: roomID, username: username});
});

socket.on('disconnecting', () => {
    socket.emit('bye', {room: roomID, username: username});
});

socket.on('user joined', (data) => {
    console.log("user joined");
    $('#count').text(data.people === 1 ? "1 person" : `${data.people} people`);
    messageUL.append(`<li class="alert alert-success">${data.username} has entered the chat.</li>`);
});

socket.on('user left', (data) => {
    console.log("user left");
    $('#count').text(data.people === 1 ? "1 person" : `${data.people} people`);
    messageUL.append(`<li class="alert alert-danger">${data.username} has left the chat.</li>`);
});

socket.on('message', (data) => {
    console.log("message");
    messageUL.append(`<li><b>${data.username}:</b> ${data.message}</li>`);
})