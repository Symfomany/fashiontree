<template>
  <div>
    <v-layout>
      <v-row class="d-flex md-12 justify-space-between">
        <v-subheader class="title">Couverture</v-subheader>
        <v-btn rounded large color="primary" big
          ><v-icon left>cloud_download</v-icon> Export</v-btn
        >
      </v-row>
    </v-layout>

    <v-layout>
      <v-row>
        <v-col cols="12">
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
  data: () => ({}),
  created() {},
  computed: {},
  methods: {},
};
</script>
