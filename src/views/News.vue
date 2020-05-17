<template>
    <div v-if="!isLoading">
        <div class="container m-auto">
            <div class="flex flex-col md:flex-row px-3">
                <div class="md:w-1/2 bg-gray-25">
                    <div class="w-2/3 m-auto pt-2">
                        <Card @readMore="readMore" :is-news="true" :item="latestItem" class="shadow-none" :vertical="true"/>
                    </div>
                </div>

                <div class="md:w-1/2 bg-white">
                    <div class="md:pl-3 pt-4">
                        <div class="w-1/2">
                            <Heading :text="$t('headings.latest_news')" />
                        </div>
                        <div class="flex flex-wrap -mx-2 my-4">
                            <div v-for="(item, index) of latestNews" :key="index" class="w-full w-full lg:w-1/2 p-2">
                                <Card @readMore="readMore" :is-news="true" :item="item" class="bg-gray-50 rounded-sm"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-200 py-3">
            <div class="container m-auto px-3">
                <p class="text-white lg:w-1/2 m-auto text-sm text-center">
                </p>
            </div>
        </div>
        <div class="container mx-auto mt-4 px-3">
            <div class="sm:w-1/2 lg:w-1/3">
                <Heading :text="$t('headings.all_news')" />
            </div>
            <div class="flex flex-wrap -mx-2 my-4">
                <div v-for="(item, index) of news.data" :key="index" class="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2">
                    <Card @readMore="readMore" :is-news="true" :item="item" class="bg-gray-50 rounded-sm"/>
                </div>
            </div>

            <div class="flex justify-center py-3" v-if="news.pagination.totalPages > 1">
                <pagination @changed="pageChanged" :current-page="page" :total-pages="news.pagination.totalPages"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import Card from "../components/Card";
    import Heading from "../components/Heading";

    import { NewsApi } from "../api";
    import loading from "../mixins/loading";
    import manipulateQuery from "../mixins/manipulateQuery";
    import Pagination from "../components/Pagination";

    export default {
        name: 'News',
        components: {Pagination, Heading, Card},
        mixins: [loading, manipulateQuery],
        computed: {
            page() {
                return parseInt(this.$route.query.page) || 1
            },
        },
        watch: {
            '$route': async function () {
                await this.initItems();
            }
        },
        async mounted() {
            await Promise.all([this.initItems(), this.initLatestItems(), this.initOneLatestItem()]);

            this.isLoading = false;

            this.hideLoader();
        },
        data() {
            return {
                isLoading: true,
                latestNews: [],
                news: {
                    data: [],
                    pagination: {
                        totalPages: 0,
                        currentPage: 0
                    }
                },
                latestItem: null
            }
        },
        methods: {
            pageChanged(page) {
                this.setQuery({ page });
            },
            readMore(id) {
                this.$router.push({ path: `news/${id}` })
            },
            async getItems(params = {}) {
                return await NewsApi.all({
                    '_embed': true,
                    'filter[orderby]': 'date',
                    order: 'asc',
                    ...params
                });
            },
            async initItems() {
                const params = {
                    page: this.page
                };

                this.showLoader();

                try {
                    const { data, meta: { pagination } } = await this.getItems(params);

                    this.news = {
                        data,
                        pagination
                    };

                } finally {
                    this.hideLoader();
                }
            },
            async initLatestItems() {
                const { data } = await this.getItems({
                    page: 1,
                    per_page: 4
                });

                this.latestNews = data;
            },
            async initOneLatestItem() {
                const { data } = await this.getItems({
                    page: 1,
                    per_page: 1
                });

                this.latestItem = data[0];
            }
        }
    }
</script>
