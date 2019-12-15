<!-- @format -->

<template>
  <v-app-bar app color="white" hide-on-scroll elevate-on-scroll fade-on-scroll>
    <div class="d-flex align-center">
      <router-link to="/"
        ><v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="http://onetrack-esg.com/images/logo-OneTrack.png"
          transition="scale-transition"
          width="120"
      /></router-link>
    </div>

    <v-tabs v-if="isConnected" centered>
      <v-tab :key="1" :href="`#tab-1`"
        ><v-icon left>list</v-icon> Listing</v-tab
      >
      <v-tab :key="2" :href="`#tab-2`"
        ><v-icon left>question_answer</v-icon> Questionnaire</v-tab
      >
    </v-tabs>

    <v-spacer></v-spacer>

    <v-btn
      v-if="isConnected"
      v-tooltip="{
        content: '<h3>Mon compte</h3> <p> Liste</p>',
        trigger: 'click',
        html: true,
      }"
      icon
    >
      <v-icon>account_circle</v-icon>
    </v-btn>

    <v-btn
      v-tooltip="{
        content: 'Tooltip content here',
        trigger: 'click',
      }"
      icon
    >
      <v-icon>contact_support</v-icon>
    </v-btn>

    <v-btn v-if="isConnected" @click="logout" icon>
      <v-icon>lock</v-icon>
    </v-btn>

    <v-popover>
      <div slot="popover"></div>
    </v-popover>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    show: false,
  }),
  computed: {
    ...mapState('user', {
      isConnected: state => state.connected,
    }),
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
