<template>
    <li :class="{
        'relative': item.children,
        'text-orange-100': isCurrent,
        'text-gray-200 hover:text-orange-200': !isCurrent && !inFooter,
        'text-gray-100 hover:text-orange-200': !isCurrent && inFooter
    }">
        <span @click="showDropDown" ref="item" class="cursor-pointer text-sm uppercase text-gray-200 hover:text-orange-200" v-if="item.children">{{$t(item.title)}}</span>
        <router-link v-else :to="{ name: item.to ? item.to : 'home' }" class="text-sm uppercase"
                     :class="isCurrent && 'font-bold underline'">{{$t(item.title)}}</router-link>
        <div ref="dropDownMenu" v-show="showDropdownMenu && item.children" class="z-50 whitespace-no-wrap">
            <transition name="general">
                <div v-if="showDropdownMenu">
                    <div class="arrow"></div>
                    <ul class="flex flex-col bg-gray-200 px-3 shadow rounded-sm rounded-t-none">
                        <li v-for="(child, index) in item.children" :key="`child-menu-item-${index}`" class="py-2">
                            <router-link class="uppercase text-white hover:underline" :to="{name: child.to}">{{$t(child.title)}}</router-link>
                        </li>
                    </ul>
                </div>
            </transition>

        </div>
    </li>
</template>

<script>
    import Popper from 'popper.js';

    export default {
        name: 'NavigationItem',
        props: {
            item: {
                type: Object,
                required: true
            },
            inFooter: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                showDropdownMenu: false,
                outsideClickEventListener: false
            }
        },
        computed: {
            isCurrent() {
                return this.$route.name === this.item.to;
            }
        },
        methods: {
            showDropDown() {
                this.setEventListener();
                this.showDropdownMenu = true;
                this.refreshPopper();
            },
            hideDropDown() {
                this.showDropdownMenu = false;
                this.removeEventListener();
            },
            refreshPopper() {
                try {
                    if (this.poper === undefined) {
                        this.poper = new Popper(this.$refs.item, this.$refs.dropDownMenu, {
                            placement: 'bottom-start',
                            placements: ['bottom-start'],
                            modifiers: {
                                offset: {
                                    offset: '-12px,28px'
                                }
                            }
                        })
                    } else {
                        this.poper.scheduleUpdate()
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            setEventListener() {
                if (this.outsideClickEventListener) {
                    return false
                }
                this.outsideClickEventListener = true;
                document.addEventListener('click', this.clickOutsideListener, true);
                return true
            },

            removeEventListener() {
                this.outsideClickEventListener = false;
                document.removeEventListener('click', this.clickOutsideListener, true)
            },
            clickOutsideListener(event) {
                event.stopPropagation();
                if (this.$refs.dropDownMenu && !this.$refs.dropDownMenu.contains(event.target)) {
                    this.hideDropDown();
                }
                return true
            },
        },
        beforeDestroy() {
            if (this.poper !== undefined) {
                this.poper.destroy()
            }
            this.removeEventListener();
        },
    }
</script>

<style scoped>
    .arrow {
        position: absolute;
        background: #606060;
        transform: rotate(45deg);
        width: 8px;
        height: 8px;
        top: -11px;
        left: 30px;
    }
</style>