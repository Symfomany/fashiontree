<!-- @format -->

<template>
  <v-app-bar app color="white" hide-on-scroll elevate-on-scroll fade-on-scroll>
    <div class="d-flex align-center">
      <router-link to="/"
        ><v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="http://www.gaia-rating.com/index.php/wp-content/uploads/2017/05/gaia-rating-copie-bd-2.png"
          transition="scale-transition"
          width="50"
      /></router-link>
    </div>

    <v-tabs v-if="isConnected" centered>
      <v-tab :key="1" :href="`#tab-1`"
        ><v-icon left>list</v-icon> {{ $t('general.listing') }}</v-tab
      >
      <v-tab :key="2" :href="`#tab-2`"
        ><v-icon left>question_answer</v-icon>
        {{ $t('general.questionnaire') }}</v-tab
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
        <v-btn transparent v-on="on" icon>
          <v-badge top left>
            <template v-slot:badge>3</template>
            <v-icon>account_circle</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card width="300" class="borderBlue">
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-avatar
                    left
                    class="white--text headline"
                    size="36px"
                    color="primary"
                    >BJ</v-avatar
                  >
                  <span class="col-md-4">Boyer Julien</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon left>email</v-icon>
                  <span>j.boyer69003@gmail.com</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <a>
                    <v-icon left>forward</v-icon>
                    {{ $t('general.modifyPassword') }}
                  </a>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <p><v-icon left>flag</v-icon> {{ $t('general.language') }}</p>
                <v-select
                  class="pa-2"
                  v-model="$i18n.locale"
                  :items="langs"
                  item-text="langue"
                  item-value="items"
                ></v-select>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-card-actions>
          <v-btn
            v-if="isConnected"
            @click="logout"
            small
            color="red"
            class="white--text"
            ><v-icon left>lock_open</v-icon> {{ $t('general.signOut') }}</v-btn
          >
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
        <v-btn transparent v-on="on" icon
          ><v-icon left>contact_support</v-icon></v-btn
        >
      </template>
      <v-card width="400" class="borderBlue">
        <v-card-title>{{ $t('general.contact') }}</v-card-title>

        <v-card-text>
          308 Rue de la Liberté<br />
          69003 Lyon
        </v-card-text>
        <v-card-text> Téléphone: <a>+33 674585648</a> </v-card-text>
        <hr />
        <v-card-text>
          29 Boulevard de Capucines<br />
          75001 Paris
        </v-card-text>
        <v-card-text> Téléphone: <a>+33 674585648</a> </v-card-text>
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
  created() {
    this.langs = [
      { items: 'fr-FR', langue: this.$t('general.french') },
      { items: 'en-EN', langue: this.$t('general.english') },
    ];
  },
  data: () => ({
    langs: [],
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
