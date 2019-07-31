/**
 * views App
 */
(function () {
    // components
    const Header = window.ns('layouts').Header;
    const Nav = window.ns('layouts').Nav;
    const App = {
        name: 'App',
        template: `<div id="app">
            <Header/>
            <Nav/>
            <router-view>
                <router-link to="/page1">page1</router-link><router-link to="/page2">page2</router-link>
            </router-view>
        </div>`,
        data () {
            return {
                msg: 'hello world, App!'
            };
        },
        created () {
            if (this.$router.currentRoute.fullPath !== '/page1') {
               this.$router.push('/page1');
            }
        },
        components: {
            Header,
            Nav,
        }
    };
    window.ns('views').App = App;
})();
