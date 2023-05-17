export default {
    template: `
    <section class="progress-bar">
        <div class="filled-bar" :style="progressPercentage"></div>
    </section>
  `,
    data() {
      return {};
    },
    methods: {},
    computed: {
        progressPercentage() {
            return { width: this.$store.getters.progressPercentage + '%' }
        },
    },
  }
  