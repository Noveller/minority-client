<template>
    <div class="mt-8 sm:pt-16">
        <div class="bg-white p-3 sm:p-0 sm:pr-3 sm:py-4 rounded shadow-md flex flex-col sm:flex-row">
            <img :src="item.media.large.source_url" alt="" class="sm:w-32 sm:h-32 m-0 sm:-ml-16 sm:-mt-12 object-cover">
            <div class="flex-1 sm:pl-6 mt-3 sm:mt-0">
                <h3 class="text-orange-200 font-bold">{{item.full_name}}</h3>
                <h4 class="text-gray-200 text-sm font-bold">{{item.organization_name}}</h4>
                <p class="text-gray-200 text-xs pt-1">
                    {{item.short_description}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OurTeamCard',
        props: {
            item: {
                type: Object
            }
        },
        mounted() {
            console.log(this.item);
        }
    }
</script>