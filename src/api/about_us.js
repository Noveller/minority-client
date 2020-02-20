import ApiService from "./api.service";

const about_us = {
    async all(params =  { '_embed': true }) {
        const { data, headers } = await ApiService.get('about_us', { params });

        return {
            data: data.map(item => {
                const media = item['_embedded'] && item['_embedded']['wp:featuredmedia'];

                return {
                    title: item.title.rendered,
                    content: item.content.rendered,
                    members_count: item.members_count,
                    districts_count: item.districts_count,
                    target_group_text: item.target_group_text,
                    media: media ? media[0].media_details.sizes : null
                }
            }),
            meta: {
                pagination: {
                    total: parseInt(headers['x-wp-total']),
                    totalPages: parseInt(headers['x-wp-totalpages'])
                }
            }
        };
    }
};

export default about_us;