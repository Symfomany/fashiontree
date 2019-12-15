<template>
  <v-container>
    <v-layout>
      <v-card
        outlined
        :loading="loading"
        class="borderBlue mx-auto"
        min-width="800"
      >
        <v-row no-gutters align="center" justify="center">
          <v-avatar color="blue" size="62">
            <span class="white--text headline">162</span>
          </v-avatar>

          <div>
            <v-card-title>Ephad les hespérides des monts d'or</v-card-title>
            <v-card-subtitle>Immobilier Hébergement</v-card-subtitle>
          </div>
        </v-row>

        <v-tabs :centered="true" :grow="true">
          <v-tab><v-icon left>show_chart</v-icon> Performance ESG</v-tab>
          <v-tab
            ><v-icon left>euro_symbol</v-icon> Investissement thématique</v-tab
          >
          <v-tab
            ><v-icon left>notification_important</v-icon> Contreverse</v-tab
          >
          <v-tab><v-icon left>location_city</v-icon> Sociétés paires</v-tab>
        </v-tabs>

        <v-card-text> 
            <v-row no-gutters align="center" justify="center">
                <v-card cols="6"> 
                    <apexcharts width="500" type="bar" :options="options" :series="series"></apexcharts>
                </v-card>
                <v-card cols="6"> 
                    <apexcharts width="500" type="radar" :options="optionsTwo" :series="series"></apexcharts>
                </v-card>
            </v-row>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Detail',
  data: () => ({
    loading: false,
    
    options: {
          id: 'basic-bar',
          plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
          categories: [2018,2017,2016,2015]
        }
    },
    
    optionsTwo: {
        labels: ['Environement', 'Gouvernement', 'Labelisation', 'Economique', 'Social'],
    },
     series: [{
        name: 'Series 1',
        data: [80, 60, 30, 70, 100],
    }]
  }),
  created(){
     
  },
  components:{
    apexcharts: VueApexCharts,
  },
};
</script>
