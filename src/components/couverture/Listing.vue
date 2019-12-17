<template>
  <v-row>
    
         
    <v-col cols="1">
      <AlphabetSort :occurences="getOcc" />
    </v-col>
    <v-col :cols="isMobile() ? 12 : 11">
      <v-card>
        <v-card-title class="mb-n6">
          <span class="bold" v-if="getFilterDesserts.length"
            >{{ getFilterDesserts.length + ' résultats de recherche entreprises' }}
          </span>
          <v-spacer></v-spacer>
        <v-row>
          <v-autocomplete
            v-model="search"
            no-data-text="Aucune suggestion à proposer"
            solo
            clearable
            append-icon="search"
            label="Rechercher un nom, un ISN, un SIRET..."
            :items="components"
            block
          ></v-autocomplete > 
        </v-row>
        </v-card-title>
    
      <v-menu      
            v-model="openFilter"
            max-width="400"
            :close-on-content-click="false"
            transition="slide-y-transition"
          >
        <template v-slot:activator="{ on }">

         <v-row no-gutters class="ml-3">
          <v-btn ref="filter" @click="openFilter = true" color="blue" class="white--text"><v-icon left>filter_list</v-icon> Filtrer la recherche</v-btn>
        </v-row>
        </template>
       
            <v-card
            
              class="borderBlue"
            >
              <v-card-title>Filtrer la recherche</v-card-title>

              <v-card-text>
                <p>Catégorie</p>
                <v-select
                chips
                multiple
                  :items="['Immobilier', 'Exploitation', 'Medical', 'Domestique']"
                  label="Immobilier"
                ></v-select>

                <p>Classe d'actifs</p>
                <v-select
                chips
                multiple
                  :items="['Exploitation', 'Medical', 'Domestique']"
                  label="Exploitation"
                ></v-select>

               
                <p>Secteurs d'activité</p>
                <v-select
                chips
                multiple
                  :items="['Immobilier commerce', 'Immobilier medical', 'Immobilier logistique']"
                  label="Immobilier commerce"
                ></v-select>
              </v-card-text>

              <v-card-actions>
                <v-row align="center" justify="center">
                  <v-btn @click="openFilter = false" color="primary"
                    >Filtrer ma recherche</v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-menu>
        
        <v-data-table
          dense
          no-data-text="Aucune données pour le moment"
          no-results-text="Aucune données dans la recherche"
          sortBy="name"
          :loading="loading"
          loading-text="Loading... Please wait"
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
            Aucun résultat trouvé
          </template>

          <template v-slot:no-data>
            Aucun résultat
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
import { desserts, headers } from '../../data/datas';
export default {
  created() {
    setTimeout(() => (this.loading = false), 2000);
    setTimeout(() => this.desserts = desserts, 1500);
    
  },
  data: () => ({
    search: '',
    loading: true,
    openFilter: false,
    components: [
      '*',
      'sandwitch',
      'cream',
      'Yogurt',
      'Frozen',
      'Ice',
    ],
    headers: headers,
    desserts: [],
  }),
  components: {
    AlphabetSort,
  },
  computed: {
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
          return 'font-weight-black red';
        case 'faible':
          return 'font-weight-bold orange';
        case 'importante':
          return 'font-weight-medium teal';
        default:
          return 'ont-weight-regular  blue';
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

table tr:hover{
  cursor: zoom-in;
}
.theme--light.v-data-table thead {
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.2);
}
.theme--light.v-data-table thead tr:last-child th {
  font-size: 16px;
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
