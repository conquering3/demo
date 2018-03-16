// https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91&sugmode=2&json=1&p=3&sid=1439_21116_20928&req=2&bs=%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91&pbs=%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91&csor=4&pwd=%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91&cb=jQuery110204935231435287981_1517193905981&_=1517193905998
// https://www.baidu.com/s?ie=utf-8&mod=1&isbd=1&isid=fefb61740000fc3e&ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91&oq=%25E7%2599%25BE%25E5%25BA%25A6%25E7%25BF%25BB%25E8%25AF%2591&rsv_pq=fefb61740000fc3e&rsv_t=6f7e2pM2t5T%2BcX9DvBeT4nHAPg4IHbreqRj%2FlaRhLPzdNCRxzGZy0cPM78U&rqlang=cn&rsv_enter=1&inputT=5&rsv_sug3=15&rsv_sug1=14&rsv_sug7=100&rsv_sug2=0&rsv_sug4=527410&bs=%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91&rsv_sid=undefined&_ss=1&clist=&hsug=&f4s=1&csor=4&_cr1=34741
// var baiduWin = window.open('https://www.baidu.com/s?ie=utf-8&wd=12306', '_self');
require.config({
    baseUrl: './js',
    paths: {
        navListConfig: 'nav-list-config'
    }
});
require(['navListConfig'], function (navListConfig) {
    var searchSubmit = document.getElementById('search-submit'),
            searchVal = document.getElementById('search-val'),
            valList = document.getElementsByClassName('val-list'),
            searchValBox = valList[0];
    // 搜索列表
    window.seacrhQuery = function (json) {
        searchValBox.innerHTML = '';
        if (!json.s.length && /(\s|^)active($|\s)/.test(searchValBox.className)) {
            searchValBox.className = searchValBox.className.replace(/(\s|^)active($|\s)/, '');
        }
        json.s.map(function (item, i) {
            var liEL = document.createElement('li'),
                    spanEl0 = document.createElement('span'),
                    spanEl1 = document.createElement('span');
            // 搜索项
            spanEl0.className = 'search-val';
            spanEl0.innerHTML = searchVal.value.trim();
            liEL.appendChild(spanEl0);
            // 不同后缀
            spanEl1.className = 'search-val-suffix';
            spanEl1.innerHTML = item.replace(new RegExp('^' + searchVal.value.trim(), ''), '');
            liEL.appendChild(spanEl1);
            searchValBox.appendChild(liEL);
            liEL.addEventListener('click', function () {
                openSearch(item);
                searchVal.value = item;
            });
        });
    };
    // 打开搜索结果窗口
    var openSearch = function (val) {
        window.open('https://www.baidu.com/s?ie=utf-8&wd=' + val, '_blank');
    };
    // 搜索链接
    var getValList = function () {
        if (this.value.trim() !== '') {
            var oldScriptEl = document.getElementById('baidu-jsonp');
            if (oldScriptEl) {
                document.body.removeChild(oldScriptEl);
            }
            if (!/(\s|^)active($|\s)/.test(searchValBox.className)) {
                searchValBox.className += ' active';
            }
            var scriptEl = document.createElement('script');
            scriptEl.id = 'baidu-jsonp';
            scriptEl.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + this.value + '&cb=seacrhQuery';
            document.body.appendChild(scriptEl);
        } else {
            if (/(\s|^)active($|\s)/.test(searchValBox.className)) {
                searchValBox.className = searchValBox.className.replace(/(\s|^)active($|\s)/, '');
            }
            
        }
    };
    // 事件监听
    searchVal.addEventListener('keyup', getValList);
    searchVal.addEventListener('focus', getValList);
    searchVal.addEventListener('blur', function () {
        setTimeout(function () {
            searchValBox.className = searchValBox.className.replace(/(\s|^)active($|\s)/, '');
        }, 200);
    });
    searchVal.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            openSearch(this.value);
        }
    });
    searchSubmit.addEventListener('click', function () {
        openSearch(searchVal.value);
    });
    // 载入导航列表
    var navList = document.getElementById('nav-list');
    navList.innerHTML = '';
    navListConfig.data.map(function (item, i) {
        var liEl = document.createElement('li'),
            aEl = document.createElement('a'),
            imgEl = document.createElement('img'),
            spanEl = document.createElement('span');
        spanEl.className = 'title';
        aEl.appendChild(imgEl);
        aEl.appendChild(spanEl);
        liEl.appendChild(aEl);
        navList.appendChild(liEl);
        // 赋值
        imgEl.src = navListConfig.iconPath + item.icon;
        imgEl.alt= '图片';
        aEl.href = item.href;
        aEl.target = '_blank';
        spanEl.innerHTML = item.title;
    });
});