import { todoService } from '../services/todo-service.js';

export default {
    template: `
        <section v-if="todoToEdit" class="todo-edit">
            <h4>{{pageTitle}}</h4>
            <form @submit.prevent="save">
                <input type="checkbox" v-model="todoToEdit.isDone">
                <input type="text" v-model="todoToEdit.title" placeholder="Title">
                <button class="btn">Save</button>
            </form>
            <button class="btn" @click="remove(todoToEdit._id)">Remove</button>
        </section>
        <img v-else src="https://c.tenor.com/FX_9AcYeGokAAAAi/loader-loading.gif" alt="">
    `,
    data() {
        return {
            todoToEdit: null
        }
    },
    created() {
        const { todoId } = this.$route.params
        if (todoId) {
            todoService.getById(todoId)
                .then(todo => this.todoToEdit = todo)
        } else {
            this.todoToEdit = todoService.getEmptyTodo()
        }
    },
    methods: {
        save() {
            if (!this.todoToEdit.title) return

            this.$store.dispatch({ type: 'saveTodo', todo: this.todoToEdit })
                .then(() => {
                    this.openMsg('Todo saved successfully','success')
                    const newActivity = {
                        txt: 'Saved a Todo: ' + this.todoToEdit.title,
                        at: Date.now()
                    }
                    this.$store.commit({ type: 'addActivity', activity: newActivity })
                    this.$router.push('/todo')
                })
                .catch(err => {
                    this.openMsg('Cannot save todo','error')
                })
        },
        remove(todoId) {
            if (todoId) {
                this.$store.dispatch({ type: 'deleteTodo', todoId })
                    .then(() => {
                        this.openMsg('Todo removed successfully','success')
                        const newActivity = {
                            txt: 'Removed a Todo: ' + this.todoToEdit.title,
                            at: Date.now()
                        }
                        this.$store.commit({ type: 'addActivity', activity: newActivity })
                        this.$router.push('/todo')
                    })
                    .catch(err => {
                        this.openMsg('Cannot remove todo','error')
                    })
            }
        },
        openMsg(txt,type) {
            this.$store.commit({ type: 'setMsg', msg: { txt, type} })
            setTimeout(() => {
                this.$store.commit({ type: 'resetMsg' })
            }, 2000)
        }
    },
    computed: {
        pageTitle() {
            const { todoId } = this.$route.params
            return todoId ? 'Edit todo' : 'Add todo'
        }
    }
}