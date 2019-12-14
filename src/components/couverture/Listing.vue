<template>
  <v-row>
    <v-col cols="1">
      <AlphabetSort :occurences="getOcc" />
    </v-col>
    <v-col cols="11">
      <v-card>
        <v-card-title>
          <span class="bold">{{ getFilterDesserts.length + ' entreprises' }} </span>
          <v-spacer></v-spacer>
          <v-autocomplete
            v-model="search"
             solo
            append-icon="search"
            label="Rechercher un nom, un ISN, un SIRET..."
            :items="components"
          ></v-autocomplete>
        </v-card-title>
        <v-data-table
          sortBy="name"
          :loading="loading"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="getFilterDesserts"
          :items-per-page="1000"
          class="elevation-1"
        >

        <template v-slot:item.iron="{ item }">
         <v-chip label :class="`white--text ${getIron(item.iron)}`">
            {{  item.iron }}</v-chip>
        </template>
        
        <template v-slot:item.protein="{ item }">
          <span :class="`${getOdd(item.protein)}--text subtitle-1`">{{  item.protein.charAt(0).toUpperCase() + item.protein.slice(1) }}</span>
        </template>
                
                          
        <template v-slot:item.note="{ item }">
          <b class="display-1 font-weight-bold">{{ item.note }}</b><br />
          <small :class="item.annee == 2019 ? `red--text` : ``">{{ item.annee }}</small>
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

export default {
  created() {
    setTimeout(() => (this.loading = false), 2000);
  },
  data: () => ({
    search: '',
    loading: true,
    components: [
      '*', 'sandwitch', 'cream', 'Yogurt',  'Frozen','Ice' ,'Autocompletes', 'Comboboxes', 'Forms', 'Inputs', 'Overflow Buttons', 'Selects', 'Selection Controls', 'Sliders', 'Textareas', 'Text Fields',
    ],
    headers: [
      {
        text: 'Nom',
        align: 'left',
        sortable: true,
        value: 'name',
      },
      { text: "Classe d'actifs", class:"font-weight-black headtitle", value: 'calories',align: 'center' },
      { text: 'Catégorie', value: 'fat',class:"font-weight-black headtitle",align: 'center' },
      { text: "Secteur d'activité", value: 'carbs',class:"font-weight-black headtitle",align: 'center' },
      { text: 'ODD', value: 'protein', sortable: true, class: "font-weight-black headtitle item odd", align: 'center'  },
      { text: 'Contreverse', value: 'iron', sortable: true, class: "font-weight-black headtitle item contreverse",align: 'center' },
      { text: 'Note Générale', value: 'note', sortable: true, class: "font-weight-black headtitle item noteg",align: 'center' },
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'faible',
        iron: 5,  note: 50,annee: 2019,
      },
      {
        name: 'Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2017,
      },
      {
        name: 'Eclair',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Cupcake',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 50,annee: 2019,
      },
      {
        name: 'Gingerbread',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Jelly bean',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'faible',
        iron: 3,  note: 20,annee: 2019,
      },
      {
        name: 'Lollipop',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 3,  note: 20,annee: 2017,
      },
      {
        name: 'Honeycomb',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2018,
      },
      {
        name: 'Donut',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Jelly bean',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 10,annee: 2019,
      },
      {
        name: 'Lollipop',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'faible',
        iron: 5,  note: 10,annee: 2017,
      },
      {
        name: 'Honeycomb',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 2,  note: 10,annee: 2019,
      },
      {
        name: 'Donut',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'faible',
        iron: 2,  note: 30,annee: 2018,
      },
      {
        name: 'KitKat',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2018,
      },
      {
        name: 'Qsqd Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Psqd Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'faible',
        iron: 5,  note: 30,annee: 2017,
      },
      {
        name: 'Msqd Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 60,annee: 2019,
      },
      {
        name: 'Aqdsb Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 60,annee: 2019,
      },
      {
        name: 'B Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'faible',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'D Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'faible',
        iron: 4,  note: 30,annee: 2019,
      },
      {
        name: 'Eclair',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 1,  note: 30,annee: 2017,
      },
      {
        name: 'F Cupcake',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'faible',
        iron: 5,  note: 30,annee: 2018,
      },
      {
        name: 'Gingerbread',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'D Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Eclair',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'faible',
        iron: 4,  note: 30,annee: 2019,
      },
      {
        name: 'F Cupcake',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 20,annee: 2019,
      },
      {
        name: 'Gingerbread',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 20,annee: 2019,
      },
      {
        name: 'D Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2018,
      },
      {
        name: 'Eclair',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'faible',
        iron: 2,  note: 30,annee: 2017,
      },
      {
        name: 'Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2018,
      },
      {
        name: 'Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Eclair',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 1,  note: 30,annee: 2019,
      },
      {
        name: 'Cupcake',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Gingerbread',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'importante',
        iron: 5,  note: 30,annee: 2018,
      },
      {
        name: 'Jelly bean',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Lollipop',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Honeycomb',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 3,  note: 30,annee: 2017,
      },
      {
        name: 'Donut',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'importante',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Jelly bean',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 3,  note: 30,annee: 2018,
      },
      {
        name: 'Lollipop',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Honeycomb',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Donut',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'KitKat',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Qsqd Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Psqd Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Msqd Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 3,  note: 30,annee: 2018,
      },
      {
        name: 'Aqdsb Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'importante',
        iron: 3,  note: 30,annee: 2019,
      },
      {
        name: 'B Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2017,
      },
      {
        name: 'D Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Eclair',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'F Cupcake',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Gingerbread',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2018,
      },
      {
        name: 'D Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Eclair',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 10,annee: 2019,
      },
      {
        name: 'F Cupcake',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 10,annee: 2019,
      },
      {
        name: 'Gingerbread',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 10,annee: 2019,
      },
      {
        name: 'D Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'importante',
        iron: 5,  note: 30,annee: 2017,
      },
      {
        name: 'Eclair',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2018,
      },
      {
        name: 'Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Eclair',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Cupcake',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 10,annee: 2019,
      },
      {
        name: 'Gingerbread',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 10,annee: 2019,
      },
      {
        name: 'Jelly bean',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 10,annee: 2019,
      },
      {
        name: 'Lollipop',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Honeycomb',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Donut',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 20,annee: 2019,
      },
      {
        name: 'Jelly bean',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 20,annee: 2019,
      },
      {
        name: 'Lollipop',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 20,annee: 2019,
      },
      {
        name: 'Honeycomb',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 20,annee: 2019,
      },
      {
        name: 'Donut',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 20,annee: 2019,
      },
      {
        name: 'KitKat',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 20,annee: 2019,
      },
      {
        name: 'Qsqd Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Psqd Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'importante',
        iron: 2,  note: 20,annee: 2019,
      },
      {
        name: 'Msqd Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 2,  note: 20,annee: 2019,
      },
      {
        name: 'Aqdsb Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'B Frozen Yogurt',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'D Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'importante',
        iron: 1,  note: 30,annee: 2019,
      },
      {
        name: 'Eclair',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'F Cupcake',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 1,  note: 30,annee: 2019,
      },
      {
        name: 'Gingerbread',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 1,  note: 30,annee: 2019,
      },
      {
        name: 'D Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Eclair',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'importante',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'F Cupcake',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Gingerbread',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'D Ice cream sandwich',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Eclair',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'F Cupcake',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Gingerbread',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'K Jelly bean',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'O Lollipop',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Honeycomb',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'R Donut',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'T KitKat',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'W KitKat',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },

      {
        name: 'X KitKat',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
      {
        name: 'Z KitKat',
        calories:  'immobilier',
        fat:  'exploitation',
        carbs:  'immobilier commerce',
        protein: 'forte',
        iron: 5,  note: 30,annee: 2019,
      },
    ],
  }),
  components: {
    AlphabetSort,
  },
  computed: {
    getFilterDesserts(){
      if(this.search.length >= 3){
        let rex = new RegExp(this.search,"ig")
        return this.desserts.filter((dessert) => 
          rex.test(dessert.name)
        )
      }else{
         return this.desserts
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
      getOdd(val){
        switch (val) {
          case "forte":
            return "font-weight-black red"
          case "faible":
            return "font-weight-bold orange"
          case "importante":
            return "font-weight-medium teal"
          default:
             return "ont-weight-regular  blue"
        }
      },
      getIron(val){
        switch (val) {
          case 5:
            return "font-weight-black red"
          case 4:
            return "font-weight-bold  orange"
          case 3:
            return "font-weight-bold yellow"
          case 2:
            return "font-weight-medium red"
          case 1:
            return "font-weight-regular blue"
          default:
             return "blue"
        }
      },
  },
};
</script>

<style lang="scss">
.theme--light.v-data-table thead{
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.2);
}
  .theme--light.v-data-table thead tr:last-child th{
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
    text-align: center;
    text-align: center !important;
  }
  
  .odd{
    background-color: #2196f3;
    
  }
  .contreverse{
    background-color: #03a9f4;
    
  }
  .noteg{
    background-color: #00bcd4;
    
  }
</style>
