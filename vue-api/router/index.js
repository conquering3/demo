(function () {
    /* views Components */
    const Page1 = window.ns('views').Page1;
    const Page2 = window.ns('views').Page2;

    Vue.use(VueRouter);
    window.ns('routers').index = new VueRouter({
        mode: 'hash',
        routes: [
            {
                name: 'page1',
                path: '/page1',
                component: Page1,
            },
            {
                name: 'page2',
                path: '/page2',
                component: Page2,
            }
        ]
    });
})();