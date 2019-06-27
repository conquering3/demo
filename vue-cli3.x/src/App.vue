<template>
	<div id="app">
        <el-autocomplete v-model="state"
            :fetch-suggestions="querySearchAsync"
        >

        </el-autocomplete>
		<img alt="Vue logo" src="./assets/logo.png" />
            {{msg}}
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
	import HelloWorld from "./components/HelloWorld.vue";

	export default {
		name: "app",
		data() {
			return {
                state: '',
                msg: window.config.host
            };
        },
        methods: {
            querySearchAsync (querystring, cb) {
                cb([{value: 1}, {value: 2}]);
            }
        },
        created () {
            let from = 1;
            let to = 3;

            console.log(from, to);
            [from, to] = [to, from];
            console.log(from, to);
        
        },
		components: {
			HelloWorld
		}
	};
</script>

<style>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
