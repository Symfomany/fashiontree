<!-- @format -->

<template>
  <v-container>
    <v-layout text-center wrap>
      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">{{ sexe ? 'Homme' : 'Femme' }}</div>
            <v-list-item-title class="headline mb-1"
              >{{ firstname }} de {{ city }}</v-list-item-title
            >
            <v-list-item-subtitle class="headline mb-3">{{
              zipcode
            }}</v-list-item-subtitle>
            <v-list-item-subtitle class="mb-2"
              >{{ nbChildrens }} enfants</v-list-item-subtitle
            >
            <v-text-field
              :rules="ageRules"
              readonly
              v-model="age"
              label="Age"
              required
            ></v-text-field>
            <div class="text-center">
              <v-btn class="mx-2" @click="increase" color="primary">
                <v-icon>mdi mdi-plus</v-icon>
              </v-btn>
              <v-btn class="mx-2" white @click="decrease" color="red">
                <v-icon>mdi mdi-minus</v-icon>
              </v-btn>
            </div>
          </v-list-item-content>
          <v-list-item-avatar tile size="80" color="white"
            ><img :src="svg"
          /></v-list-item-avatar>
        </v-list-item>
      </v-card>
      <Form redirect="recommandation" :isConfirmed="true" />
    </v-layout>
  </v-container>
</template>

<script>
import Form from './Form';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'Confirmation',
  components: {
    Form,
  },
  data: () => ({
    ageRules: [
      v => !!v || 'Age is required',
      v => v <= 99 || 'Age must be less than 10 characters',
    ],
  }),
  computed: {
    ...mapState('user', {
      age: state => state.age,
      sexe: state => state.sexe,
      firstname: state => state.firstname,
      city: state => state.city,
      zipcode: state => state.zipcode,
      nbChildrens: state => state.nbChildrens,
      auth: state => state.auth,
    }),
    ...mapGetters('user', {
      getAvatar: 'getAvatar',
    }),
    svg() {
      return `https://avatars.dicebear.com/v2/avataaars/example.svg?${this.getAvatar}`;
    },
  },
  async created() {
    // TODO: API doesn't work on POST api/get/contact_data
  },
  methods: {
    increase() {
      this.$store.commit('user/increaseAge');
    },
    decrease() {
      this.$store.commit('user/decreaseAge');
    },
  },
};
</script>
