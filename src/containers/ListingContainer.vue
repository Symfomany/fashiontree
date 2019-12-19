<template>
  <div>
    <v-container>
      <v-layout>
        <v-row class="d-flex ml-1 justify-space-between">
          <h3 class="display-1">{{ $t('general.coverage') }}</h3>

          <v-menu
            v-model="openExport"
            offset-y
            :close-on-content-click="false"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                :outlined="openExport"
                rounded
                large
                color="primary"
                big
                v-on="on"
                ><v-icon left>cloud_download</v-icon>
                {{ $t('general.export') }}</v-btn
              >
            </template>
            <v-card
              :loading="loading"
              class="mx-auto borderBlue"
              max-width="500"
            >
              <v-card-title>{{ $t('general.export') }} </v-card-title>

              <v-card-text>
                <p>{{ $t('general.lastyear') }}</p>
                <v-row justify="space-around">
                  <v-switch
                    class="mx-2"
                    color="primary"
                    v-model="collect_last"
                    label="Dernière année"
                  ></v-switch>
                  <v-switch
                    class="mx-2"
                    color="primary"
                    v-model="collect_2018"
                    label="2018"
                  ></v-switch>
                  <v-switch
                    color="primary"
                    class="mx-2"
                    v-model="collect_2017"
                    label="2017"
                  ></v-switch>
                  <v-switch
                    color="primary"
                    class="mx-2"
                    v-model="collect_2016"
                    label="2016"
                  ></v-switch>
                </v-row>

                <p>{{ $t('general.language') }}</p>
                <v-select
                  :items="['Français', 'Anglais']"
                  label="Français"
                ></v-select>

                <p>{{ $t('general.typeExport') }}</p>
                <v-row no-gutters>
                  <v-radio-group row>
                    <v-radio
                      key="pdf"
                      color="primary"
                      label="PDF"
                      value="pdf"
                    ></v-radio>
                    <v-radio
                      key="excel"
                      color="primary"
                      label="Excel"
                      value="excel"
                    ></v-radio>
                  </v-radio-group>
                </v-row>

                <p>{{ $t('general.referenciel') }}</p>
                <v-select
                  :items="[
                    'Gaia rating',
                    'One Track rating',
                    'B rating',
                    'C rating',
                  ]"
                  label="Gaia rating"
                ></v-select>
              </v-card-text>

              <v-card-actions>
                <v-row align="center" justify="center">
                  <v-btn @click="closeExport" color="primary"
                    >{{ $t('general.exportBtn') }}</v-btn
                  >
                </v-row>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-row>
      </v-layout>
    </v-container>

    <v-layout>
      <v-row>
        <v-col cols="12">
          <v-chip
            v-if="visible"
            class="ma-2 remonter"
            color="primary"
            text-color="white"
            @click="scrollTop"
          >
            <v-avatar left>
              <v-icon>arrow_drop_up</v-icon>
            </v-avatar>
            {{ $t('general.pull') }}
          </v-chip>
          <Listing />
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>
<script>
import Listing from '../components/couverture/Listing';

export default {
  name: 'ListingContainer',
  components: {
    Listing,
  },
  data: () => ({
    items: [
      {
        text: 'Liste des couvertures',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        text: 'Résultat de recherche',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },
    ],
    openExport: false,
    loading: false,
    visible: true,
    collect_last: false,
    collect_2018: false,
    collect_2017: false,
    collect_2016: false,
  }),
  created() {
    this.$store.commit('user/connect');

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      this.visible = y > 200;
    });
  },
  computed: {},
  methods: {
    closeExport() {
      //this.$store.dispatch('user/download');
      setTimeout(() => {
        this.openExport = false;
        this.loading = false;
      }, 3000);
      this.loading = true;
    },
    scrollTop() {
      window.scrollTo(0, 50);
    },
  },
};
</script>

<style lang="scss">
.remonter {
  position: fixed;
  top: 90%;
  right: 10px;
  z-index: 200000;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
}
</style>
