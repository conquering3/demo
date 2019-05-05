const Vue = require('vue'),
    vueSR = require('vue-server-renderer'),
    express = require('express'),
    app = express(),
    fs = require('fs');

const vm = new Vue({
    template: `<div>
                <h1>{{title}}</h1>
                <p>{{msg}}</p>
        </div>`,
    data: {
        msg: 'hello world, i am from vue-ssr;',
        title: 'vue-ssr'
    },
    beforeCreate () {
        console.log('beforeCreate');
    },
    created () {
        console.log('created');
    },
    beforeMount () {
        console.log('beforeMount');
    },
    mounted () {
        console.log('mounted');
        this.title = 'vue-ssr 钩子';
    }
});

const indexRenderer = vueSR.createRenderer({
    template: fs.readFileSync('./template/index.temp.html', 'utf-8')
});
const context = {
    title: 'vue-ssr&copy;',
    meta: `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
    `,
    msg: 'http://localhost:3000/123/3124'
};
// promise
/* renderer.renderToString(vm).then((err, html) => {
    if (err) {
        throw err;
    }
    console.log(html);
}); */

// server
app.listen(3000, () => {
    console.log(`Server started on port: ${3000}`);
});

// 入口
app.get('*', (req, res) => {
    indexRenderer.renderToString(vm, context, (err, html) => {
        if (err) {
            throw err;
        }
        res.end(html)
    });
});