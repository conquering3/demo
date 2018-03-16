<template>
    <div class="hello">
        <span @click="increment">{{count}}</span>
    </div>
</template>

<script>
    let vmdata = {
        msg: 'Welcome to Your Vue.js App',
        count: 0
    };
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                count: 0
            }
        },
        computed: {
        },
        methods: {
            increment () {
                this.count++;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
