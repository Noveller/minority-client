import ApiService from "./api.service";
import {MediaApi} from "./index";

const story = {
    async all(params = {'_embed': true}) {
        const defaultParams = {'_embed': true};

        const { data, headers } = await ApiService.get('story', {params: {...defaultParams, ...params} });

        return {
            data: data.map(pressItem => {
                const media = pressItem['_embedded']['wp:featuredmedia'];
                return {

                    id: pressItem.id,
                    title: pressItem.title.rendered,
                    content: pressItem.content.rendered,
                    short_description: pressItem.short_description,
                    media: media ? media[0].media_details.sizes : null
                }
            }),
            meta: {
                pagination: {
                    total: parseInt(headers['x-wp-total']),
                    totalPages: parseInt(headers['x-wp-totalpages'])
                }
            }
        }
    },
    async one(id) {
        const { data } = await ApiService.get(`story/${id}`);
        const { featured_media } = data;

        return {
            title: data.title.rendered,
            content: data.content.rendered,
            location: data.location,
            media: await MediaApi.byFeaturedMediaId(featured_media)
        };
    }
};

export default story;