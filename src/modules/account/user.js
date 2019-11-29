import xhr from '../../plugins/axios';

export default {
  namespaced: true,
  state: {
    firstname: '',
    zipcode: '75007',
    city: 'Paris',
    age: null,
    sexe: null, // TODO: fetch the API Neuralytics
    wait: 300, // 300 => 5min.
    rayon: null,
    direction: null,
    nbChildrens: 3, // TODO: fetch the API Neuralytics
    stats: {
      chapeaux: 0,
      sweat: 0,
      vestes: 0,
      salopette: 0,
      pull: 0,
    },
    auth: {
      // Get info User from API Neuralytics
      token: null,
      user_firstname: null,
      user_lastname: null,
      user_avatar: null,
      user_id: null,
    },
  },

  mutations: {
    updateAuth(state, auth) {
      state.auth = {
        ...state.auth,
        ...auth,
      };
    },
    updateField(state, { field, input }) {
      state[field] = input;
    },
    increaseAge(state) {
      state.age++;
    },
    decreaseAge(state) {
      state.age--;
    },
    updateWait(state) {
      if (state.wait > 0) {
        state.wait--;
      } else {
        state.wait = 300;
        state.stats[state.rayon]--;
      }
    },
    updateRayon(state, { sexe, age }) {
      if (age) {
        if (age < 21) {
          state.rayon = 'salopette';
          state.direction = 'premier rayon à votre gauche ou à votre droite';
        } else if (age < 39 && sexe) {
          state.rayon = 'sweat';
          state.direction = 'dernier rayon Homme à votre droite';
        } else if (age < 39 && !sexe) {
          state.rayon = 'pull';
          state.direction = 'deuxième rayon des Femmes à votre gauche';
        } else {
          if (sexe) {
            state.rayon = 'vestes';
            state.direction = 'deuxième rayon Homme à votre droite';
          } else {
            state.rayon = 'chapeaux';
            state.direction = 'dernier rayon Femme à votre gauche';
          }
        }
        state.stats[state.rayon]++;
      }
    },
  },

  actions: {
    login() {
      return xhr.post(`/login`, {
        email: 'jimmybrumant@gmail.com',
        password: 'demoday1',
      });
    },
    loadAvatar({ state }) {
      return xhr.post(
        '/api/get/contact_data',
        {
          city: state.city,
          postal_code: state.zipcode,
          firstname: state.firstname,
          birthday: `${new Date().getFullYear() - state.age}-01-01`,
        },
        {
          headers: { 'x-access-token': state.auth.token },
        },
      );
    },
  },

  getters: {
    getAvatar(state) {
      const parsed = {
        top: state.sexe ? 'shortHair' : 'longHair',
        clothes: state.age >= 18 ? 'blazer' : 'hoodie',
        accessories: state.age >= 18 ? 'sunglasses' : 'wayfarers',
      };
      return Object.keys(parsed)
        .map(key => `options[${key}][]` + '=' + parsed[key])
        .join('&');
    },
  },
};
