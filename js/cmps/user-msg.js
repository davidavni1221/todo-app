export default {
  template: `
    <div v-if="msg.txt" class="alert" :class="'alert-' + msg.type" >
        {{msg.txt}}
    </div>
    `,
  created() {
    // TODO: reset msg
    this.interval = setInterval(this.resetMsg, 300)
  },
  data() {
    return {
      interval: null,
    }
  },
  methods: {
    //  TODO: reset msg
    resetMsg() {
      this.$store.commit({ type: 'resetMsg' })
    },
  },

  computed: {
    msg() {
      return this.$store.getters.msg
    },
  },
  unmounted() {
    // TODO: clearTimeout
    clearInterval(this.interval)
  },
}
