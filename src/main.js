/** @format */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';
import VTooltip from 'v-tooltip';

import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
Vue.use(VTooltip);
Vue.config.productionTip = false;

const loadLocaleMessages = () => {
  const locales = require.context('./lang', true, /.+\.json$/i);
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
};

let locale = navigator.language;
if(locale && locale.length === 2){ // hack for Firefox
  locale = locale + '-' + locale.toUpperCase();
}
console.log(locale)
const i18n = new VueI18n({
  fallbackLocale: 'fr',
  locale: locale,
  messages: loadLocaleMessages(),
});

new Vue({
  router,
  vuetify,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app');
