import todoFilter from '../cmps/todo-filter.cmp.js'
import todoList from '../cmps/todo-list.cmp.js'

export default {
  template: `
  <section class="todo-app">
     <todo-filter @filtered="setFilter"/>

     <todo-list  v-if="todosToShow" :todos="todosToShow" 
     @removedTodo="removeTodo"
     @toggleTodo="toggleTodo"/> <!--add toggle listener-->

     <img v-else src="https://c.tenor.com/FX_9AcYeGokAAAAi/loader-loading.gif" alt="">
    <div class="paging">
     <button class="btn" @click="onSetPage(-1)">Prev</button>
     <button class="btn" @click="onSetPage(1)">Next</button>
    </div>
     <router-link class="btn" to="/todo/edit">Add Todo</router-link>
  </section>
`,
  components: {
    todoList,
    todoFilter,
  },
  methods: {
    setFilter(filterBy) {
      this.$store.commit({ type: 'setFilter', filterBy })
    },
    onSetPage(dir) {
      this.$store.commit({ type: 'setPage', dir })
    },

    toggleTodo(todoId) {
      this.$store.dispatch({ type: 'toggleTodo', todoId })
    },

    removeTodo(todoId) {
      this.$store.dispatch({ type: 'removeTodo', todoId })
    },
    //  TODO: toggle todo dispatch
    // TODO: make remove task dispatch
  },
  computed: {
    todosToShow() {
      return this.$store.getters.filteredTodos
    },
  },
}
