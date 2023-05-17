export default {
  props: ['todo'],
  template: `
  <article @click="toggleTodo"> <!-- on click on task-->
    <input type="checkbox" id="checkbox" v-model="todo.isDone" disabled>
    <label for="checkbox">{{ todo.title }}</label>
  </article>
`,
  data() {
    return {}
  },
  methods: {
    toggleTodo() {
      this.$emit('toggle', this.todo._id)
    },
  },
}
