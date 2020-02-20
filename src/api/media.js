import ApiService from "./api.service";

const media = {
    async byFeaturedMediaId(id) {
        const {data: {media_details: {sizes}}} = await ApiService.get(`media/${id}`);

        return sizes;
    },

    async all(params) {
        const { data } = await ApiService.get('media', { params });
        return data;
    }
};

export default media;