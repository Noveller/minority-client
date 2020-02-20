<template>
    <div>
        <div class="container m-auto">
            <div class="flex flex-col sm:flex-row sm:px-3 items-stretch">
                <div class="sm:w-1/2 relative h-full">
                    <img
                            src="./../assets/photo_story.jpg"
                            alt=""
                            class="max-w-full max-h-full">
                </div>
                <div class="sm:w-1/2 flex flex-col justify-center px-3 sm:px-0 sm:pl-6">
                    <div class="flex flex-col text-center sm:text-left sm:justify-between">
                        <h1 class="font-bold text-2xl lg:text-4xl text-gray-100 mb-4">
                            Empowering Feature <br class="hidden sm:block"/> Minority Leaders
                        </h1>

                        <h6 class="text-xs text-gray-200 mb-12">This project is supported by the federal Foreign Office of German</h6>
                        <img src="../assets/federal.png" alt="" class="w-32 m-auto sm:mx-0">
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-25 my-6 py-4">
            <div class="container m-auto">
                <div class="px-3 flex">
                    <h1 class="text-gray-300 text-2xl">
                        Our Stories
                        <span class="block mt-2 rounded-sm h-1 bg-orange-100"></span>
                    </h1>
                </div>
                <div class="mt-6 px-3 flex flex-col md:flex-row">
                    <div class="md:w-1/2">
                        <p class="text-gray-200">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                    <div class="md:w-1/2">
                        <div class="h-full flex justify-center items-center">
                            <div class="flex py-4 md:py-0">
                                <div class="flex flex-col mr-3 text-center">
                                    <div class="text-orange-200 font-bold text-4xl">11</div>
                                    <div class="text-gray-300 font-bold">young minority <br/> members</div>
                                </div>
                                <div class="flex flex-col ml-3 text-center">
                                    <div class="text-orange-200 font-bold text-4xl">10</div>
                                    <div class="text-gray-300 font-bold">different districts <br /> inhabited</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container m-auto">
            <div class="flex flex-wrap">
                <story-card v-for="(story, index) in stories.data" :key="`story-${index}`"
                            :item="story">
                </story-card>
            </div>
        </div>

        <div class="container m-auto" v-if="stories.pagination.totalPages > 1">
            <div class="flex justify-center">
                <pagination @changed="pageChanged" :current-page="page" :total-pages="stories.pagination.totalPages"></pagination>
            </div>
        </div>

        <div class="container m-auto">
            <div class="px-3">
                <join-the-community class="my-12 m-auto"/>
            </div>
        </div>
    </div>
</template>

<script>
    import StoryCard from "../components/StoryCard";
    import {StoryApi} from "../api";
    import JoinTheCommunity from "../components/JoinTheCommunity";
    import loading from "../mixins/loading";
    import Pagination from "../components/Pagination";
    import manipulateQuery from "../mixins/manipulateQuery";

    export default {
        name: 'Stories',
        components: {Pagination, JoinTheCommunity, StoryCard},
        mixins: [loading, manipulateQuery],
        watch: {
            '$route': async function () {
                await this.loadStories();
            }
        },
        async created() {
            await this.loadStories();
            this.hideLoader();
        },
        computed: {
            page() {
                return parseInt(this.$route.query.page) || 1
            },
        },
        data() {
            return {
                localLoading: false,
                stories: {
                    data: [],
                    pagination: {
                        totalPages: 0,
                        currentPage: 0
                    }
                }
            }
        },
        methods: {
            pageChanged(page) {
                this.setQuery({ page });
            },
            async loadStories() {
                const params = {
                    page: this.page
                };

                this.showLoader();

                try {
                    const response = await StoryApi.all(params);
                    this.stories = {
                        data: response.data,
                        pagination: response.meta.pagination
                    };
                } finally {
                    this.hideLoader();
                }

            },
            async initStories() {
                const { data, meta: { pagination } } = await StoryApi.all();

                this.stories = data;
                this.pagination = pagination;
            }
        }
    }
</script>