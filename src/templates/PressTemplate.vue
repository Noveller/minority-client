<template>
    <div>
        <div class="container m-auto h-64">
            <div class="relative">
                <div class="absolute inset-0 z-40">
                    <div class="flex h-full items-center lg:w-2/3">
                        <div class="px-3 w-full">
                            <div class="w-full bg-opacity-white flex flex-col items-end py-4 pr-3">
                                <h1 class="text-gray-200 text-3xl">{{$t($route.meta.page_heading)}}</h1>
                                <ul class="flex mt-6">
                                    <li v-for="(item, index) in menuItems" :key="`menu-item-${index}`" class="mx-10">
                                        <div class="h-1 rounded-sm w-12 mb-2" :class="{'bg-orange-100': $route.name === item.to }"></div>
                                        <router-link :to="{name: item.to}"  class="uppercase text-gray-200 hover:text-gray-300">{{$t(item.title)}}</router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end h-64 px-3">
                    <div class="w-1/2 relative h-full">
                        <img
                                src="./../assets/press_release_1.jpg"
                                alt=""
                                class="absolute z-30 inset-0 h-full w-full object-cover object-center">
                    </div>
                </div>
            </div>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'PressTemplate',
        data() {
            return {
                menuItems: [
                    {
                        title: 'headings.news',
                        to: 'news'
                    },
                    {
                        title: 'headings.press_releases',
                        to: 'press-release'
                    },
                    {
                        title: 'headings.press_about_us',
                        to: 'press-about-us'
                    }
                ]
            }
        }
    }
</script>