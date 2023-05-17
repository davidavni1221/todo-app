import { todoService } from '../services/todo-service.js'

export const todoStore = {
  state: {
    todos: null,
    lastRemovedTodo: null,
    filterBy: {
      title: '',
      isDone: null,
      toSort: false,
      pageIdx: 0,
    },
    pageSize: 2,
  },
  getters: {
    // todos({ todos }) {
    //   return todos
    // },
    progressPercentage({ todos }) {
      if (!todos) return
      const doneTodosCount = todos.reduce((acc, todo) => {
        if (todo.isDone) acc++
        return acc
      }, 0)
      return (doneTodosCount / todos.length) * 100
    },
    filteredTodos({ filterBy, todos, pageSize }) {
      if (!todos) return

      const regex = new RegExp(filterBy.title, 'i')
      let filteredTodos = todos.filter((todo) => regex.test(todo.title))

      if (filterBy.isDone !== null) {
        filteredTodos = filteredTodos.filter(
          (todo) => todo.isDone === filterBy.isDone
        )
      }

      if (filterBy.toSort) {
        filteredTodos.sort((t1, t2) => t1.title.localeCompare(t2.title))
      }
      console.log(filteredTodos)

      const startIdx = filterBy.pageIdx * pageSize

      filteredTodos = filteredTodos.slice(startIdx, startIdx + pageSize)
      console.log(filteredTodos)
      return filteredTodos
    },
  },

  mutations: {
    setTodos(state, { todos }) {
      state.todos = todos
    },
    deleteTodo(state, { todoId }) {
      const idx = state.todos.findIndex((todo) => todo._id === todoId)
      state.lastRemovedTodo = state.todos[idx]
      state.todos.splice(idx, 1)
    },
    addTodo(state, { todo }) {
      state.todos.unshift(todo)
    },
    updateTodo(state, { todo }) {
      const idx = state.todos.findIndex((p) => p._id === todo._id)
      state.todos.splice(idx, 1, todo)
    },
    clearRemoveTodo(state) {
      state.lastRemovedTodo = null
    },
    undoRemoveTodo(state) {
      state.todos.unshift(state.lastRemovedTodo)
      state.lastRemovedTodo = null
    },
    setFilter(state, { filterBy }) {
      // TODO:  fix this

      // state.filterBy = { ...filterBy }
      state.filterBy = { ...filterBy, pageIdx: state.filterBy.pageIdx }
    },
    setPage(state, { dir }) {
      state.filterBy.pageIdx += dir
      console.log(state.filterBy.pageIdx)
      if (state.filterBy.pageIdx < 0) state.filterBy.pageIdx = 0
      if (state.filterBy.pageIdx * state.pageSize > state.todos.length - 1)
        state.filterBy.pageIdx = 0
    },
    toggleIsDone(state, { todoId }) {
      const todo = state.todos.find((todo) => todo._id === todoId)
      todo.isDone = !todo.isDone
    },
    removeTodo(state, { todoId }) {
      const idx = state.todos.findIndex((todo) => todo._id === todoId)
      // TODO: find task idx
      state.todos.splice(idx, 1)
      // TODO: splice from state
    },
  },
  actions: {
    // !toggle todo goes here
    toggleTodo({ commit, state }, { todoId }) {
      console.log('store:', todoId)
      commit({ type: 'toggleIsDone', todoId })
      const todo = state.todos.find((todo) => todo._id === todoId)
      todoService.save(todo)
      // commit({type:'setUserMsg', 'todo was updated'})
    },

    removeTodo({ commit, state }, { todoId }) {
      console.log('store:', todoId)
      commit({ type: 'removeTodo', todoId })

      // TODO: mutate the state of the todo
      todoService.remove(todoId).then().catch()
      // TODO: send task to save
    },
    loadTodos({ commit }) {
      todoService.query().then((todos) => {
        commit({ type: 'setTodos', todos })
      })
    },
    // deleteTodo({ commit }, payload) {
    //   commit(payload)
    //   return todoService
    //     .remove(payload.todoId)
    //     .then(() => {
    //       commit({ type: 'clearRemoveTodo' })
    //     })
    //     .catch((err) => {
    //       commit({ type: 'undoRemoveTodo' })
    //       throw err
    //     })
    // },
    saveTodo({ commit }, { todo }) {
      const actionType = todo._id ? 'updateTodo' : 'addTodo'
      return todoService.save(todo).then((savedTodo) => {
        commit({ type: actionType, todo: savedTodo })
        return savedTodo
      })
    },
  },
}
