<!-- @format -->

<template>
  <v-container>
    <v-form ref="form" v-model="valid">
      <v-row justify="center">
        <v-radio-group
          cols="3"
          row
          :disabled="isConfirmed"
          @change="val => updateField(val, 'sexe')"
          :value="sexe"
          :mandatory="false"
        >
          <v-radio label="Femme" :value="0"></v-radio>
          <v-radio label="Homme" :value="1"></v-radio>
        </v-radio-group>
        <v-col cols="9">
          <v-text-field
            single-line
            :value="firstname"
            :rules="firstnameRules"
            :disabled="isConfirmed"
            @input="val => updateField(val, 'firstname')"
            label="First name"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            single-line
            :value="zipcode"
            :rules="zipcodeRules"
            @input="val => updateField(val, 'zipcode')"
            label="Zipcode"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <v-text-field
            single-line
            :value="city"
            :rules="cityRules"
            @input="val => updateField(val, 'city')"
            label="City"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn :disabled="!valid" color="primary" large @click="register">
            <v-icon left>mdi-check</v-icon> S'enregistrer
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Form',
  components: {},
  props: {
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    redirect: {
      type: String,
      default: 'confirmation',
    },
  },
  data: () => ({
    valid: false,
    firstnameRules: [
      v => !!v || 'Firstname is required',
      v => v.length >= 3 || 'Firstname must be more than 3 characters',
    ],
    cityRules: [
      v => !!v || 'City is required',
      v => v.length >= 3 || 'City must be more than 3 characters',
    ],
    zipcodeRules: [
      v => !!v || 'Zipcode is required',
      v => /^[0-9]{5}$/.test(v) || 'Zipcode must be valid',
    ],
  }),
  computed: {
    ...mapState('user', {
      sexe: state => state.sexe,
      firstname: state => state.firstname,
      zipcode: state => state.zipcode,
      city: state => state.city,
      age: state => state.age,
    }),
  },
  methods: {
    register() {
      this.$router.push({ name: this.redirect });
      if (this.redirect === 'recommandation') {
        this.$store.commit('user/updateRayon', {
          sexe: this.sexe,
          age: this.age,
        });
      }
    },
    updateField(input, field) {
      this.$store.commit('user/updateField', { field, input });
    },
  },
};
</script>
