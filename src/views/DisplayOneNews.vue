<template>
    <div class="relative h-full" v-if="item">
        <div class="hidden sm:block absolute h-full w-1/2 bg-gray-25 z-10"></div>
        <div class="container m-auto z-30 relative">
            <div class="flex flex-col sm:flex-row px-3 sm:pt-8">
                <div class="-mx-3 sm:mx-0 sm:w-1/2 sm:pr-6 relative bg-gray-25 sm:bg-transparent">
                    <div>
                        <img :src="item.media.medium_large.source_url" alt="">
                        <div class="px-3 sm:px-0">
                            <div class="w-1/2 mt-4">
                                <heading :text="item.title"></heading>
                            </div>

                            <div class="text-sm text-gray-200 pt-6" v-html="item.content"></div>
                        </div>
                    </div>
                </div>
                <div class="sm:w-1/2 sm:pl-6 mt-6 sm:mt-0 pb-4">
                    <heading class="lg:w-1/2 mb-4" :text="$t('latest_press_releases')"></heading>

                    <div class="flex flex-wrap flex-col sm:flex-row">
                        <div class="py-3" v-for="(item, index) in items" :key="`item-${index}`">
                            <Card :item="item"></Card>
                        </div>
                    </div>

                    <div class="py-2 flex justify-center sm:justify-start">
                        <button class="rounded bg-orange-100 p-3 uppercase text-white text-sm focus:outline-none">load more</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import loading from "../mixins/loading";
    import { PressAboutUsApi } from "../api";
    import Heading from "../components/Heading";
    import Card from "../components/Card";

    export default {
        name: 'PressAboutUs',
        components: {Card, Heading},
        mixins: [loading],
        data() {
            return {
                items: null,
                item: null
            }
        },
        mounted() {
        },
        watch: {
            '$route': {
                immediate: true,
                handler: 'init'
            }
        },
        methods: {
            async init() {

                try {
                    const { id } = this.$route.params;
                    this.item = await PressAboutUsApi.one(id);
                    this.items = await this.otherItems(id);

                } catch (e) {
                    console.log(e);
                    await this.$router.push({name: 'press-about-us'})
                } finally {
                    this.hideLoader();
                }
            },
            async otherItems(excludedID) {
                const { data } = await PressAboutUsApi.all();

                console.log(data);
                return data.filter(story => {
                    return story.id !== parseInt(excludedID)
                })
            }
        }
    }
</script>

<style scoped>
    .item {

    }
</style>
