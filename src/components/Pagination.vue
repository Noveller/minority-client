<template>
    <div class="flex justify-between ">
<!--        <button class="py-2 px-4 bg-gray-600 text-sm rounded text-gray-200" :class="[isFirstPage ? 'cursor-not-allowed': 'cursor-pointer']" :disabled="isFirstPage" @click="previousButtonClick">назад</button>-->
        <div class="flex">
            <template v-for="page in pages">
                <div v-if="page !== '...'" :key="page" :class="[page === currentPage ? 'bg-orange-100' : 'bg-gray-100']"
                     class="px-3 py-2 ml-2 cursor-pointer text-white rounded text-sm hover:bg-blue-400 " @click.prevent="pageSelected(page)">
                    <a>{{ page }}</a>
                </div>
                <div v-else :key="page" :class="[page === currentPage ? 'bg-blue-400' : 'bg-gray-800']"
                     class="px-3 py-2 ml-2 text-white rounded text-sm">
                    {{ page }}
                </div>
            </template>
        </div>
<!--        <button class="py-2 px-4 bg-gray-600 text-sm rounded text-gray-200" :class="[isLastPage ? 'cursor-not-allowed': 'cursor-pointer']" :disabled="isLastPage" @click="nextButtonClick">вперед</button>-->
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            currentPage: {
                type: Number,
                required: true
            },
            totalPages: {
                type: Number,
                required: true
            },
            range: {
                type: Number,
                default: 7
            }
        },
        computed: {
            pages() {
                const delta = 2;
                const range = [];

                for (let i = Math.max(2, (this.currentPage - delta)); i <= Math.min((this.totalPages - 1), (this.currentPage + delta)); i += 1) {
                    range.push(i);
                }

                if ((this.currentPage - delta) > 2) {
                    range.unshift('...');
                }

                if ((this.currentPage + delta) < (this.totalPages - 1)) {
                    range.push('...');
                }

                range.unshift(1);
                if (this.totalPages !== 1) {
                    range.push(this.totalPages);
                }

                return range
            },

            isFirstPage() {
                return this.currentPage <= 1
            },

            isLastPage() {
                return this.currentPage >= this.totalPages
            }
        },
        methods: {
            pageSelected(page) {
                this.$emit('changed', page)
            },
            nextButtonClick() {
                if (this.currentPage < this.totalPages) {
                    this.pageSelected(this.currentPage + 1)
                }
            },
            previousButtonClick() {
                if (this.currentPage > 1) {
                    this.pageSelected(this.currentPage - 1)
                }
            }
        }
    }
</script>

<style scoped>

</style>