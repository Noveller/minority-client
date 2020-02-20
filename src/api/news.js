import ApiService from "./api.service";
import {MediaApi} from "./index";

const news = {
    async all(params = {'_embed': true}) {
        const { data, headers } = await ApiService.get('news', { params });

        return {
            data: data.map(pressItem => {
                const media = pressItem['_embedded']['wp:featuredmedia'];
                return {
                    id: pressItem.id,
                    title: pressItem.title.rendered,
                    short_description: pressItem.short_description,
                    media: media ? media[0].media_details.sizes : null,
                    date: pressItem.date
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
        const { data } = await ApiService.get(`news/${id}`);
        const { featured_media } = data;

        return {
            id: data.id,
            title: data.title.rendered,
            content: data.content.rendered,
            media: await MediaApi.byFeaturedMediaId(featured_media),
            date: data.date
        };
    }
};

export default news;