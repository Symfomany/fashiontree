<template>
  <v-container>
    <v-layout>
      <v-row>
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class=" mb-4">Recommandation du consommateur</div>
              <v-list-item-title class="mb-3"
                >Aller voir le rayon {{ recommandation }}</v-list-item-title
              >
              <v-alert v-if="warn" type="warning">
                Trop de monde. veillez attendre {{ secondsToTime }} minutes.
                <i class="mdi  mdi-timelapse"></i>
              </v-alert>
              <v-progress-linear
                v-if="warn"
                color="teal"
                :value="getPercentLoader"
              ></v-progress-linear>
            </v-list-item-content>
            <v-list-item-avatar tile size="80" color="white"
              ><img :src="svg"
            /></v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn color="teal" white outlined to="/" text
              >Retour à l'accueil</v-btn
            >
            <v-btn color="indigo" white outlined to="/confirmation" text
              >Modifier son avatar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Recommandation',
  data: () => ({}),
  created() {
    this.loadVoices();
  },
  mounted() {
    if (this.warn && this.wait === 300) {
      setInterval(() => this.$store.commit('user/updateWait'), 1000);
    }
  },
  computed: {
    ...mapState('user', {
      age: state => state.age,
      sexe: state => state.sexe,
      wait: state => state.wait,
      rayon: state => state.rayon,
      stats: state => state.stats,
      direction: state => state.direction,
    }),
    warn() {
      return this.stats[this.rayon] >= 5 && this.wait > 0;
    },
    secondsToTime() {
      return new Date(this.wait * 1000).toISOString().substr(11, 8);
    },
    recommandation() {
      return `${this.rayon}, au ${this.direction}`;
    },
    ...mapGetters('user', {
      getAvatar: 'getAvatar',
    }),
    svg() {
      return `https://avatars.dicebear.com/v2/avataaars/example.svg?${this.getAvatar}`;
    },
    getPercentLoader() {
      return 100 - (this.wait * 100) / 300;
    },
  },
  methods: {
    loadVoices() {
      const synth = window.speechSynthesis;
      const msg = new SpeechSynthesisUtterance();
      let frVoice = null;
      msg.text = `Aller au rayon ${this.recommandation}`;
      msg.rate = 10 / 10;
      msg.pitch = 1;
      synth.getVoices().forEach((voice, index) => {
        if (index == 0) {
          frVoice = voice;
          msg.voice = frVoice;
        }
      });
      if (frVoice) {
        synth.speak(msg);
      }
    },
  },
};
</script>
