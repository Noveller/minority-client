<template>
    <div>
        <h3 class="text-gray-200 font-bold">{{text}}</h3>
        <div class="h-1 bg-orange-100 rounded-sm mt-2"></div>
    </div>
</template>

<script>
    export default {
        name: 'Heading',
        props: {
            text: {
                type: String,
                required: true
            }
        }
    }
</script>