(function () {
    var i = 0;
    function count () {
        i++;
        postMessage(i);
    }
    setInterval(count, 1000);
})();