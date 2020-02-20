import ApiService from "./api.service";

const home = {
    async all(params =  { '_embed': true }) {
        const { data } = await ApiService.get('home', { params });

        return data.map(item => {
            const media = item['_embedded'] && item['_embedded']['wp:featuredmedia'];

            return {
                title: item.title.rendered,
                content: item.content.rendered,
                members_count: item.members_count,
                districts_count: item.districts_count,
                media: media ? media[0].media_details.sizes : null
            }
        });
    }
};

export default home;