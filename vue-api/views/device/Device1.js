(function () {
    window.ns('views').Page1 = {
        template: '<div class="content-body">page1 <slot></slot></div>',
        created () {
            console.log(this.$slots);
        }
    }
})();