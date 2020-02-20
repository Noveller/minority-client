<template>
    <div class="relative">
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center opacity-25">
            <spinner />
        </div>
        <slot />
    </div>
</template>

<script>
    import Spinner from "./Spinner";
    export default {
        name: 'CardWrapper',
        components: {Spinner},
        props: {
            loading: {
                type: Boolean,
                default: false
            }
        }
    }
</script>