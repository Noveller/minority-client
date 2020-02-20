<template>
    <div class="bg-gray-25">
        <div class="container m-auto px-3">
            <div class="md:px-30 lg:px-40">
                <div class="py-6">
                    <Heading text="Image Gallery" class="w-1/2 lg:w-1/3"/>
                </div>
                <div class="flex flex-col">
                    <div v-if="selectedMedia" class="flex justify-center">
                        <ImageGalleryPreviewCard :media="selectedMedia" />
                    </div>
                    <div class="flex flex-wrap justify-center py-12 -m-3">
                        <div class="sm:w-3/12 md:w-3/12 lg:w-2/12 p-3" v-for="(media_item, index) in media" :key="`media-card-${index}`">
                            <ImageGalleryThumbnailCard :media="media_item" @select="setCurrentImage"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {MediaApi} from "../../api";
    import loading from "../../mixins/loading";
    import ImageGalleryThumbnailCard from "./ImageGalleryThumbnailCard";
    import ImageGalleryPreviewCard from "./ImageGalleryPreviewCard";
    import Heading from "../../components/Heading";

    export default {
        name: 'ImageGallery',
        components: {Heading, ImageGalleryPreviewCard, ImageGalleryThumbnailCard},
        mixins: [loading],
        data() {
            return {
                selectedMedia: null,
                media: []
            }
        },
        async mounted() {
            this.media = await this.fetchImages();
            this.selectedMedia = this.media[0];
            this.hideLoader();
        },
        methods: {
            async fetchImages() {
                return await MediaApi.all({
                    _fields: 'media_details',
                    per_page: 100
                });
            },
            setCurrentImage(media) {
                this.selectedMedia = media;
            }
        }
    }
</script>