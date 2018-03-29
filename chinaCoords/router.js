let getCoords = require('./getCoords');

module.exports = (app, _dirname) => {
    // 所有入口设置
    app.all('*', (req, res, next) => {
        console.log('method: ', req.method);
        if (req.method === 'GET')  console.log('query: ', req.query);        
        else if (req.method === 'POST') console.log('body: ', req.body);
        res.set({'Content-Type': 'application/json;charset=utf-8;'});
        next();
    });
    // 主路径
    app.get('/', (req, res) => {
        res.end('Hello nodeJS!');
    });
    // getCoords
    app.get('/getCoords', (req, res) => {
        res.write('writing chinaCoords.js...!\n');
        getCoords(res);
    });
}