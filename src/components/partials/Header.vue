<!-- @format -->

<template>
  <v-app-bar app color="white" hide-on-scroll elevate-on-scroll fade-on-scroll>
    <div class="d-flex align-center">
      <router-link to="/"
        ><v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Gaia_Online_logo.svg/450px-Gaia_Online_logo.svg.png"
          transition="scale-transition"
          width="100"
      /></router-link>
    </div>

    <v-tabs centered>
      <v-tab :key="1" :href="`#tab-1`"
        ><v-icon left>list</v-icon> Listing</v-tab
      >
      <v-tab :key="2" :href="`#tab-2`"
        ><v-icon left>question_answer</v-icon> Questionnaire</v-tab
      >
    </v-tabs>

    <v-spacer></v-spacer>

    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon n v-on="on">
          <v-icon>account_circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
