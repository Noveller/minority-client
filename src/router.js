import Vue from 'vue';
import Router from 'vue-router';
import SiteTemplate from "./templates/SiteTemplate";
import PressRelease from "./views/PressRelease";
// import OurTeam from "./views/OurTeam";
import Stories from "./views/Stories";
import Story from "./views/Story";
import Home from "./views/Home";
import About from "./views/About";
import DisplayPressRelease from "./views/DisplayPressRelease";
// import News from "./views/News";
// import OneNews from "./views/OneNews";
import PressAboutUs from "./views/PressAboutUs";
import DisplayPressAboutUs from "./views/DisplayPressAboutUs";
import PressTemplate from "./templates/PressTemplate";
import ImageGallery from "./views/ImageGallery";

Vue.use(Router);

const siteChildrenRoutes = [
    {
      path: '',
      redirect: 'home'
    },
    {
        path: 'home',
        name: 'home',
        component: Home
    },
    {
      path: 'about',
      name: 'about',
      component: About
    },
    {
        path: 'press',
        name: 'press',
        redirect: '/press/release',
        component: PressTemplate,
        children: [
            {
                path: 'release',
                name: 'press-release',
                component: PressRelease,
                meta: {
                    page_heading: 'headings.press_releases'
                }
            },
            {
                path: 'release/:id',
                component: DisplayPressRelease,
                name: 'display-press-release'
            },
            {
                path: 'about-us',
                name: 'press-about-us',
                component: PressAboutUs,
                meta: {
                    page_heading: 'headings.press_about_us'
                }
            },
            {
                path: 'about-us/:id',
                component: DisplayPressAboutUs,
                name: 'display-press-about-us'
            },
            // {
            //     path: 'news',
            //     name: 'news',
            //     component: News,
            //     meta: {
            //         page_heading: 'headings.find_latest_news'
            //     }
            // },
            // {
            //     path: 'news/:id',
            //     component: OneNews,
            //     name: 'display-news'
            // },
        ]
    },
    // {
    //     path: 'team',
    //     name: 'team',
    //     component: OurTeam
    // },
    {
        path: 'stories',
        name: 'stories',
        component: Stories
    },
    {
        path: 'stories/:id',
        component: Story,
        name: 'story'
    },
    {
        path: 'gallery',
        component: ImageGallery,
        name: 'image-gallery'
    }
];

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            component: SiteTemplate,
            children: siteChildrenRoutes
        }
    ]
});

export default router;
