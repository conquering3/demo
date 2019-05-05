
// 引入console输出状态
require('console-status')();

const app = require('./app'),
    config = require('./config');


const server = app.listen(config.server.port);


server.on('listening', (err) => {
    console.log('listening port: ', config.server.port);
});

app.on('error', (err, ctx) => {
    console.log(err);
    ctx.body = {
        message: err.message
    }
});
