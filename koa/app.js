const Koa = require('koa'),
    logger = require('./libs/logger');
    Router = require('koa2-router'),
    server = require('koa-static-server'),
    Multy = require('Multy'),
    body = require('koa-bodyparser');


const app = new Koa(),
    router = new Router(),
    router2 = new Router();


app.use(Multy())
app.use(server({rootDir: './config',
rootPath: '/web',
index: 'index.js'}));

app.use(body({fallback: true}));

app.use(async (ctx, next) => {
    const start = Date.now();
    
    /* for (let key in ctx) {
        console.log(key);
    }
    console.log(ctx[`query=`]); */
    await next();

    const ms = Date.now() - start;

    ctx.set('x-response-time', `${ms}ms`);
});

app.use((ctx, next) => {
    console.log(ctx.request.body);
    next();
});

app.use(logger());


router.get('/user', (ctx) => {
    ctx.body = '123';
});
router.post('/user', (ctx) => {
    ctx.body = '123';
});
router2.use('/user', router);

app.use(router2);
// 特殊处理
app.use((ctx) => {
    if (ctx.status == 404) {
        ctx.body = {
            status: 404,
            message: ctx.message
        }
    }
    ctx.redirect('/web/index.js');
});
/* app.use(router2.allowedMethods({
    throw: true,
    notImplemented: () => '3123',
    methodNotAllowed: () => 'not found2'}));
app.use(router.allowedMethods({
    throw: true,
    notImplemented: () => '3123',
    methodNotAllowed: () => {
        throw('404', '接口不存在');
    }
})); */

module.exports = app;