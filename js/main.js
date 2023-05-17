'use strict'

import { myRouter } from './router.js'
import { myStore } from './store/store.js'

import appHeader from './cmps/app-header.js'
import appFooter from './cmps/app-footer.js'

const options = {
  template: `
        <section class="app-container">
            <app-header/>
            <router-view/>
            <app-footer/>
        </section>
    `,
  created() {
    console.log('Vue App created')
    this.$store.dispatch('loadTodos')
  },
  components: {
    appHeader,
    appFooter,
  },
}

const app = Vue.createApp(options)
app.use(myRouter)
app.use(myStore)
app.mount('#app')
