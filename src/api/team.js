import ApiService from "./api.service";

const team = {
  async all(params = {'_embed': true}) {
      const { data } = await ApiService.get('team', { params });

      return data.map(teamItem => {
          const media = teamItem['_embedded']['wp:featuredmedia'];
          return {

              id: teamItem.id,
              full_name: teamItem.title.rendered,
              position: teamItem.position,
              organization_name: teamItem.organization_name,
              short_description: teamItem.short_description,
              media: media ? media[0].media_details.sizes : null
          }
      })
  }
};

export default team;