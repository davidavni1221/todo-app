'use strict'

import { todoService } from '../services/todo-service.js'

export default {
    template: `
    <section v-if="todo" class="todo-details">
        <h1>Your Todo</h1>
        <!-- <h2>{{todo.title}}</h2> -->
        <pre>{{todo}}</pre>
        <router-link class="btn" :to="'/todo/edit/'+todo._id">Edit</router-link>
        <router-link class="btn" to="/todo">Back</router-link>
    </section>
    <img v-else src="https://c.tenor.com/FX_9AcYeGokAAAAi/loader-loading.gif" alt="">
    `,
    data() {
        return {
            todo: null,
        }
    },
    created() {
        const { todoId } = this.$route.params
        if (todoId) {
            todoService.getById(todoId)
                .then(todo => this.todo = todo)
        } else {
            this.openMsg('Can not find todo','error')
            this.$router.push('/todo')
        }
    },
    methods:{
        openMsg(txt,type) {
            this.$store.commit({ type: 'setMsg', msg: { txt, type} })
            setTimeout(() => {
                this.$store.commit({ type: 'resetMsg' })
            }, 2000)
        }
    }
}
