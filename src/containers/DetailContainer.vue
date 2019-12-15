<template>
  <v-container>
    <v-layout>
      <v-row class="d-flex md-12 justify-space-between">
        <Detail />
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import Detail from '../components/couverture/Detail';

export default {
  name: 'DetailContainer',
  components: {
    Detail,
  },
  data: () => ({}),
  created() {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss"></style>
