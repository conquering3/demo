#text to database64

#### install lib
```
npm install text-to-db64
```
#### to use it
```
// 目前做了Helvetica, yahei两种字体的垂直居中调整
// defaultConfig
var config = {
    width: 80,
    height: 80,
    bgColor: '#000',
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Helvetica',
    text: 'text'
};

var database64 = textToDatabase(config);
```