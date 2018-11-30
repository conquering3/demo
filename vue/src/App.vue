<template>
    <div id="app" class="app">
        <img :src="icon" alt="">
        <span :class="$style.text">{{msg}}</span>
    </div>
</template>
<script>
export default {
    name: 'App',
    data () {
        return {
            msg: 'hello world',
            icon: require('./assets/service-monitor2x.png')
        }
    }    
}
</script>
<style lang="scss" module>
   
    .app {
        background-color: #f00;
    }
    .text {
        color: #f00;
    }
</style>