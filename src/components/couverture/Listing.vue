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
              @input="changed"
              dense
              :filter="customFilter"
              :label="$t('general.searchCompany')"
              :no-data-text="$t('general.noSuggest')"
              solo
              clearable
              auto-select-first
              append-icon="search"
              small-chips
              deletable-chips
              chips
              :items="companies"
              return-object
              item-value="name"
              :item-text="(item) => `${item.name} (${item.isin})`"
              block
            >
             <!-- <template v-slot:selection="{ item }">
                  <v-chip color="blue">{{ item ? item.name : ''}}</v-chip>
                </template> -->
                
              <template v-slot:item="{ item }">
                  <span left>{{ item.name }}</span>
                  <v-spacer></v-spacer>
                  <span class="grey--text" right>
                    {{ item.isin }}
                  </span>
              </template>

            </v-autocomplete>
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
                v-model="category"
                chips
                multiple
                :items="initialCategory"
                label="Choisir une catégory"
              ></v-select>

              <p>{{ $t('general.assetType') }}</p>
              <v-select
                v-model="assetType"
                chips
                multiple
                :items="initialAsset"
                label="Choisir une classe actif"
              ></v-select>

              <p>{{ $t('general.sector') }}</p>
              <v-select
              v-model="sector"
                chips
                multiple
                :items="initialSector"
                label="Choisir un secteur d'activité"
              ></v-select>
            </v-card-text>
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
                    item.category.charAt(0).toUpperCase() +
                      item.category.slice(1)
                  }}
                </td>
                <td>
                  {{ item.assettype.charAt(0).toUpperCase() + item.assettype.slice(1) }}
                </td>
                <td>
                  {{ item.sector.charAt(0).toUpperCase() + item.sector.slice(1) }}
                </td>
                <td style="text-align:center">
                  <span :class="`${getOdd(item.odd)}--text subtitle-1`">{{
                    item.odd.charAt(0).toUpperCase() + item.odd.slice(1)
                  }}</span>
                </td>
                <td style="text-align:center">
                  <v-chip label :class="`white--text ${getContreverse(item.contreverse)}`">
                    {{ item.contreverse }}</v-chip
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
    setTimeout(() => {
      (this.desserts = desserts)
      this.initialCategory = this.desserts.map((elt) => elt.category.charAt(0).toUpperCase() + elt.category.slice(1))
      this.initialSector = this.desserts.map((elt) => elt.sector.charAt(0).toUpperCase() + elt.sector.slice(1))
      this.initialAsset = this.desserts.map((elt) => elt.assettype.charAt(0).toUpperCase() + elt.assettype.slice(1))
    }, 1500);

  },
  data: () => ({
    initialCategory: [],
    initialAsset: [],
    initialSector: [],
    category: [],
    assetType: [],
    sector: [],
    search: '',
    loading: true,
    openFilter: false,
    companies: [
      {
        name: "BNP Paribas",
        isin: "FR2798564212"
      },
      {
        name: "Accor Hotel",
        isin: "FR1728365467"
      },
      {
        name: "Bouygues Immobilier",
        isin: "FR2738364408"
      },
      {
        name: "Cofidis",
        isin: "FR1728974508"
      },
      {
        name: "SFR",
        isin: "FR2738775512"
      },
      {
        name: "Orange",
        isin: "FR1732776506"
      },
      {
        name: "Mercedes-Benz",
        isin: "FR2771796636"
      },
      {
        name: "Peugeot",
        isin: "FR6751592336"
      },
      {
        name: "Alstom",
        isin: "FR6752572550"
      },
      {
        name: "Air Liquide",
        isin: "FR1738574598"
      },
      {
        name: "Areva",
        isin: "FR7788554526"
      },
      {
        name: "Axa",
        isin: "FR8768452519"
      },
    ],
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
        value: 'category',
        align: 'left',
      },
      {
        text: this.$t('general.category'),
        value: 'assettype',
        class: 'font-weight-black headtitle',
        align: 'left',
      },
      {
        text: this.$t('general.sector'),
        value: 'sector',
        class: 'font-weight-black headtitle',
        align: 'left',
      },
      {
        text: 'ODD',
        value: 'odd',
        sortable: true,
        class: 'font-weight-black headtitle item odd',
        align: 'center',
      },
      {
        text: this.$t('general.controversies'),
        value: 'contreverse',
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
      const categories = this.category.map((elt) => typeof(elt) == "string" ? elt.toLowerCase() : null)
        const sectors = this.sector.map((elt) => typeof(elt) == "string" ? elt.toLowerCase() : null)
        const assetTypes =  this.assetType.map((elt) => typeof(elt) == "string" ? elt.toLowerCase() : null)
        let results = this.desserts;
        
      if (this.search.length >= 3 ||  categories.length ||  sectors.length || assetTypes.length)  {
        
        if(this.search.length >= 3 ){
          let rex = new RegExp(this.search, 'ig');
          results = this.desserts.filter(dessert => rex.test(dessert.name));
        }
       if(categories.length){
        results = results.filter((elt) => categories.includes(elt.category.toLowerCase()))
       }
       if(sectors.length){
        results = results.filter((elt) => sectors.includes(elt.sector.toLowerCase()))
       }
       if(assetTypes.length){
        results = results.filter((elt) => assetTypes.includes(elt.assettype.toLowerCase()))
       }
        return results;
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
    filterSearch(){
      console.log(this.category)
      console.log(this.sector)
      console.log(this.assetType)
      this.openFilter = false
    },
    changed(val){
      this.search  = val && val.name  ? val.name : '';
    },
    customFilter(item, queryText) {
      let textName = item.name ? item.name.toLowerCase() : '';
      let textISIN = item.isin ? item.isin.toLowerCase() : '';
      let searchText = queryText.toLowerCase();
      return (
          textName.indexOf(searchText) > -1 || textISIN.indexOf(searchText) > -1
      );
    },

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
    getContreverse(val) {
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
