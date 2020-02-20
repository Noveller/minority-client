<template>
    <div class="md:w-2/3 xl:w-1/2 rounded-sm border-4 border-gray-100 relative py-10">
        <p class="text-center text-gray-100 px-3">{{$t('join_the_community.text')}}</p>
        <button class="rounded-sm button bg-gray-100 text-white uppercase p-2 focus:outline-none m-auto">{{$t('join_the_community.button_text')}}</button>
<!--        <button class="rounded-sm button bg-gray-100 text-white uppercase p-2 focus:outline-none m-auto">{{$t('buttons.join_the_community')}}</button>-->
    </div>
</template>

<script>
    export default {
        name: 'JoinTheCommunity'
    }
</script>

<style scoped>
    .button {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: -22px;
    }
</style>