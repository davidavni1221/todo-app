import { utilService } from './../services/util-service.js'

export default {
  template: `
   <section class="todo-filter">
      <input @input="filter" type="search"
       v-model="filterBy.title" placeholder="Search by title">
      <select v-model="filterBy.isDone" @input="filter">
          <option v-for="(opt,i) in valueOptions" :key="i" :value="valueOptions[i]">
            {{userOptions[i]}}</option>
      </select>
      <section>
        <button class="btn" @click="sort">Sort by text</button>
      </section>
    </section>
  `,

  created() {
    // TODO: debounce
    this.filter = utilService.debounce(this.filter)
  },
  data() {
    return {
      filterBy: {
        title: '',
        isDone: null,
        toSort: false,
      },
      userOptions: ['All', 'Done', 'Active'],
      valueOptions: [null, true, false],
    }
  },
  methods: {
    filter() {
      this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)))
    },

    sort() {
      this.filterBy.toSort = !this.filterBy.toSort
      this.$emit('filtered', { ...this.filterBy })
    },
  },
}
