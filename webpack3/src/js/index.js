(() => {
    const $ = require('jquery');
    require('../scss/style.scss');
    require('../css/style.css');
    const printMe = require('./bunble.js').printMe;
    console.log('312114312312');
    if (module.hot) {
        module.hot.accept('./bunble.js', function () {
            console.log('update............');
        });
    }
})();