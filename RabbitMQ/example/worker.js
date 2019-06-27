(Stmop => {
    const getWebStompSubscribe = ({
        WebSocketURL,
        destination,
        subscribe,
        onerror = () => {},
    }) => {
        if (!(WebSocketURL && destination)) {
            alert('请输入WebSocketURL 和 destination!');
            return;
        }

        const user = 'test';
        const password = 'test123';
        const ws = new WebSocket(WebSocketURL);
        const client = Stomp.over(ws);
        let isStop = false;

        client.connect(user, password, a => {
                if (isStop) {
                    client.disconnect();
                }
                client.subscribe(destination, data => {
                    subscribe(data);
                });
            }, onerror, '/'
        );
        client.onerror = onerror;
        client.endsubscribe = () => {
            isStop = true;
            client.unsubscribe();
            client.disconnect(function() {});
        };
        return client;
    };

    const WebSocketURL = 'ws://192.168.40.134:15674/ws',
        // destination = '/amq/queue/all_bus';
        destination = '/exchange/bus_gps/00740.*';

    const map = new AMap.Map('map', { zoom: 12 }),
        text = new AMap.Text({}),
        existBusesId = [],
        existBusesMaker = [];
    let client;
    

    text.hide();
    map.add(text);
    client = getBusGpsData();

    // 接收bug-gps数据
    function getBusGpsData() {
        return getWebStompSubscribe({
            WebSocketURL,
            destination,
            subscribe(data) {
                // 高德地图
                let body = JSON.parse(data.body),
                    index = existBusesId.indexOf(body.id);

                // 删除已出现车
                if (index > -1) {
                    existBusesId.splice(index, 1);
                    map.remove(existBusesMaker.splice(index, 1));
                }
                // 坐标装换
                let coordinate = coordtransform.wgs84togcj02(
                    body.lng,
                    body.lat
                );

                // 添加覆盖物
                let marker = new AMap.Marker({
                    icon: new AMap.Icon({
                        imageSize: new AMap.Size(20, 20),
                        image: './bus.png'
                    }),
                    extData: body,
                    position: new AMap.LngLat(coordinate[0], coordinate[1])
                });
                existBusesId.push(body.id);
                existBusesMaker.push(marker);
                setMarkerTextEvent(marker);
                // 添加
                map.add(marker);
            },
            onerror (e) {
                console.log('error');
                getBusGpsData();
            }
        });
    }
    // 设置marker的 text事件
    function setMarkerTextEvent(marker) {
        marker.on('mousemove', function(e) {
            const extData = e.target.B.extData,
                coordinate = coordtransform.wgs84togcj02(
                    extData.lng,
                    extData.lat
                );
            text.setText(extData.id);
            text.setPosition(new AMap.LngLat(coordinate[0], coordinate[1]));
            text.show();
        });
        marker.on('mouseout', function(e) {
            text.hide();
        });
    }
})(window.Stmop);
