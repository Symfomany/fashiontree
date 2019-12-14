<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form  ref="form" v-model="valid" :lazy-validation="false">
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
                <v-btn @click="log" :disabled="!valid" color="primary">Se connecter</v-btn>
              </v-card-actions>
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
      login:"",
      password: "",
      valid: true,
       loginRules: [
        v => !!v || 'Login is required',
        v => (v && v.length > 3 ) || 'Login must be more than 3 characters',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 3 ) || 'Password must be more than 3 characters',
      ],
    }),
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      log(){
        if (this.$refs.form.validate()) {
            this.$store.dispatch('user/login', {login: this.login, password: this.password}).then((res) => {
              localStorage.setItem('token', res.data.token);
              this.$router.push({ name: 'listing'})
            })

        }
      }
    },
    props: {
      source: String,
    },
  }
</script>