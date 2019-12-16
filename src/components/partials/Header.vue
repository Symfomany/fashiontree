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
  
    
          <v-menu
            v-model="openExport"
            :offset-y="true"
            :close-on-content-click="false"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                transparent
                v-on="on"
                icon
                ><v-icon left>account_circle</v-icon></v-btn
              >
            </template>
            <v-card
              width="500"
              class="borderBlue"
            >
              <v-card-title>
                <v-avatar left class="white--text headline" size="36px" color="teal" >BJ</v-avatar>
              <span class="col-md-4">Boyer Julien</span></v-card-title>

              <v-card-text>
               <v-icon left>email</v-icon> <span>j.boyer69003@gmail.com</span>
              </v-card-text>
              <hr />
              <v-card-text  class="d-flex flex-row justify-space-around align-center">
                
               <p><v-icon left>flag</v-icon> Langue</p>
                <v-combobox
                class="pa-2"
                v-model="langue"
                :items="['Français', 'Anglais']"
              ></v-combobox>
              </v-card-text>
               <v-card-actions>
                  <v-btn v-if="isConnected"  big color="blue" class="white--text"><v-icon left>autorenew</v-icon> Modifier le Mot de Passe</v-btn>
                <v-btn v-if="isConnected" @click="logout"  big color="red" class="white--text"><v-icon left>lock_open</v-icon> Déconnexion</v-btn>
               </v-card-actions>
            </v-card>
          </v-menu>
   
   
     <v-menu
            v-model="openExportTwo"
            :offset-y="true"
            :close-on-content-click="false"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                transparent
                v-on="on"
                icon
                ><v-icon left>contact_support</v-icon></v-btn
              >
            </template>
            <v-card
              width="400"
              class="borderBlue"
            >
              <v-card-title>Contact</v-card-title>

              <v-card-text>
               308 Rue de la Liberté<br/>
               69003 Lyon
              </v-card-text>
               <v-card-text>
               Téléphone: <a>+33 674585648</a>
              </v-card-text>
              <hr />
              <v-card-text>
               29 Boulevard de Capucines<br/>
               75001 Paris
              </v-card-text>
               <v-card-text>
               Téléphone: <a>+33 674585648</a>
              </v-card-text>
            </v-card>
          </v-menu>

    <v-popover>
      <div slot="popover"></div>
    </v-popover>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    langue: 'Français',
    show: false,
    openExport: false,
    openExportTwo: false,
  }),
  computed: {
    ...mapState('user', {
      isConnected: state => state.connected,
    }),
  },
  methods: {
    logout() {
      this.openExport = false;
      this.openExportTwo = false;
      localStorage.removeItem('token');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
