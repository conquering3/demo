// 主函数, 数据双向绑定mini版
function Vue(options) {
    // 插入节点
    this.data = options.data;
    this.id = options.el;
    observe(this.data, this);

    // 生成dom
    var node = document.getElementById(this.id);
    var fragment = toFragment(node, this);

    node.appendChild(fragment);
}
// 发布者
function Dep() {
    // 订阅者数据
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.map(function(sub) {
            // 通知订阅者更新
            sub.update();
        });
    }
};

// 订阅者
function Watcher(vm, node, dataName, nodeType) {
    Dep.target = this;
    this.dataName = dataName;
    this.node = node;
    this.vm = vm;
    this.nodeType = nodeType;
    this.update();
    Dep.target = null;
}

// Watcher 对象
Watcher.prototype = {
    get: function() {
        this.value = this.vm[this.dataName];
    },
    update: function() {
        this.get();
        if (this.nodeType === "text") {
            this.node.nodeValue = this.value;
        } else if (this.nodeType === "input") {
            this.node.value = this.value;
        } else if (this.nodeType === "innerText") {
            this.node.innerText = this.value;
        }
    }
};
//
function buildReactive(vm, key, val, dep) {
    // 单个键值更新互不影响
    Object.defineProperty(vm, key, {
        get: function() {
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return val;
        },
        set: function(newVal) {
            if (val === newVal) {
                return;
            } else {
                val = newVal;
                dep.notify();
            }
        }
    });
}

// observe 劫持存储数据 观察
function observe(data, vm) {
    var dep = new Dep();

    Object.keys(data).map(function(key) {
        buildReactive(vm, key, data[key], dep);
    });
}

// 遍历劫持节点, 生成处理fragment
function toFragment(node, vm) {
    var fragment = document.createDocumentFragment();
    var child;
    while ((child = node.firstChild)) {
        compile(child, vm);
        fragment.appendChild(child);
        if (child.firstChild) {
            child.appendChild(toFragment(child, vm));
        }
    }
    return fragment;
}

// compile处理元素
function compile(node, vm) {
    var watcher = null;
    var reg = /\{\{(.*)\}\}/;
    //如果节点是元素节点
    if (node.nodeType === 1) {
        //匹配到{{}}这样的格式
        if (reg.test(node.innerText)) {
            var dataName = RegExp.$1; // 获取匹配到的字符串
            dataName = dataName.trim();
            watcher = new Watcher(vm, node, dataName, "innerText");
        }
        //表单类型且有v-model的
        else {
            var attrs = node.attributes;
            for (var i = 0; i < attrs.length; i++) {
                if (attrs[i].nodeName === "v-model") {
                    var dataName = attrs[i].nodeValue;
                    node.addEventListener(
                        "input",
                        function(e) {
                            vm[dataName] = e.target.value;
                        },
                        false
                    );
                    node.value = vm[dataName];
                    node.removeAttribute("v-model");
                    break;
                }
            }
            watcher = new Watcher(vm, node, dataName, "input");
        }
    }
    // 节点类型为 text
    else if (node.nodeType === 3) {
        // 匹配到{{}}这样的格式
        if (reg.test(node.nodeValue)) {
            var dataName = RegExp.$1; // 获取匹配到的字符串
            dataName = dataName.trim();
            watcher = new Watcher(vm, node, dataName, "text");
        }
    }
    return watcher;
}
