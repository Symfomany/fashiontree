<template>
  <v-row>
    <v-col cols="1">
      <AlphabetSort :occurences="getOcc" />
    </v-col>
    <v-col :cols="isMobile() ? 12 : 11">
      <v-card>
        <v-card-title class="mb-n6">
          <span class="bold" v-if="getFilterDesserts.length"
            >{{ getFilterDesserts.length + ' ' + $t('general.searchResults') }}
          </span>
          <v-spacer></v-spacer>
          <v-row>
            <v-autocomplete
              v-model="search"
              no-data-text="Aucune suggestion à proposer"
              solo
              clearable
              append-icon="search"
              :label="$t('general.searchCompany')"
              :items="components"
              block
            ></v-autocomplete>
          </v-row>
        </v-card-title>

        <v-menu
          offset-y
          v-model="openFilter"
          max-width="400"
          :close-on-content-click="false"
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on }">
            <v-row no-gutters class="ml-3">
              <v-btn
                small
                ref="filter"
                @click="openFilter = true"
                color="primary"
                class="white--text"
                ><v-icon left>filter_list</v-icon>
                {{ $t('general.filterSearch') }}</v-btn
              >
            </v-row>
          </template>

          <v-card class="borderBlue">
            <v-card-title>{{ $t('general.filterSearch') }}</v-card-title>

            <v-card-text>
              <p>{{ $t('general.category') }}</p>
              <v-select
                chips
                multiple
                :items="['Immobilier', 'Exploitation', 'Medical', 'Domestique']"
                label="Immobilier"
              ></v-select>

              <p>{{ $t('general.assetType') }}</p>
              <v-select
                chips
                multiple
                :items="['Exploitation', 'Medical', 'Domestique']"
                label="Exploitation"
              ></v-select>

              <p>{{ $t('general.sector') }}</p>
              <v-select
                chips
                multiple
                :items="[
                  'Immobilier commerce',
                  'Immobilier medical',
                  'Immobilier logistique',
                ]"
                label="Immobilier commerce"
              ></v-select>
            </v-card-text>

            <v-card-actions>
              <v-row align="center" justify="center">
                <v-btn @click="openFilter = false" color="primary">{{
                  $t('general.filterSearch')
                }}</v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-data-table
          dense
          :no-data-text="$t('general.noData')"
          :no-results-text="$t('general.noData')"
          sortBy="name"
          :loading="loading"
          :loading-text="$t('general.loading')"
          :headers="headers"
          :items="getFilterDesserts"
          :items-per-page="1000"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                @click="goDetail(item, index)"
                v-for="(item, index) in items"
                :key="index"
              >
                <td>
                  {{ item.name.charAt(0).toUpperCase() + item.name.slice(1) }}
                </td>
                <td>
                  {{
                    item.calories.charAt(0).toUpperCase() +
                      item.calories.slice(1)
                  }}
                </td>
                <td>
                  {{ item.fat.charAt(0).toUpperCase() + item.fat.slice(1) }}
                </td>
                <td>
                  {{ item.carbs.charAt(0).toUpperCase() + item.carbs.slice(1) }}
                </td>
                <td style="text-align:center">
                  <span :class="`${getOdd(item.protein)}--text subtitle-1`">{{
                    item.protein.charAt(0).toUpperCase() + item.protein.slice(1)
                  }}</span>
                </td>
                <td style="text-align:center">
                  <v-chip label :class="`white--text ${getIron(item.iron)}`">
                    {{ item.iron }}</v-chip
                  >
                </td>
                <td style="text-align:center">
                  <b class="display-1 font-weight-bold">{{ item.note }}</b
                  ><br />
                  <small :class="item.annee == 2019 ? `red--text` : ``">{{
                    item.annee
                  }}</small>
                </td>
              </tr>
            </tbody>
          </template>

          <template v-slot:no-results>
            {{ $t('general.noData') }}
          </template>

          <template v-slot:no-data>
            {{ $t('general.noData') }}
          </template>

          <template v-slot:item.name="{ item }">
            <b>{{ item.name.toUpperCase() }}</b>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AlphabetSort from '../partials/AlphabetSort';
import countBy from 'lodash/countBy';
import { desserts } from '../../data/datas';
export default {
  created() {
    setTimeout(() => (this.loading = false), 2000);
    setTimeout(() => (this.desserts = desserts), 1500);

  },
  data: () => ({
    search: '',
    loading: true,
    openFilter: false,
    components: ['*', 'Cream', 'Yogurt', 'Frozen', 'Ice'],
    desserts: [],
  }),
  components: {
    AlphabetSort,
  },
  computed: {
    headers(){
      return [
      {
        text: this.$t('general.nom'),
        align: 'start',
        sortable: true,
        value: 'name',
      },
      {
        text: this.$t('general.assetType'),
        class: 'font-weight-black headtitle',
        value: 'calories',
        align: 'left',
      },
      {
        text: this.$t('general.category'),
        value: 'fat',
        class: 'font-weight-black headtitle',
        align: 'left',
      },
      {
        text: this.$t('general.sector'),
        value: 'carbs',
        class: 'font-weight-black headtitle',
        align: 'left',
      },
      {
        text: 'ODD',
        value: 'protein',
        sortable: true,
        class: 'font-weight-black headtitle item odd',
        align: 'center',
      },
      {
        text: this.$t('general.controversies'),
        value: 'iron',
        sortable: true,
        class: 'font-weight-black headtitle item contreverse',
        align: 'center',
      },
      {
        text: this.$t('general.globalScore'),
        value: 'note',
        sortable: true,
        class: 'font-weight-black headtitle item noteg',
        align: 'center',
      },
    ];
    },
    getFilterDesserts() {
      if (this.search && this.search.length >= 3) {
        let rex = new RegExp(this.search, 'ig');
        return this.desserts.filter(dessert => rex.test(dessert.name));
      } else {
        return this.desserts;
      }
    },
    getOcc() {
      const tab = [];
      this.getFilterDesserts.forEach(elt => tab.push(elt.name[0]));

      let n = countBy(tab);
      n = Object.keys(n)
        .sort()
        .reduce((r, k) => ((r[k] = n[k]), r), {});
      return n;
    },
  },
  methods: {
    goDetail(item, index) {
      this.$router.push({ name: 'detail', params: { id: index } });
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    getOdd(val) {
      switch (val) {
        case 'forte':
          return 'font-weight-black ';
        case 'faible':
          return 'font-weight-bold ';
        case 'importante':
          return 'font-weight-medium ';
        default:
          return 'ont-weight-regular  ';
      }
    },
    getIron(val) {
      switch (val) {
        case 5:
          return 'font-weight-black red';
        case 4:
          return 'font-weight-bold  orange';
        case 3:
          return 'font-weight-bold yellow';
        case 2:
          return 'font-weight-medium red';
        case 1:
          return 'font-weight-regular blue';
        default:
          return 'blue';
      }
    },
  },
};
</script>

<style lang="scss">
table tr:hover {
  cursor: zoom-in;
}
.theme--light.v-data-table thead {
}
.theme--light.v-data-table thead tr:last-child th {
  font-size: 15px;
}

.theme--light.v-data-table .item {
  width: 100px;
  color: white;
  font-size: 0.9rem;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border: 1px solid #a8d8ff;
  font-weight: bold;
  text-align: center !important;
}
</style>
