(function (window, $) {
    window.ns = function (name) {
        var names = name.split('.');
        var obj = window;

        names.map(function (name) {
            if (!obj[name]) {
                obj[name] = {};
            }
            obj = obj[name];
        });
        return obj;
    };
})(window, jQuery);