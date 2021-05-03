const socket_io = io('http://localhost:3000', { transports : ['websocket'] });

var message_container = document.getElementById('chat-message-container');
var message_input = document.getElementById('chat-message-input');
var send_button = document.getElementById('send-chat-message-button');
if (!message_input || !send_button) alert('Dom Structure Issue');

const username = prompt('Enter your name');

socket_io.on('get-message', (message) => {
    createMessageElement(message, 'recieved');
});

document.getElementById('send-message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    onSend();
}, false);

send_button.addEventListener('click', (event) => {
    event.preventDefault();
    onSend();
});

function onSend() {
    if (!message_input.value) return;

    const message_value = message_input.value;
    const message = { username, message: message_value };
    socket_io.emit('send-message', message);
    message_input.value = '';
    createMessageElement(message, 'sent');
}

function createMessageElement(message, message_class) {
    let message_elem = document.createElementNS("http://www.w3.org/1999/xhtml", 'div');
    message_elem.innerText = message.username + ': ' + message.message ;
    message_elem.classList.add(message_class, 'message');
    message_container.append(message_elem);
}