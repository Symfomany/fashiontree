<template>
  <v-container>
    <v-layout>
      <Recommandation />
    </v-layout>
  </v-container>
</template>
<script>
import Recommandation from '../components/account/Recommandation';

export default {
  name: 'RecommandationContainer',
  components: {
    Recommandation,
  },
  data: () => ({}),
  created() {},
  methods: {},
};
</script>
