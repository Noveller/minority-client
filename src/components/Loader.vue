<template>
    <transition name="general">
        <div v-if="show" class="inset-0 flex flex-col items-center justify-center z-50">
            <spinner></spinner>
        </div>
    </transition>
</template>

<script>
    import Spinner from "./Spinner";
    export default {
        name: 'Loader',
        components: {Spinner},
        props: {
            show: {
                type: Boolean,
                default: false
            },
            position: {
                type: String,
                default: 'fixed mt-16'
            },
        }
    }
</script>