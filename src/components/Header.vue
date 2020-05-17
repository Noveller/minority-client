<template>
    <div>

        <div class="container m-auto px-3">
            <div class="flex justify-end py-2 -mx-1">
                <div class="px-1"><a @click="setLocale('en')" href="#"><flag iso="us"></flag></a></div>
                <div class="px-1"><a @click="setLocale('ro')" href="#"><flag iso="ro"></flag></a></div>
                <div class="px-1"><a @click="setLocale('ru')" href="#"><flag iso="ru"></flag></a></div>
            </div>
            <div class="flex flex-col lg:flex-row lg:items-end justify-end my-2">
                <div class="flex justify-between lg:justify-start">
                    <div class="mr-2">
                        <router-link :to="{name: 'home'}">
                            <img src="../assets/logo1.png" alt="" class="w-32 h-12 object-scale-down">
                        </router-link>
                    </div>
                    <div class="ml-2">
                        <router-link :to="{name: 'home'}">
                            <img src="../assets/logo2.png" alt="" class="w-32 h-12 object-scale-down">
                        </router-link>
                    </div>

                </div>
                <div class="flex-1">
                    <Navigation class="lg:ml-24" :items="menuItems"/>
                </div>
            </div>
        </div>
        <div class="bg-gray-200 h-2 mt-4"></div>
    </div>
</template>

<script>
    import Navigation from "./Navigation"
    export default {
        name: 'Header',
        components: {Navigation},
        methods: {
          setLocale(locale) {
            localStorage.setItem('lang', locale);
            location.reload();
          }
        },
        data: () => {
            return {
                menuItems: [
                    {
                        title: 'menu.home',
                        to: 'home',
                    },
                    {
                        title: 'menu.press',
                        children: [
                            {
                                title: 'menu.press_releases',
                                to: 'press-release'
                            },
                            {
                                title: 'menu.press_about_us',
                                to: 'press-about-us'
                            }
                        ]
                    },
                    // {
                    //     title: 'menu.our_team',
                    //     to: 'team'
                    // },
                    {
                        title: 'menu.stories',
                        to: 'stories'
                    },
                    // {
                    //     title: 'menu.news',
                    //     to: 'news'
                    // },
                    {
                        title: 'menu.gallery',
                        to: 'image-gallery'
                    }
                ]
            }
        }
    }
</script>
