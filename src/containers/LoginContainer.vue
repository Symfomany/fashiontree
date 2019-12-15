<template>
  <div>
    <Login />
  </div>
</template>
<script>
import Login from '../components/auth/Login';

export default {
  name: 'LoginContainer',
  components: {
    Login,
  },
  data: () => ({}),
  created() {
    this.$store.commit('user/disconnect');
  },
  computed: {},
  methods: {},
};
</script>
