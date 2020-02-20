<template>
    <div class="relative">
        <ul class="flex justify-between mt-4 lg:mt-0">
            <NavigationItem :inFooter="inFooter" v-for="(item, index) in items" :key="`nav-item-${index}`" :item="item"/>
        </ul>
    </div>
</template>

<script>
    // import Popper from 'popper.js'

    import NavigationItem from "./NavigationItem";
    export default {
        name: 'Navigation',
        components: {NavigationItem},
        props: {
            items: {
                type: Array,
                default: function () {
                    return []
                }
            },
            inFooter: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            last() {
                return Object.keys(this.menuItems).length - 1;
            }
        },
        methods: {}
    }
</script>
