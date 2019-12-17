/** @format */

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '../styles/main.scss';
import frFR from 'vuetify/es5/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { frFR },
    current: 'frFR',
  },
  theme: {
    themes: {
      light: {
        primary: '#2196f3',
        secondary: '#03a9f4',
        accent: '#00bcd4',
        error: '#009688',
        warning: '#4caf50',
        info: '#e91e63',
        success: '#3f51b5',
      },
    },
  },
});
