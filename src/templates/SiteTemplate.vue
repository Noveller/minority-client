<template>
    <div class="flex flex-col h-full">
        <Header></Header>
        <SiteContent class="flex-1 relative">
            <loader :show="loading" class="bg-white absolute inset-0"></loader>
            <router-view :class="{'hidden': loading}"></router-view>
        </SiteContent>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    import SiteContent from "../components/Content";

    import loading from "../mixins/loading";
    import Loader from "../components/Loader";
    export default {
        name: 'SiteTemplate',
        components: {Loader, SiteContent, Footer, Header},
        mixins: [loading],
        beforeRouteUpdate(to, from, next) {
            this.showLoader();

            next();
        }
    }
</script>