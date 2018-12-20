/***************
 * @author guoss
 * @email guoshusheng@sibat.cn
 */
(function (root, factory) {
    "object" == typeof exports && "undefined" != typeof module
    ? factory(exports)
    : "function"== typeof define && define.amd
    ? define(["exports"], factory)
    : factory(root.pointlineMap = {});

})(this, function (exports) {
    if (!zrender) {
        console.error('zrender is needed!');
        return;
    }
    /**
     * @desc default style 
     */
    var defaultStyle = {
        draggable: false,
        zoomable: false,
        scaleMax: 3,
        scaleMin: 0.2,
        scale: [1, 1],
        point: {
            z: 2,
            strokeColor: '#000',
            fillColor: '#fff',
            lineWidth: 1,
            symbol: 'circle',
            symbolSize: 20,
            text: {
                type: 'normal',
                textfill: '#333',
                direction: 'bottom',
                fontSize: 10,
                color: '#f0f'
            }
        },
        line: {
            z: 1,
            direction: '1', // -1, 1
            strokeColor: '#f00',
            lineWidth: 3,
            lineStyle: 'normal',
            smooth: 1,
            smoothConstraint: [[0, 0], [100, 450]],
            text: {
            }
        }
    };
    /**
     * @desc set style
     */
    exports.setStyle = function (style) {
        defaultStyle = unionDeepCopy(defaultStyle, style);
    }
    /**
     * @desc line style default
     */

    
    /**
     * @desc about zrender 
     */
    var zr, 
        zrPointGroup = [],
        zrLineGroup = [],
        zrTextGroup = [],
        dragging = false,
        currentPosition = [0, 0],
        currentX = 0,
        currentY = 0,
        handle; // init 之后的接口
    
    handle = {
        loadPoint: function (option) {
            if (!option.url) {
                console.error('url is needed!');
                return;
            }
            this.ajax({
                url: option.url,
                success: function (data) {
                    // clear
                    zrPointGroup.map(function (group) {
                        group.data.map(function (point) {
                            zr.remove(point.zPoint);
                            zr.remove(point.zText)
                        });
                    });
                    zrPointGroup = [];
                    
                    data.map(function (group, i) {
                        zrPointGroup.push({
                            groupId: i,
                            data: []
                        });
                        zrTextGroup.push({
                            groupId: i,
                            data: []
                        });
                        group.group.map(function (point , m) {
                            // point
                            point.type = 'point';

                            var zPoint = drawPoint(point),
                                zText = drawText(point);

                            zrPointGroup[i].data.push({
                                pointId: m,
                                position: point.position,
                                zPoint: zPoint,
                                zText: zText
                            });
                            zr.add(zPoint);
                            zrTextGroup[i].data.push({
                                textId: m,
                                position: point.position,
                                zText: zText
                            })
                            zr.add(zText);
                        });
                    });
                }
            });
        },
        loadLine: function (option) {
            if (!option.url) {
                console.error('url is needed!');
                return;
            }
            this.ajax({
                url: option.url,
                success: function (data) {
                    // clear
                    zrLineGroup.map(function (group) {
                        group.data.map(function (line) {
                            zr.remove(line.zLine);
                        });
                    });
                    zrLineGroup = [];

                    data.map(function (group, i) {
                        zrLineGroup.push({
                            groupId: i,
                            data: []
                        });
                        group.group.map(function (line , m) {
                            var zLine = drawLine(line);
                            zrLineGroup[i].data.push({
                                lineId: m,
                                line: line.points,
                                zLine: zLine
                            });
                            zr.add(zLine);
                        });
                    });
                }
            });
        },
        ajax: function (option) {
            var xhr,
                method = (option.method || 'get').toLowerCase(),
                url = option.url,
                data = option.data,
                dataType = option.dataType || 'json',
                success = option.success || function () {},
                error = option.error || function () {};
    
            xhr = new XMLHttpRequest();
            if (method === 'get') {
                xhr.open(method, url + (data? '?' + data: ''), true);
                xhr.send(null);
            }
            else if (method === 'post') {
                xhr.open(method, url, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;chartset=utf-8');
                xhr.send(data || null);
            }
            xhr.onreadystatechange = function (ev) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var data = dataType === 'json'? new Function('return '+ xhr.responseText)(): xhr.responseText;
    
                        success(data, xhr);
                    }
                    else {
                        error(xhr.responseText, xhr);
                    } 
                }
            }
        },
        enableZoom: function (max, min) {
            max && (defaultStyle.scaleMax = max);
            min && (defaultStyle.scaleMin = min);
            if (!defaultStyle.zoomable) {
                defaultStyle.zoomable = true;
                zr.on('mousewheel', mousewheelHandle);
            }
        },
        disableZoom: function () {
            defaultStyle.zoomable = false;
            zr.off('mousewheel', mousewheelHandle);
        },
        enableDrag: function () {
            if (!defaultStyle.draggable) {
                defaultStyle.draggable = true;
                zr.on('mousedown', mousedown);
                zr.on('mouseup', mouseup);
                zr.on('mousemove', mousemove);
            }
        },
        disableDrag: function () {
            defaultStyle.draggable = false;
            zr.off('mousedown', mousedown);
            zr.off('mouseup', mouseup);
            zr.off('mousemove', mousemove);
        },
        reset: function () {
            currentPosition = [0, 0];
            zrPointGroup.map(function (group) {
                group.data.map(function (point) {
                    point.zPoint.attr({
                        origin: [0, 0],
                        scale: [1, 1],
                        position: [0, 0]
                    });
                });
            });
            zrLineGroup.map(function (group) {
                group.data.map(function (line) {
                    line.zLine.attr({
                        origin: [0, 0],
                        scale: [1, 1],
                        position: [0, 0]
                    });
                });

            });
        }
    };
    /**
     ***************
     * events
     ***************
     */
    /**
     * @desc mousewheel
     */
    function mousewheelHandle (ze) {
        ze.event.preventDefault();
        var canvasW,
            canvasH,
            scaleX,
            scaleY;

    
        canvasW = zr.getWidth();
        canvasH = zr.getHeight();
        /* zrPointGroup.map(function (group) {
            group.data.map(function (point) {
                zr.remove(point.zPoint);
            });
        }); */
        /* zrLineGroup.map(function (group) {
            group.data.map(function (line) {
                zr.remove(line.zLine);
            });
        }); */

        if (ze.wheelDelta > 0) {
            scaleX = defaultStyle.scale[0] + 0.2;
            scaleY = defaultStyle.scale[1] + 0.2;

            scaleX = scaleX > defaultStyle.scaleMax? defaultStyle.scaleMax: scaleX;
            scaleY = scaleY > defaultStyle.scaleMax? defaultStyle.scaleMax: scaleY;
        }
        else {
            scaleX = defaultStyle.scale[0] - 0.2;
            scaleY = defaultStyle.scale[1] - 0.2;

            scaleX = scaleX < defaultStyle.scaleMin? defaultStyle.scaleMin: scaleX;
            scaleY = scaleY < defaultStyle.scaleMin? defaultStyle.scaleMin: scaleY;
        }
        defaultStyle.scale = [scaleX, scaleY];
        updateCanvas(zrLineGroup, 'zLine', {
            origin: [ze.offsetX, ze.offsetY],
            scale: [scaleX, scaleY]
        });
        updateCanvas(zrPointGroup, 'zPoint', {
            origin: [ze.offsetX, ze.offsetY],
            scale: [scaleX, scaleY]
        });
        updateCanvas(zrTextGroup, 'zText', {
            origin: [ze.offsetX, ze.offsetY],
            scale: [scaleX, scaleY]
        });
    }

    /**
     * @desc draggable 
     */
    function mousedown (ze) {
        currentX = ze.offsetX;
        currentY = ze.offsetY;
        dragging = true;
    }
    function mouseup (ze) {
        dragging = false;
    }
    function mousemove (ze) {
        if (!dragging) {
            return;
        }
        var position = [currentPosition[0] + ze.offsetX - currentX, currentPosition[1] + ze.offsetY - currentY];

        currentX = ze.offsetX;
        currentY = ze.offsetY;
        currentPosition = position;

        updateCanvas(zrPointGroup, 'zPoint', {position: position});
        updateCanvas(zrLineGroup, 'zLine', {position: position});
    }

    /**
     * @desc draw point
     */
    function drawPoint (point) {
        var newPoint = unionDeepCopy(defaultStyle.point, point);

        var pointType = {
            'circle': function () {
                return new zrender.Circle({
                    z: newPoint.z,
                    style: {
                        fill: newPoint.fillColor,
                        stroke: newPoint.strokeColor,
                        lineWidth: newPoint.lineWidth,
                        text: point.name,
                        fontSize: newPoint.text.fontSize,
                        textAlign: newPoint.text.textAlign,
                        textFill: newPoint.text.color,
                        textPosition: newPoint.text.direction,
                    },
                    shape: {
                        cx: newPoint.position[0],
                        cy: newPoint.position[1],
                        r: newPoint.symbolSize/2
                    }
                });
            },
            'rect': function () {
            },
            'icon': function () {
            }
        }
        return pointType[newPoint.symbol]();
    };
    /**
     * @desc draw line
     */
    function drawLine (line) {
        var lineType = {
            'normal': function () {
                return new zrender.Polyline({
                    z: line.z || defaultStyle.line.z,
                    style: {
                        lineWidth: line.lineWidth || defaultStyle.line.lineWidth,
                        stroke: line.strokeColor || defaultStyle.line.strokeColor,
                        lineDash: [5, 3]
                    },
                    shape: {
                        points: line.points,
                        smooth: line.smooth || defaultStyle.line.smooth,
                        smoothConstraint: line.smoothConstraint || defaultStyle.line.smoothConstraint
                    }
                });
            }
        }
        return lineType[line.lineStyle || defaultStyle.line.lineStyle]();
    };
    /**
     * @desc draw text
     */
    function drawText (obj) {
        var textType = {
            'normal': function () {
                return new zrender.Text({
                    z: 3,
                    style: {
                        text: obj.name,
                        // textLineWidth: 2,
                        // textLineHeight: 20,
                        textFill: '#f0f',
                        fontSize: 10,
                        textBackgroundColor: '#ddd',
                        textAlign: 'center',
                        // textVerticalAlign: 'top',
                    },
                    position: obj.position
                    // rotation: -90
                });
            }
        }
        return textType[obj.text &&  obj.text.type || defaultStyle[obj.type].text.type]();
    }
    /**
     * @desc update canvas
     * @param {Array} data zrPointGroup/zrLineGroup
     * @param {String} type zPoint/zLine
     * @param {Object} option update option
     */
    function updateCanvas (data, type, option) {
        data.map(function (group) {
            group.data.map(function (item) {
                console.log(item);
                item[type].attr(option);
            });
        });
    }

    // 算法
    /**
     * @desc unionDeepCopy 两个对象合并
     */
    function unionDeepCopy (obj1, obj2) {
        var newObj = {},
            keys2 = [];
        for (var key in obj2) {
            keys2.push(key);
        }
        for (var key in obj1) {
            var index = keys2.indexOf(key);

            index!= -1 && keys2.splice(index, 1);
            newObj[key] = (typeof obj1[key] !== 'object' || !obj1[key])
                ? ((obj2 && obj2[key]) || obj1[key])
                : arguments.callee(obj1[key], obj2[key]);
        }
        keys2.map(function (key) {
            newObj[key] = (typeof obj2[key] !== 'object' || !obj2[key])? obj2[key]: deepCopy(obj2[key]);
        });
        return newObj;
    }
    /**
     * @desc deepCopy 深度拷贝
     */
    function deepCopy (obj) {
        var newObj = {};
        for (var key in obj) {
            newObj[key] = (typeof obj[key] !== 'object' || !obj[key])? obj[key]: newObj[key] = arguments.callee(obj[key]);
        }
        return newObj;
    }

    /**
     * @desc init
     */
    exports.initCanvas = function (el) {
        if (!el && !el instanceof HTMLElement) {
            console.log('el element is needed!');
            return;
        }
        zr = zrender.init(el);
        defaultStyle.zoomable && handle.enableZoom();
        defaultStyle.draggable && handle.enableDrag();
        return handle;
    };
    return exports;
});