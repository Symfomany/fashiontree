<template>
  <div>
    
    
    <v-layout>
      <v-row class="d-flex md-12 justify-space-between">
        <v-subheader class="title">Couverture</v-subheader>
        
        <v-menu transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        
        <v-btn rounded large color="primary" big v-on="on"
          ><v-icon left>cloud_download</v-icon> Export</v-btn
        >
      </template>
      <v-card>
        <v-card-title>Hello </v-card-title>
        <v-card-text>ljdosjd</v-card-text>
      </v-card>
    </v-menu>
    
    
      </v-row>
    </v-layout>

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
            Remonter
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
    visible: true
  }),
  created() {
     this.$store.commit('user/connect');
     
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      this.visible = y > 200
    });
  },
  computed: {},
  methods: {
    scrollTop(){
        window.scrollTo(0, 50 );
    }
  },
};
</script>


<style lang="scss">
  .remonter{
    position: fixed;
    top: 90%;
    right: 10px;
    z-index: 200000;
    opacity: 0.4;
    &:hover{
       opacity: 1;
    }
  }
  </style>
