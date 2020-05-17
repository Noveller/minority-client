<template>
    <div class="relative h-full" v-if="item">
        <div class="hidden sm:block absolute h-full w-1/2 bg-gray-25 z-10"></div>
        <div class="container m-auto z-30 relative">
            <div class="flex flex-col sm:flex-row px-3 sm:pt-8">
                <div class="-mx-3 sm:mx-0 sm:w-1/2 sm:pr-6 relative bg-gray-25 sm:bg-transparent">
                    <div>
                        <img :src="item.media.large.source_url" alt="">
                        <div class="px-3 sm:px-0">
                            <div class="w-1/2 mt-4">
                                <heading :text="item.title"></heading>
                            </div>

                            <div class="text-sm text-gray-200 py-6" v-html="item.content"></div>
                        </div>
                    </div>
                </div>
                <div class="sm:w-1/2 sm:pl-6 mt-6 sm:mt-0 pb-4">
                    <heading class="lg:w-1/2 mb-4" :text="$t('latest_press_releases')"></heading>

                    <div class="flex flex-wrap flex-col sm:flex-row">
                        <div class="py-3" v-for="(item, index) in items" :key="`item-${index}`">
                            <Card :item="item" @readMore="readMore"></Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import loading from "../mixins/loading";
    import Api from "../api/press";
    import Heading from "../components/Heading";
    import Card from "../components/Card";

    export default {
        name: 'DisplayPressRelease',
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
            readMore(id) {
                this.$router.push({ path: `/press/release/${id}` })
            },
            async init() {
                try {
                    const { id } = this.$route.params;
                    this.item = await Api.one(id);
                    this.items = await this.otherItems(id);

                } catch (e) {
                    await this.$router.push({name: 'press-release'})
                } finally {
                    this.hideLoader();
                }
            },
            async otherItems(excludedID) {
                const { data } = await Api.all({
                    '_embed': true,
                    'filter[orderby]': 'date',
                    order: 'asc',
                    page: 1,
                    per_page: 5
                });
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
