<template>
    <div class="loader rounded-full border-blue-400 border-gray-100" :style="styles"></div>
</template>

<script>
    export default {
        name: 'Spinner',
        computed: {
            border() {
                return `border-${this.borderWidth}`
            },
            styles() {
                return {
                    borderWidth: `${this.stroke}px`,
                    height: `${this.size}px`,
                    width: `${this.size}px`,
                    borderColor: this.baseColor,
                    borderRightColor: this.secondColor
                }
            }
        },
        props: {
            baseColor: {
                type: String,
                default: '#f36f56'
            },
            secondColor: {
                type: String,
                default: '#a0a0a00f'
            },
            size: {
                type: String,
                default: '40'
            },
            stroke: {
                type: String,
                default: '4'
            }
        }
    }
</script>

<style scoped>
    @keyframes rotate-s-loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .loader {
        animation: rotate-s-loader 1s linear infinite;
    }
</style>