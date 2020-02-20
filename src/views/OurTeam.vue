<template>
    <div class="h-full bg-gray-25">
        <div class="m-auto">
            <div class="flex flex-col sm:flex-row sm:h-64 relative">
                <div class="sm:w-1/2 relative h-full">
                    <img src="../assets/our_team.jpg"
                         alt=""
                         class="sm:absolute z-40 inset-0 h-full w-full object-cover object-center" />
                </div>
                <div class="sm:absolute inset-0 bg-white flex flex-col sm:items-end justify-center px-3 sm:px-0 pb-4 sm:pb-0">
                    <div class="z-40 sm:w-3/5 flex items-center">
                        <h1 class="sm:pl-8 py-6 bg-white uppercase w-full font-semibold text-4xl">meat our team</h1>
                    </div>
                    <ul class="sm:w-1/2 flex flex-col mt-1 sm:mt-5 sm:pl-4">
                        <li class="mt-4">
                            <div class="h-1 bg-orange-100 rounded-sm w-12 mb-1"></div>
                            <a href="#" class="text-sm uppercase text-gray-200 hover:text-gray-300">european centre for minority issues</a>
                        </li>
                        <li class="mt-4">
                            <div class="h-1 bg-orange-100 rounded-sm w-12 mb-1"></div>
                            <a href="#" class="text-sm uppercase text-gray-200 hover:text-gray-300">minority youth moldova</a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <div class="px-10 sm:px-0 w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 m-auto pt-3 pb-6">
            <OurTeamCard v-for="(item, index) in team" :item="item" :key="`card-${index}`"></OurTeamCard>
        </div>
    </div>
</template>

<script>
    import OurTeamCard from "../components/OurTeamCard";
    import team1 from "../assets/team-1.jpg";
    import team2 from "../assets/team-2.jpg";
    import team3 from "../assets/team-3.jpg";
    import team4 from "../assets/team-4.jpg";
    import {TeamApi} from "../api";
    import loading from "../mixins/loading";

    export default {
        name: 'OurTeam',
        components: {OurTeamCard},
        mixins: [loading],
        data() {
            return {
                imgs: [team1, team2, team3, team4],
                team: []
            }
        },
        async mounted() {
            await this.init();
            this.hideLoader();
        },
        methods: {
            async init() {
                this.team = await TeamApi.all();
            }
        }
    }
</script>