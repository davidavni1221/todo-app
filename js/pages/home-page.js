export default {
  template: `
        <section class="home-page">
            <!-- <h1>Hi {{loggedInUser.fullName}}!</h1> -->
            <!-- <img src="img/logo.png"/> -->
        </section>
    `,
  data() {
    return {}
  },
  created() {
    this.openMsg('HomePage Loaded', 'success')
  },
  methods: {
    openMsg(txt, type) {
      this.$store.commit({ type: 'setMsg', msg: { txt, type } })
    },
  },
  computed: {},
}
