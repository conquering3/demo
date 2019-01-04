const http  = require('http'),
    WSS = require('ws').Server;


const app = http.createServer((req, res) => {
    res.end('linked');
}).listen(8888);

app.on('listening', function () {
    console.log(app.address());
});

const wss = new WSS({
    server: app
});

wss.on('connection', (wsConnect) => {
    console.log('ws已连接!');
    // console.log(wsConnect);
    wsConnect.on('message',  (message) => {
        console.log(`客户端-->${message}`);
        wsConnect.send('我已收到你的信息', (err) => {
            err && console.log('消息发送失败-->', err);
        })
    });
    wsConnect.on('close', () => {
        console.log('closed');
    });
});

app.on('upgrade', function (request, socket, head) {
    console.log(request, socket, head);
})