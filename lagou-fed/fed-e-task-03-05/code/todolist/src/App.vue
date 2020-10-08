<template>
  <section id="app" class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autocomplete="off"
        autofocus
        v-model="input"
        @keyup.enter="addTodo"
      >
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          v-for="todo in todos"
          :key="todo"
          :class="{ editing: todo=== editingTodo, completed: todo.completed }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
            <button class="destroy" @click="remove(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-editing-focus="todo === editingTodo"
            v-model="todo.text"
            @keyup.enter="doneEdit(todo)"
            @blur="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          >
        </li>
      </ul>
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ remainingCount }}</strong> {{ remainingCount > 1 ? 'items' : 'item' }} left
      </span>
      <ul class="filters">
        <li><a href="#/all">All</a></li>
        <li><a href="#/active">Active</a></li>
        <li><a href="#/completed">Completed</a></li>
      </ul>
      <button class="clear-completed">
        Clear completed
      </button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <!-- Remove the below line ↓ -->
    <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Created by <a href="https://www.lagou.com">教瘦</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>

<script>
import './assets/index.css'
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 1. 添加待办事项
const useAdd = todos => {
  const input = ref('')
  // eslint-disable-next-line no-unused-vars
  const addTodo = () => {
    const text = input.value && input.value.trim()
    if (text.length === 0) return
    todos.value.unshift({
      text,
      completed: false
    })
    input.value = ''
  }
  return {
    input,
    addTodo
  }
}

// 2. 删除待办事项
const useRemove = todos => {
  const remove = todo => {
    const index = todos.value.indexOf(todo)
    todos.value.splice(index, 1)
  }
  return { remove }
}

// 3、编辑待办事项
const useEdit = remove => {
  let beforeEditingText = ''
  const editingTodo = ref(null)
  const editTodo = todo => {
    beforeEditingText = todo.text
    editingTodo.value = todo
  }
  const doneEdit = todo => {
    if (!editingTodo.value) return
    todo.text = todo.text.trim()
    todo.text || remove(todo)
    editingTodo.value = null
  }
  const cancelEdit = todo => {
    editingTodo.value = null
    todo.text = beforeEditingText
  }

  return {
    editingTodo,
    editTodo,
    doneEdit,
    cancelEdit
  }
}

// 4、切换待办项完成状态
const useFilter = todos => {

  // 切换全部状态
  const allDone = computed({
    get() {
      return !todos.value.filter(todo => !todo.completed).length
    },
    set(value) {
      todos.value.forEach(todo => {
        todo.completed = value
      })
    }
  })

  const filter = {
    all: list => list,
    active: list => list.filter(todo => !todo.completed),
    completed: list => list.filter(todo => todo.completed)
  }

  const type = ref('all')
  const filteredTodos = computed(() => filter[type.value](todos.value))
  console.log(filteredTodos)

  const onHashChange = () => {
    const hash = window.location.hash.replace('#/', '')
    console.log(hash)
    if (filter[hash]) {
      type.value = hash
    } else {
      type.value = 'all'
      window.location.hash = ''
    }
  }

  onMounted(() => {
    window.addEventListener('hashchange', onHashChange)
    onHashChange()
  })

  onUnmounted(() => {
    window.removeEventListener('hashchange', onHashChange)
  })

  return {
    allDone,
    filteredTodos
  }
}

export default {
  name: 'App',

  setup() {
    const todos = ref([])

    const { remove } = useRemove(todos)

    return {
      todos,
      remove,
      ...useAdd(todos),
      ...useEdit(remove),
      ...useFilter(todos)
    }
  },

  directives: {
    editingFocus: (el, binding) => {
      binding.value && el.focus()
    }
  }
}

</script>

<style>
</style>
