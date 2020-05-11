<template>
    <div class="w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/5 px-3 my-3">
        <div class="flex flex-col h-full bg-white rounded-sm shadow-md overflow-hidden">
            <img v-if="item.media" :src="item.media.large.source_url" alt="">
            <div class="px-2 flex flex-col flex-1">
                <h3 class="text-gray-200 font-bold py-2">{{item.title}}</h3>
                <div class="bg-orange-100 h-1 w-1/2 rounded-full"></div>
                <div class="text-sm leading-tight pt-4 pb-2 text-gray-200" v-html="item.short_description"></div>
                <div class="text-right py-2 mt-auto">
                    <router-link :to="{path: `/stories/${item.id}`}" class="text-sm text-orange-100 hover:underline">read more</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'StoryCard',
        components: {},
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    }
</script>
