<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--<HelloWorld/>-->
    <div>
      <router-link :to="{name: 'home', path: '/', params: {active: 223}, query: {ll: 123}}" tag="li">Home</router-link>
      <router-link to="/hello">Hello</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
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
