/**
 * 文字转换成database64支持img显示
 */
(function (root, factory) {
    if (typeof module === 'object' && typeof module.exports === 'undefined') {
        module.exports = factory();
    }
    else if (typeof define === 'function' &&  define.amd) {
        define(factory);
    }
    else {
        (root || self).textToDatabase64 = factory();
    }
})(this, function () {
    var canvas = document.createElement('canvas');
    var defaultConfig = {
        width: 80,
        height: 80,
        bgColor: '#000',
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Helvetica',
        text: 'text'
    };
    return function (config) {
        if (!canvas.getContext) {
            console.error('The browser does not support a canvas!');
            return;
        };
        if (typeof config !== 'object') {
            console.error('config must be a object');
            return;
        };
        var ctx = canvas.getContext('2d');

        // 修复不同字体垂直居中问题
        function fixedVeritalMiddle () {
            var fixedStrategy = {
                ['Helvetica']: function () {
                    return 11.2;
                },
                ['yahei']: function () {
                    return 8.2;
                }
            }
            for (var key in fixedStrategy) {
                var reg = new RegExp(key.toLowerCase());
                if (reg.test(config.fontFamily.toLowerCase())) {
                    return config.fontSize/fixedStrategy[key]();
                }
            }
            return 0;
        };

        canvas.ExperimentalCanvasFeatures = true;        
        config = Object.assign({}, defaultConfig, config);
        canvas.width = config.width;
        canvas.height = config.height;
    
        ctx.fillStyle = config.bgColor;
        ctx.fillRect(0, 0, config.width, config.height);
        ctx.fillStyle = config.color;
        ctx.font = 'normal '+ config.fontSize + 'px ' + config.fontFamily;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        // top, hanging, middle, alphabetic, ideographic, bottom
        /* var textMetrics = ctx.measureText(config.text);
        console.log(textMetrics.actualBoundingBoxAscent); */
        // 
        ctx.fillText(config.text, config.width/2, config.height/2 + fixedVeritalMiddle());
        // 返回database64数据

        // 测试Paint属性
        return canvas.toDataURL(ctx);
    }
});