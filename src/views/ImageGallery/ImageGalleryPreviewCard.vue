<template>
    <div>
        <img :src="source_url" alt="" class="rounded shadow" />
    </div>
</template>

<script>
    export default {
        name: 'ImageGalleryPreviewCard',
        props: {
            media: {
                type: Object,
                required: true
            }
        },
        computed: {
            source_url() {
                return this.media.media_details.sizes.full.source_url
            }
        }
    }
</script>