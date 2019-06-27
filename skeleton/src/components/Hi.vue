<template>
    <section>
        <ul>
            <li v-for="(item, i) in data" :key="`list-item-${i}`">{{item}}</li>
        </ul>
        <HelloWorld msg="test"></HelloWorld>
    </section>
</template>
<script>
import HelloWorld from './HelloWorld';

export default {
    name: "Hi",
    data () {
        return {
            data: []
        };
    },
    mounted () {
        setTimeout(() => {
            this.data = [1,2,3,4,5,6,7,8,9,0,10]
        }, 3000);
    },
    components: {HelloWorld}
}
</script>
<style>
</style>