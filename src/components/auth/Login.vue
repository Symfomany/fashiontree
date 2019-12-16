<template>
  <v-app id="inspire">
    <v-snackbar v-model="snackbar" :timeout="4000">
      Mauvais Login et/ou Mot de passe.
      <v-btn color="pink" text @click="snackbar = false">
        Fermer
      </v-btn>
    </v-snackbar>

    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="5">
            <v-card class="elevation-12" :loading="loading">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Se connecter à Gaia</v-toolbar-title>
                  <v-spacer />
                  <v-btn color="pink" dark><v-icon left>forward</v-icon> OneTrack</v-btn>
              </v-toolbar>
              <v-card-text>
                <v-form
                  @submit.prevent="log"
                  ref="form"
                  v-model="valid"
                  :lazy-validation="false"
                >
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    :rules="loginRules"
                    type="text"
                    v-model="login"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    :rules="passwordRules"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="log" :disabled="!valid" color="primary"
                  ><v-icon left>send</v-icon>Se connecter à Gaia</v-btn
                >
              </v-card-actions>
                <!-- <p><a @click="log"  color="pink">Se connecter à OneTrack</a></p> -->
              
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    loading: false,
    login: '',
    password: '',
    valid: true,
    loginRules: [
      v => !!v || 'Login is required',
      v => (v && v.length > 3) || 'Login must be more than 3 characters',
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length > 3) || 'Password must be more than 3 characters',
    ],
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    log() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('user/login', {
            login: this.login,
            password: this.password,
          })
          .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', res.data.user);
            this.$router.push({ name: 'listing' });
          })
          .catch(() => {
            this.snackbar = true;
            this.loading = false;
          });
      }
    },
  },
  props: {
    source: String,
  },
};
</script>
