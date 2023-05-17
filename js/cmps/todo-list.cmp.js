import todoPreview from './todo-preview.cmp.js'

export default {
  name: 'todo-list',
  props: ['todos'],
  template: `
 <section class="todo-list">
        <ul>
            <li v-for="todo in todos" :key="todo.id" class="todo-preview-container">

                <todo-preview :todo="todo" @toggle="$emit('toggleTodo', $event)" />  <!--make an inline emit-->

                <div class="actions">

                    <router-link class="btn" :to="'/todo/'+todo._id">Details</router-link>
                    <!-- <router-link class="btn" :to="'/todo/edit/'+todo._id">Edit</router-link> -->
                    <router-link class="btn" :to="{name:'edit', params:{todoId:todo._id}}">Edit</router-link>
                    <button class="btn" @click="remove(todo._id)">X</button>
                </div>
            </li>
        </ul>
    </section>
`,
  components: {
    todoPreview,
  },

  data() {
    return {}
  },
  methods: {
    // TODO: make remove task emit
    remove(todoId) {
      this.$emit('removedTodo', todoId)
    },
    // select(todoId) {
    //   this.$emit("selected", todoId);
    // },
  },
  computed: {},
}
