<template>
  <v-container>
    <v-layout>
      <v-card outlined :loading="loading" class="borderBlue mx-auto" min-width="100%">
        <v-row no-gutters>
          <v-avatar class="ma-2" color="blue" size="62">
            <span class="white--text headline">{{ entreprise.noteG }}</span>
          </v-avatar>

          <div class="mx-auto">
            <v-card-title>
              <span>{{ entreprise.name }}</span>
            </v-card-title>
            <v-card-subtitle>{{ entreprise.sector }}</v-card-subtitle>
          </div>

          <div class="ma-2">
            <v-btn right rounded large color="primary" big>
              <v-icon left>cloud_download</v-icon>
              {{ $t('general.export') }}
            </v-btn>
          </div>
        </v-row>

        <v-tabs v-model="tab" :centered="true" :grow="true">
          <v-tab key="performance">
            <v-icon left>show_chart</v-icon>
            {{ $t('general.ESGPerformance') }}
          </v-tab>
          <v-tab key="infos">
            <v-icon left>info</v-icon>Infos
          </v-tab>
          <v-tab key="investissement">
            <v-icon left>euro_symbol</v-icon>
            {{ $t('general.investissementThemathique') }}
          </v-tab>
          <v-tab key="contreverse">
            <v-icon left>notification_important</v-icon>
            {{ $t('general.controversies') }}
          </v-tab>
          <v-tab key="societes">
            <v-icon left>location_city</v-icon>
            {{ $t('general.peerGroup') }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item key="performance">
            <v-card-text>
              <v-row no-gutters justify="center" align="center">
                <v-card class="mx-auto blueShadow">
                  <v-card-title>
                    <v-icon left>trending_up</v-icon>
                    {{ $t('general.trends') }}
                  </v-card-title>
                  <apexcharts width="490" type="bar" :options="options" :series="series"></apexcharts>
                </v-card>
                <v-card class="mx-auto blueShadow">
                  <v-card-title>
                    <v-icon left>track_changes</v-icon>
                    {{ $t('general.benchmark') }}
                  </v-card-title>
                  <apexcharts width="490" type="radar" :options="optionsTwo" :series="seriesTwo"></apexcharts>
                </v-card>
              </v-row>
              <br />
              <v-row no-gutters justify="center" align="center">
                <v-card class="mx-auto blueShadow">
                  <v-card-title>
                    <v-icon left>search</v-icon>
                    {{ $t('general.details') }}
                  </v-card-title>
                  <v-data-table
                    disable-filtering
                    disable-pagination
                    disable-sort
                    no-data-text
                    :headers="headers"
                    :items="desserts"
                    group-by="category"
                    class="elevation-1 detailTable"
                  >
                    <template class="align-center" v-slot:group.header="{ group }">
                      <td @click="openQuestions" class="subtitle-1">
                        <b>
                          <a class="text--darken-1 grey--text">{{ group }}</a>
                        </b>
                      </td>
                      <td style="text-align:center; font-size:18px; font-weight:bold">
                        100
                        <v-icon right>trending_up</v-icon>
                      </td>
                      <td style="text-align:center; font-size:18px;font-weight:bold">100</td>
                      <td style="text-align:center; font-size:18px;font-weight:bold">
                        100
                        <v-icon right>trending_down</v-icon>
                      </td>
                      <td style="text-align:center; font-size:18px;font-weight:bold">
                        100
                        <v-icon
                          :color="
                            colorsSpeed[Math.floor(Math.random() * (4 - 1 + 1))]
                          "
                          right
                        >speed</v-icon>
                      </td>
                    </template>

                    <template v-slot:header.2016>
                      <th class="subtitle-1 odd white--text font-weight-bold">2016</th>
                    </template>
                    <template v-slot:header.2017>
                      <th class="subtitle-1 contreverse white--text font-weight-bold">2017</th>
                    </template>
                    <template v-slot:header.2018>
                      <th class="subtitle-1 noteg white--text font-weight-bold">2018</th>
                    </template>
                    <template v-slot:header.benchmark>
                      <th
                        class="subtitle-1 pink lighten-2 white--text font-weight-bold"
                      >{{ $t('general.benchmark') }}</th>
                    </template>
                  </v-data-table>

                  <v-card-actions>
                    <v-row row>
                      <v-col>
                        <v-icon :color="colorsSpeed[1]" right>speed</v-icon>
                        {{ $t('general.belowBenchmark') }}
                      </v-col>
                      <v-col>
                        <v-icon :color="colorsSpeed[0]" right>speed</v-icon>
                        {{ $t('general.inlineBenchmark') }}
                      </v-col>
                      <v-col>
                        <v-icon :color="colorsSpeed[2]" right>speed</v-icon>
                        {{ $t('general.aboveBenchmark') }}
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-row>
              <br />
              <v-row align="center">
                <div class="text-center">
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on }">
                      <v-btn transparent v-on="on">
                        <v-icon left>account_balance</v-icon>
                        {{ $t("general.legalNotice")}}
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>
                      <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-row>
            </v-card-text>
          </v-tab-item>
          <v-tab-item key="infos">
            <v-container>
              <v-row align="start">
                <v-card class="pa-2" flat cols="5">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Adresse</v-list-item-title>
                      <v-list-item-subtitle>308 Rue de la Liberté, Lyon 69002</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Président</v-list-item-title>
                      <v-list-item-subtitle>M. Michel Cochourd</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Reponsable Relations Investisseurs</v-list-item-title>
                      <v-list-item-subtitle>Mme. Sylvie Cripolt</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Société de communication</v-list-item-title>
                      <v-list-item-subtitle>Agence Braax Publicité, Paris 75002</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
                <v-card class="pa-2" tile flat cols="5">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Code ISIN</v-list-item-title>
                      <v-list-item-subtitle>FR6458643321</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Code Bloomberg</v-list-item-title>
                      <v-list-item-subtitle>A5DOE41</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Secteur</v-list-item-title>
                      <v-list-item-subtitle>
                        <ul>
                          <li>Immobilier</li>
                          <li>Finance</li>
                        </ul>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Marches</v-list-item-title>
                      <v-list-item-subtitle>Compartiment B</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item key="investissement">
            <v-container>
              <v-col cols="12">
                <p>{{ $t("general.investment")}}</p>
              </v-col>
            </v-container>
          </v-tab-item>
          <v-tab-item key="contreverse">
            <v-container>
              <v-col cols="12">
                <p>{{ $t("general.controversies")}}</p>
              </v-col>
            </v-container>
          </v-tab-item>
          <v-tab-item key="societes">
            <v-container>
              <v-col cols="12">
                <v-row align="center" no-gutters>
                  <v-col sm="4">
                    <v-list class="ma-3 pa-8" flat>
                      <v-subheader>Secteur Santé</v-subheader>
                      <v-list-item-group color="primary">
                        <v-list-item v-for="i in 100" :key="i" @click="goDetail">
                          <v-list-item-content>
                            <v-list-item-title v-html="`Altira`"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-col>

                  <v-col sm="4">
                    <v-list flat class="ma-3 pa-8">
                      <v-subheader>Sous-Secteur Biotechnologies</v-subheader>
                      <v-list-item-group color="primary">
                        <v-list-item v-for="i in 100" :key="i" @click="goDetail">
                          <v-list-item-content>
                            <v-list-item-title v-html="`AB Conseil`"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-col>

                  <v-col sm="4">
                    <v-list flat class="ma-3 pa-8">
                      <v-subheader>Pays France</v-subheader>
                      <v-list-item-group color="primary">
                        <v-list-item v-for="i in 100" :key="i" @click="goDetail">
                          <v-list-item-content>
                            <v-list-item-title v-html="`Biocartis`"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-col>
                </v-row>
              </v-col>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

      <v-row>
        <v-dialog v-model="dialogTwo" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialogTwo = false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Détail</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="dialogTwo = false">{{ $t("general.close") }}</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-title>Engagement et politiques ESG des exploitants</v-card-title>
            <v-card-text>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left"></th>
                    <th class="text-left"></th>
                    <th class="text-center">2017</th>
                    <th class="text-center">2018</th>
                    <th class="text-center">2019</th>
                    <th class="text-center">Source</th>
                    <th class="text-center">Comm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <v-chip class="ma-2" label outlined>Q2097</v-chip>
                    </td>
                    <td>
                      Si locataire unique: le client/locataire a été sensibilisé
                      à la démarche d'investissement socialement responsable du
                      érantd e l'actif.
                    </td>
                    <td>N/A</td>
                    <td>Non, n'a pas montré une démarche positive</td>
                    <td>Oui, a montré une démarche positive</td>
                    <td>Calcul avec données publiques</td>
                    <td>
                      <v-btn fab class="ma-2" color="primary" outlined>
                        <v-icon @click="openComm = true" color="blue">chat</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-chip class="ma-2" label outlined>Q2099</v-chip>
                    </td>
                    <td>Si locataire unique: Annexe environement</td>
                    <td>Oui, a montré une démarche positive</td>
                    <td>Oui, a montré une démarche positive</td>
                    <td>N/A</td>
                    <td>Publications entreprises</td>
                    <td>
                      <v-btn fab class="ma-2" color="grey" outlined>
                        <v-icon @click="openComm = true" color="grey">chat</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-chip class="ma-2" label outlined>Q2091</v-chip>
                    </td>
                    <td>Si locataire unique: Annexe environement</td>
                    <td>Non, n'a pas montré une démarche positive</td>
                    <td>Oui, a montré une démarche positive</td>
                    <td>Oui, a montré une démarche positive</td>
                    <td>Calcul avec données publiques</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <v-chip class="ma-2" label outlined>Q2092</v-chip>
                    </td>
                    <td>Si locataire unique: Annexe environement</td>
                    <td>Non, n'a pas montré une démarche positive</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>Calcul avec données publiques</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <v-chip class="ma-2" label outlined>Q2093</v-chip>
                    </td>
                    <td>Si locataire unique: Annexe environement</td>
                    <td>Non, n'a pas montré une démarche positive</td>
                    <td>Oui, a montré une démarche positive</td>
                    <td>Oui, a montré une démarche positive</td>
                    <td>Calcul avec données publiques</td>
                    <td>
                      <v-btn fab class="ma-2" color="primary" outlined>
                        <v-icon @click="openComm = true" color="blue">chat</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-chip class="ma-2" label outlined>Q2095</v-chip>
                    </td>
                    <td>Si locataire unique: Annexe environement</td>
                    <td>Non, n'a pas montré une démarche positive</td>
                    <td>N/A</td>
                    <td>Oui, a montré une démarche positive</td>
                    <td>Calcul avec données publiques</td>
                    <td>
                      <v-btn fab class="ma-2" color="primary" outlined>
                        <v-icon @click="openComm = true" color="blue">chat</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-chip class="ma-2" label outlined>Q2090</v-chip>
                    </td>
                    <td>Si locataire unique: Annexe environement</td>
                    <td>Non, n'a pas montré une démarche positive</td>
                    <td>Oui, a montré une démarche positive</td>
                    <td>Oui, a montré une démarche positive</td>
                    <td>Calcul avec données publiques</td>
                    <td>
                      <v-btn fab class="ma-2" color="primary" outlined>
                        <v-icon @click="openComm = true" color="blue">chat</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>

              <v-menu
                v-model="openComm"
                :offset-y="true"
                :close-on-content-click="false"
                transition="slide-y-transition"
              >
                <v-card width="500" class="borderBlue">
                  <v-card-title>{{ $t("general.comment")}}</v-card-title>

                  <v-card-text>
                    <v-icon left>record_voice_over</v-icon>Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Duis venenatis
                    faucibus eros, eu finibus ligula. Maecenas non tortor quis
                    elit elementum venenatis. Aenean mauris justo, laoreet
                    malesuada tincidunt in, consequat non purus. Donec porttitor
                    molestie tortor, a scelerisque ex condimentum sit amet. Sed
                    ultricies leo maximus mi pellentesque commodo. Praesent ut
                    dui quis justo accumsan elementum. Integer metus enim,
                    semper at consequat eu, venenatis sed erat. Maecenas ipsum
                    lacus, malesuada ut scelerisque at, lacinia eu lectus. Duis
                    vitae venenatis turpis. Vestibulum id pellentesque sem.
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import { headers, desserts, entreprises } from '../../data/datasDetail';

export default {
  name: 'Detail',
  data: () => ({
    entreprise: {},
    openComm: false,
    dialogTwo: false,
    tab: null,
    dialog: false,
    colorsSpeed: ['orange', 'red', 'green'],
    loading: false,
    headers: headers,
    desserts: desserts.map(elt => ({
      ...elt,
      benchmark: 100,
      '2016': 100,
      '2017': 100,
      '2018': 100,
    })),
    options: {
      id: 'basic-bar',
      plotOptions: {
        bar: {
          horizontal: true,
        },
        dataLabels: {
          position: 'center', // top, center, bottom
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
        },
      },
      xaxis: {
        categories: [2018, 2017, 2016],
      },
    },
  }),
  created() {
    this.entreprise = entreprises[this.$route.params.id - 1];
    const entreprise = this.entreprise;
    this.series = [
      {
        name: 'Année 2018',
        data: [entreprise.notes['2018']],
      },
      {
        name: 'Année 2017',
        data: [entreprise.notes['2017']],
      },
      {
        name: 'Année 2016',
        data: [entreprise.notes['2016']],
      },
    ];

    const familleTitle = entreprise.familles.map(famille => famille.title);

    this.optionsTwo = {
      labels: [...familleTitle],
    };

    const benchmarkNotes = entreprise.familles.map(
      famille => famille.benchmark,
    );

    const societesNotes = entreprise.familles.map(
      famille => famille.note[2018],
    );

    console.log(societesNotes, benchmarkNotes);

    this.seriesTwo = [
      {
        name: 'Benchmark',
        data: [...benchmarkNotes],
      },
      {
        name: entreprise.name,
        data: [...societesNotes],
      },
    ];
  },
  methods: {
    goDetail() {
      this.tab = 'performance';
      //this.$router.push({ name: 'detail', params: { id: 123 } });
    },
    openQuestions() {
      this.dialogTwo = true;
    },
  },
  components: {
    apexcharts: VueApexCharts,
  },
};
</script>

<style scoped lang="scss">
.theme--light.v-data-table thead tr:last-child th {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>
