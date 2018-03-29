let http = require('http'),
    fs = require('fs')
module.exports = (resApi) => {
    http.get('http://apis.map.qq.com/ws/district/v1/list?key=VORBZ-B2QRD-Y5R4L-HA6RR-Z5TNS-G4BUP', (res) => {
        res.setEncoding('utf8');
        let rawDataProvince = '';
        res.on('data', (stream) => {
            rawDataProvince += stream;
        });
        res.on('end', (err) => {
            if (err) {
                console.log(123);
                return 0;
            }
            rawDataProvince = JSON.parse(rawDataProvince);
            let provinceStatistics = [];
            provinceStatistics = rawDataProvince.result[0];
            // 三级
            // 省
            provinceStatistics.map((pItem, pI) => {
                let pReg = new RegExp('^' + pItem.id.substring(0, 2), '');                
                pItem.children = [];
                // 市
                rawDataProvince.result[1].map((cItem, cI) => {
                    if (pReg.test(cItem.id)) {
                        cItem.children = [];
                        pItem.children.push(cItem);
                    }
                });
            });
            // 区、街道、城镇            
            provinceStatistics.map((pItem, pI) => {
                pItem.children.map((cItem, cI) => {
                let cReg = new RegExp('^' + cItem.id.substring(0, 4), '');                    
                    rawDataProvince.result[2].map((tItem, tI) => {
                        if (cReg.test(tItem.id)) {
                            cItem.children.push(tItem);
                        }
                    });
                });
            });
            provinceStatistics = '/*\n*data_version:' + rawDataProvince.data_version + '\n*/\n' + JSON.stringify(provinceStatistics);
            fs.writeFile('./chinaCoords.js', provinceStatistics, (err) => {
                if (err) {
                    console.log(err);
                    resApi.end('写入失败!');
                } else {
                    console.log('写入成功!');
                    resApi.end('写入成功!');
                }
            });
        });
    });
};
