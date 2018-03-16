(function () {
    var content = document.querySelector('.content'), // 获取第一个有效值
        contents = document.querySelectorAll('.content'), // 非动态
        contents2 = document.getElementsByClassName('content'); // 动态获取
    console.log(content);
    console.log(contents);
    console.log(contents2);
    var p = document.createElement('p');
    p.className = 'content';
    document.body.appendChild(p);
    console.log(contents);
    console.log(contents2);
    content.innerHTML = 'waiting for position!';
    // web sql
    if (!openDatabase) {
        console.log('Web SQL is not supported!');
    }
    if (!WebSocket) {
        console.log('WebSocket is not supported!');
    }
    // h5 geolocation 访问不了
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            console.log(position);
        }, function (err) {
            content.innerHTML = err.message;
        });
    }
    else {
        content.innerHTML = 'Geolocation is no supported by this browser.';
    }
    // webworker ie10以上
    /*
        由于 web worker 位于外部文件中，它们无法访问下例 JavaScript 对象：
        •window 对象
        •document 对象
        •parent 对象
    * */
    if (typeof(Worker) !== 'undefined') {
        var w = new Worker('./js/demoWebWorker.js');
        w.onmessage = function (event) {
            console.log(event.data);
        }
    }
    else {
        console.log('Sorry! No Web Worker support..');
    }
    // 终止Worker
    w.terminate();
    
})();