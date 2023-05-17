import { storageService } from './async-storage.service.js'
import { utilService } from './util-service.js'

const KEY = 'todosDB'

export const todoService = {
  query,
  getById,
  remove,
  save,
  getEmptyTodo,
}

var gTodos = _createTodos()

// TODO: support paging and filtering and sorting
function query() {
  return storageService.query(KEY)
}

function getById(id) {
  return storageService.get(KEY, id)
}

function remove(id) {
  return storageService.remove(KEY, id)
}

function save(todo) {
  const savedTodo = todo._id
    ? storageService.put(KEY, todo)
    : storageService.post(KEY, todo)
  return savedTodo
}

function getEmptyTodo() {
  return {
    _id: '',
    title: '',
    isDone: false,
  }
}

function _createTodos() {
  var todos = JSON.parse(localStorage.getItem(KEY))
  if (!todos || !todos.length) {
    todos = [
      _createTodo('Bake a cake'),
      _createTodo('Workout'),
      _createTodo('Study'),
    ]
    localStorage.setItem(KEY, JSON.stringify(todos))
  }
  return todos
}

function _createTodo(title) {
  return {
    _id: utilService.makeId(),
    title,
    isDone: false,
  }
}
