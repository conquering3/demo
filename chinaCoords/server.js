const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = require('./router');    
const server = app.listen('8088', () => {
    console.log(server.address());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json())
    
    // 静态文件访问
    app.use(express.static('./'));

    // 路由
    router(app, __dirname);
});
// require('./getCoords')();