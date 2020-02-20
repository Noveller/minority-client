import {LOADING_ACTION} from "../store";
import {mapState} from "vuex";

const loading = {
    computed: mapState({
        loading: state => state.loading
    }),
    methods: {
        async showLoader() {
            await this.$store.dispatch(LOADING_ACTION, true)
        },
        async hideLoader() {
            await this.$store.dispatch(LOADING_ACTION, false)
        }
    }
};

export default loading;
