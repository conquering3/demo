<template>
  <div class="tab">
    <h2>我是tab组件</h2>
    <p>{{msg}}</p>
  </div>
</template>
<script>
  export default {
    name: 'Tab',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
