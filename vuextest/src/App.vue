<template>
    <div id="app">
        <img src="./assets/logo.png">
        {{incream}}
        <span @click="count">{{incream}}</span>
        <input type="text" v-model="a">
        <router-view/>
        <HelloWorld @increment="helloIncrement"></HelloWorld>
        <HelloWorld></HelloWorld>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld';

    let vmdata = {a: 1};
    export default {
        name: 'App',
        data () {
            return {a: 1}
        },
        components: {
            HelloWorld
        },
        beforeCreate () {
            console.log(this.$store.state.count);
            this.$store.dispatch('increment');
            console.log(this.$store.state.count);
            this.$store.dispatch('getModuleACount');
        },
        computed: {
            incream () {
                return this.a + 1;
            }
        },
        watch: {
            a (val) {
                console.log(val);
            }
        },
        methods: {
            count () {
                this.a = this.a + 1;
            },
            helloIncrement () {
                this.$emit('increment');
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
