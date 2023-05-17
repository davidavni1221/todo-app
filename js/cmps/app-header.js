// import { userService } from '../services/user.service.js'
import userMsg from './user-msg.js'
import progressBar from './progress-bar.cmp.js'

export default {
    template: `
        <header>
            <section class="user-info">
                {{user.fullName}} 
                <progress-bar/>
            </section>
            <h1 class="main-title">Todo App</h1> 
            <user-msg></user-msg>
            <nav>
                <router-link to="/">Home</router-link> | 
                <router-link to="/todo">My Todos</router-link>
                <router-link :to="{name:'user'}">My Profile</router-link>
            </nav>
        </header>
    `,
    data() {
        return {
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    methods: {
    },
    components: {
        userMsg,
        progressBar
    }
}