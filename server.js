const io = require('socket.io')(3000);

io.on('connection', (socket) => {
    socket.emit('get-message', { username: 'Server', message:'Hello Client!' });
    console.log('New User');

    /* On receiving message, broadcast it */
    socket.on('send-message', message => {
        console.log(message);
        socket.broadcast.emit('get-message', message);
    });
});