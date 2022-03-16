const express = require('express');
const logger = require('morgan');
const static = require('serve-static'); // client.html 실행하기 위함
const path = require('path');
const socketio = require('socket.io');

const app = express();

app.use(logger('dev'));
app.use('/public', static(path.join(__dirname, 'public')));

const server = app.listen(3000, () => { // listen() -> 서버를 키고 서버를 리턴해줌
    console.log('3000번 포트로 서버 실행중...');
});

// cors -> blocked by CORS policy 해결 위한 것
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
}); // 소켓들을 관리해줄 수 있는 io 객체가 생성됨, io 객체 통해서 socket들에 뭔가를 해줄 것임

// socket.request.connection._peername -> client의 정보들이 담겨있는 것
io.sockets.on('connection', (socket) => { // 연결됐을 때 연결된 socket을 받아올 것임
    console.log("connection : " + socket.request.connection._peername); // 연결된 것의 정보를 볼 수 있음(socket으로 요청을 했는데 그 요청에는 어떻게 연결이 됐는지 정보를 출력하는 것)
    socket.remoteAddress = socket.request.connection._peername.address; // client의 주소(::랜카드이름::IP주소 이런 형식으로 나옴)
    console.log(`socket.remoteAddress : ${socket.remoteAddress}`);
    socket.remotePort = socket.request.connection._peername.port;
    console.log(`socket.remotePort : ${socket.remotePort}`);

    socket.on('message', function(message) { // 메시지를 받았을 때의 이벤트
        console.log('message 이벤트를 받았습니다.');
        console.dir(message);
        io.sockets.emit('message', message); // emit() -> 이벤트를 발생시키는 것(message라는 이벤트를 발생시킬 것이고 message 데이터를 넘겨줌)
    });
    // 연결받고 대기하고 있는 것(연결 받고 message 이벤트가 올 때까지), 실제로 메시지를 보내면 메시지 이벤트가 발생하니 그 때  다른 socket들에게 message 이벤트를 다 보내주는 것
});