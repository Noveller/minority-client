import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from './en';
import ro from './ro';
import ru from './ru';

Vue.use(VueI18n);

const currentLang = localStorage.getItem('lang');


export const i18n = new VueI18n({
   locale: currentLang || 'en',
   fallbackLocale: 'ro',
   messages: {
       en,
       ro,
       ru
   }
});

