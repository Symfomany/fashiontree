<template>
  <ul class="list">
    <li
      :class="actived(letter) ? 'active' : ''"
      @click="getLetter(letter)"
      :key="letter"
      v-for="letter in filtersLetters"
    >
      {{ letter }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AlphabetSort',
  data: () => ({
    selected: 'a',
  }),
  props: {
    occurences: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  computed: {
    letters() {
      return [...'abcdefghijklmnopqrstuvwxyz'];
    },

    filtersLetters() {
      return this.letters.filter(l => this.occurences[l.toUpperCase()] > 0);
    },

    getHeights() {
      let obj = { ...this.occurences };
      let sum = 120;
      for (let i in obj) {
        sum += obj[i] * 64;
        obj[i] = sum;
      }

      return obj;
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    actived(letter) {
      return this.selected == letter;
    },
    getLetter(letter) {
      this.selected = letter;
      // begin to 160px
      let sum = 0;

      for (let i in this.occurences) {
        if (i < letter.toUpperCase()) {
          sum += this.occurences[i] * 64;
        }
      }
      window.scrollTo(0, 220 + sum);
    },
    handleScroll() {
      if (window.pageYOffset > 160) {
        //console.log(window.pageYOffset)
        //let sum = 0;
        for (let i in this.getHeights) {
          if (window.pageYOffset <= this.getHeights[i] + 120) {
            this.selected = i.toLowerCase();
            break;
          }
        }
        //console.log( this.selected )
      } else {
        this.selected = 'a';
      }
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  list-style: none;
  position: sticky;
  top: 10px;
  .active {
    color: #2196f3;
    opacity: 1;
  }
  li {
    transition: all 0.5s ease-out;
    opacity: 0.4;
    font-size: 1.3rem;
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 5px;
    &:hover {
      cursor: pointer;
      opacity: 1;
      color: #2196f3;
    }
    &:active {
      opacity: 1;
      color: #2196ae;
    }
  }
}
</style>
