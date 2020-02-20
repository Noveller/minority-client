<template>
    <div @click="$emit('select', media)" class="cursor-pointer">
        <img :src="source_url" alt="" class="rounded shadow">
    </div>
</template>

<script>
    export default {
        name: 'ImageGalleryThumbnailCard',
        props: {
            media: {
                type: Object,
                required: true
            }
        },
        computed: {
            source_url() {
                const { sizes } = this.media.media_details;

                return sizes.thumbnail.source_url;
            }
        }
    }
</script>