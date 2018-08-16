(function (name) {
    window[name] = {
        downLoad: function (url, saveName) {
            if(typeof url == 'object' && url instanceof Blob) {
                url = URL.createObjectURL(url); // 创建blob地址
            }
            // console.log(url);
            var aLink = document.createElement('a');
            aLink.href = url;
            aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
            var event;
            if(window.MouseEvent && navigator.userAgent.indexOf('Trident') == -1) {
                console.log(1); 
                event = new MouseEvent('click');
            }
            else {
                console.log(2);                   
                event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            }
            aLink.dispatchEvent(event);
        }
    }
    // var csv = '姓名,期中成绩,期末成绩\n张三,58,95\n李四,98,74';
    // var blob = new Blob(['\ufeff' + csv], {type: 'text/csv,charset=UTF-8'});
    // window[name].downLoad('./index.js', '');
})('saveAs');