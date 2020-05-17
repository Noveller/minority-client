<template>
    <div class="shadow-md p-2">
        <div class="flex" :class="{'flex-col': vertical}">
            <div :class="{'w-1/4': !vertical}">
                <img :src="item.media.medium_large.source_url" class="w-full rounded-sm" alt="">
            </div>
            <div :class="{'ml-3 w-3/4': !vertical, 'pt-4': vertical}">
                <h5 class="leading-none text-sm font-bold text-gray-200" v-if="!vertical">{{item.title}}</h5>
                <Heading :text="item.title" v-else />
                <p class="text-xs text-gray-100" v-if="!vertical">{{createdAt}}</p>
                <p class="py-2 text-xs leading-tight text-gray-200" v-html="item.short_description"></p>
            </div>
        </div>
        <div class="text-right">
            <span @click="clickReadMore" class="cursor-pointer text-sm text-orange-100 hover:underline">{{$t('card.read_more')}}</span>
        </div>
    </div>

</template>

<script>
    import Heading from "./Heading";
    import format from "date-fns/format";
    import {  ru, en, ro } from "date-fns/locale";

    export default {
        name: 'Card',
        components: {Heading},
        computed: {
          readMoreLink() {
              return this.isNews ? `/news/${this.item.id}` : `/press-release/${this.item.id}`
          },
          createdAt() {
              return format(new Date(this.item.date), 'dd MMMM, yyyy', { locale: this.locales[this.$i18n.locale] })
          }
        },
        data() {
          return {
              locales: {
                  ru,
                  ro,
                  en
              }
          }
        },
        props: {
            isNews: {
              type: Boolean,
              default: false
            },
            item: {
              type: Object,
              required: true
            },
            vertical: {
              type: Boolean,
              default: false
            }
        },
        methods: {
            clickReadMore() {
                this.$emit('readMore', this.item);
            }
        }
    }
</script>
