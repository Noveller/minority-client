<template>
    <div>
        <div class="container m-auto">
            <div class="flex flex-col flex-col-reverse  sm:flex-row sm:px-3 items-stretch">
                <div class="pb-4 sm:w-1/2 flex flex-col justify-center sm:px-0">
                    <div class="flex flex-col text-center sm:text-left sm:justify-between sm:pr-6 px-3 sm:px-0">
                        <h1 class="font-bold text-2xl lg:text-4xl text-gray-100 mb-4 mt-6 sm:mt-0">
                            Empowering Feature <br class="hidden sm:block"/> Minority Leaders
                        </h1>

                        <h6 class="text-xs text-gray-200 mb-12">This project is supported by the federal Foreign Office of German</h6>
                        <div class="flex justify-between">
                            <img src="../assets/federal.png" alt="" class="w-32">
                            <router-link :to="{name: 'stories'}" class="focus:outline-none rounded-sm border-gray-100 border-4 text-gray-100 font-bold p-3 uppercase">{{$t('buttons.our_stories')}}</router-link>
                        </div>
                    </div>
                </div>
                <div class="sm:w-1/2 relative h-64">
                    <img
                            src="../assets/main_about_image.jpg"
                            alt=""
                            class="h-64 object-cover w-full">
                </div>
            </div>
        </div>
        <div v-for="(item, index) of items" :key="`item-${index}`">
            <div v-if="index === 0">
                <div class="">
                    <div class="h-px bg-gray-200 opacity-25"></div>
                    <div class="bg-gray-25 pt-4">
                        <div class="container m-auto">
                            <div class="px-3 flex">
                                <h1 class="text-gray-300 text-2xl">
                                    {{item.title}}
                                    <span class="block mt-2 rounded-sm h-1 bg-orange-100"></span>
                                </h1>
                            </div>
                            <div class="mt-6 flex flex-col md:flex-row">
                                <div class="md:w-1/2 px-3">
                                    <div class="text-gray-200" v-html="item.content"></div>
                                </div>
                                <div class="md:w-1/2 px-3">
                                    <div class="h-full flex flex-col justify-center items-center">
                                        <div class="flex justify-between w-full py-4 sm:px-12 md:px-16 lg:px-24 md:py-0">
                                            <div class="flex flex-col mr-3 text-center">
                                                <div class="rounded-sm text-white bg-orange-200 font-bold text-4xl">{{item.members_count}}</div>
                                                <div class="mt-2 text-gray-300 font-bold">young minority <br/> members</div>
                                            </div>
                                            <div class="flex flex-col ml-3 text-center">
                                                <div class="rounded-sm text-white bg-orange-200 font-bold text-4xl">{{item.districts_count}}</div>
                                                <div class="mt-2 text-gray-300 font-bold">different districts <br /> inhabited</div>
                                            </div>
                                        </div>

                                        <div class="w-full sm:px-12 pt-6">
                                            <div class="rounded-sm bg-white px-3 py-4 -mx-3 sm:mx-0">
                                                <h3 class="uppercase text-2xl text-gray-300">target group</h3>
                                                <div class="pt-4" v-html="item.target_group_text"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="h-px bg-gray-200 opacity-25"></div>
                </div>
                <div class="bg-gray-300">
                    <div class="container m-auto">
                        <div class="px-3 m-auto lg:w-1/2">
                            <p class="text-white py-8 text-center">
                                OECD also acknowledges that although the situation of minority youth participation in Moldova has improved, substantial barriers do skill exist for minority youth.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container m-auto sm:px-3" v-else>
                <div class="">
                    <div class="flex flex-col sm:flex-row sm:-mx-8" :class="{'sm:flex-row-reverse': !(index % 2)}">
                        <div class="sm:w-1/2 sm:px-8">
                            <img
                                    v-if="item.media"
                                    :src="item.media.large.source_url" alt="">
                        </div>
                        <div class="sm:w-1/2 px-3 sm:px-8">
                            <div class="flex flex-col">
                                <div class="flex">
                                    <h1 class="mt-6 text-gray-300 text-2xl">
                                        {{item.title}}
                                        <span class="block mt-2 rounded-sm h-1 bg-orange-100"></span>
                                    </h1>
                                </div>
                                <div class="py-8 text-gray-300 text-sm content" v-html="item.content"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center px-3 pt-12 pb-16">
                <join-the-community />
        </div>
    </div>
</template>

<script>
    import loading from "../mixins/loading";
    import {AboutUsApi} from "../api";
    import JoinTheCommunity from "../components/JoinTheCommunity";

    export default {
        name: 'Main',
        components: {JoinTheCommunity},
        mixins: [loading],
        async mounted() {
            await this.init();
            this.hideLoader();
        },
        data() {
            return {
                items: null
            }
        },
        methods: {
            async init() {
                this.items = await AboutUsApi.all({
                    '_embed': true,
                    'filter[orderby]': 'date',
                    order: 'asc'
                });
            }
        }
    }
</script>
