
export default {
    template: `
        <section v-if="currUser" class="user-details">
            <h1>Hi {{currUser.fullName}}!</h1>
            <form @submit.prevent="saveUser">
                Name: 
                <input type="text" v-model="currUser.fullName" placeholder="Your name">
                Color: 
                <input type="color" v-model="currUser.prefs.color">
                BG Color: 
                <input type="color" v-model="currUser.prefs.bgColor">
                <button class="btn">Save</button>
            </form>
            <ul>
                <li v-for="activity in currUser.activities">
                    <p>{{timeIndicator(activity.at)}}:</p>
                    <h3>{{ activity.txt }}</h3>
                </li>
            </ul>
            <h4 v-if="currUser.activities.length === 0">
                No activities yet... <router-link to="/todo">Make one...</router-link>
            </h4>
        </section>
    `,
    data() {
        return {
            currUser: JSON.parse(JSON.stringify(this.$store.getters.user))
        }
    },
    methods: {
        saveUser() {
            this.$store.commit({ type: 'saveUser', user: this.currUser })
            this.openMsg('User Saved!','success')
        },
        timeIndicator(doneAt) {
            let timeDiff = Date.now() - doneAt
            return Math.floor((timeDiff/60000)) +' Minutes ago'
        },
        openMsg(txt,type) {
            this.$store.commit({ type: 'setMsg', msg: { txt, type} })
            setTimeout(() => {
                this.$store.commit({ type: 'resetMsg' })
            }, 2000)
        }
    },
}