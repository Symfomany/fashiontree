<template>
  <v-container>
    <v-layout>
      <Confirmation />
    </v-layout>
  </v-container>
</template>
<script>
import Confirmation from '../components/account/Confirmation';

export default {
  name: 'ConfirmationContainer',
  components: {
    Confirmation,
  },
  data: () => ({}),
  created() {},
  computed: {},
  methods: {},
};
</script>
