require.config({
    paths: {
        moduleA: './moduleA'
    },
    shim: {
        moduleC: {
            deps: ['moduleA'],
            exports: 'hello'
        }
    },
    packages: ['pA'],
    config: {
        i18n: {
            locale: 'other_path'
        }
    }
});
require(['require', 'moduleA', 'moduleC', 'pA'], function (require, moduleA, moduleC, pA) {
    console.log(moduleA);
    console.log(moduleC);
    console.log(pA);
});
