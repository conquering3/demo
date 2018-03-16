<template>
  <div class="home">
    <h1>Welcome to Vue.js!</h1>
    <p>{{this.$route.params.active}}</p>
    <ul v-show="main_nav" :class="main_nav">
      <li><a href="#one">one</a></li>
      <li><a href="#two">two</a></li>
      <li><a href="#three">three</a></li>
    </ul>
    <router-link to="content" append>content</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'home',
    props: ['main_nav'],
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 40px;
  }
  ul {
    clear: both;
  }
  ul::before,
  ul::after {
    display: block;
    content: '';
    width: 0;
    clear: both;
  }
  ul li {
    float: left;
  }
</style>
