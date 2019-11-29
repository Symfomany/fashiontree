<template>
  <v-container>
    <v-layout>
      <Registration />
    </v-layout>
  </v-container>
</template>
<script>
import Registration from '../components/account/Registration';
export default {
  name: 'RegistrationContainer',
  components: {
    Registration,
  },
  data: () => ({}),
  created() {},
  methods: {},
};
</script>
