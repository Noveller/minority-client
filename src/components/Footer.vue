<template>
    <div>
        <div class="bg-gray-200">
            <div class="container m-auto px-3 py-6">
                <h3 class="uppercase text-sm text-white">{{$t('contact_us')}}</h3>
                <div class="flex mt-3 flex-col lg:flex-row">
                    <div class="flex">
                        <div class="text-xs text-white pr-2">
                            <p>European Centre for Minority Issues</p>
                            <p>Schiffbruecke 12, 24939 Flensburg,</p>
                            <p>Germany</p>
                            <p>tel. +49 (0)4611 41 490</p>
                            <p>info@ecmi.de</p>
                        </div>
                        <div class="text-xs text-white pl-2">
                            <p>Minority Young Moldova</p>
                            <p>Negruzzi, Chisinau</p>
                            <p>Republic of Moldova</p>
                            <p>tel. +373 67432 917</p>
                            <p>minority.youth.moldova@gmail.com</p>
                        </div>
                    </div>
                    <div class="flex items-end flex-1 mt-4 lg:mt-0">
                        <Navigation :in-footer="true" :items="menuItems" class="w-full lg:ml-32" />
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
        <div class="bg-gray-300 text-center py-3">
            <span class="text-xs text-white">All rights reserved {{currentYear}}</span>
        </div>
    </div>
</template>

<script>
    import Navigation from "./Navigation";
    export default {
        name: 'Footer',
        components: {Navigation},
        data() {
          return {
              menuItems: [
                  {
                      title: 'menu.home',
                      to: 'home',
                  },
                  {
                      title: 'menu.press',
                      to: 'press-release'
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
        },
        computed: {
            currentYear() {
                return new Date().getFullYear();
            }
        }
    }
</script>
