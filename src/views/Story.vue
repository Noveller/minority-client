<template>
    <div v-if="story">
        <div class="container m-auto">
            <div class="flex flex-col sm:flex-row sm:px-3 items-stretch">
                <div class="sm:w-1/2 relative h-full">
                    <img
                            :src="story.media.large.source_url"
                            alt=""
                            class="max-w-full max-h-full">
                </div>
                <div class="sm:w-1/2 flex flex-col justify-center px-3 sm:px-0 sm:pl-6">
                    <div class="flex flex-col text-left sm:justify-between">
                        <h1 class="font-bold text-2xl lg:text-4xl text-gray-200 mb-4">
                            {{story.title}}
                        </h1>
                        <div class="flex">
                            <h6 class="text-gray-200 mb-12">
                                {{story.location}}
                                <span class="block mt-2 rounded-sm h-1 bg-orange-100"></span>
                            </h6>
                        </div>


                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-25 my-6 py-4">
            <div class="container m-auto">
                <div class="px-3 flex">
                    <h1 class="text-gray-300 text-2xl">
                        My Story
                        <span class="block mt-2 rounded-sm h-1 bg-orange-100"></span>
                    </h1>
                </div>
                <div class="mt-6 px-3 flex flex-col md:flex-row">
                    <div class="text-gray-200" v-html="story.content"></div>
                </div>
            </div>
        </div>
        <div class="container m-auto">
            <div class="px-3 flex">
                <h1 class="text-gray-300 text-2xl">
                    Other Stories
                    <span class="block mt-2 rounded-sm h-1 bg-orange-100"></span>
                </h1>
            </div>
            <div class="flex flex-wrap mt-6">
                <story-card v-for="(story, index) in stories" :key="`story-${index}`"
                            :item="story">
                </story-card>
            </div>
        </div>

        <div class="container m-auto">
            <div class="px-3">
<!--                <join-the-community class="my-12 m-auto"/>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {StoryApi} from "../api";
    import StoryCard from "../components/StoryCard";
    import loading from "../mixins/loading";

    export default {
        name: 'Story',
        components: {StoryCard},
        mixins: [loading],
        watch: {
            '$route': {
                immediate: true,
                handler: 'init'
            }
        },
        data() {
            return {
                stories: null,
                story: null
            }
        },
        methods: {
            async init() {
                try {
                    const { id } = this.$route.params;
                    this.story = await StoryApi.one(id);
                    this.stories = await this.otherStories(id);
                } catch (e) {
                    await this.$router.push({name: 'stories'})
                } finally {
                    this.hideLoader();
                }
            },
            async otherStories(excludedID) {
                const { data } = await StoryApi.all();

                return data.filter(story => {
                    return story.id !== parseInt(excludedID)
                })
            }
        }
    }
</script>