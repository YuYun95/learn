/*
 * @Author: your name
 * @Date: 2021-06-30 16:25:24
 * @LastEditTime: 2021-06-30 16:36:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-app\src\Store\todos.slice.js
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const TODOS_FEATURE_KEY = 'todos'

const loadTodos = createAsyncThunk('todos/loadTodos', (payload, thunkAPI) => {
  axios.get(payload).then(response => thunkAPI.dispatch(setTodos(response.data)))
})

const { reducer: TodosReducer, actions } = createSlice({
  name: TODOS_FEATURE_KEY,
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.push(actions.payload)
      }
    },
    prepare: todo => {
      return {
        payload: { id: Math.random(), ...todo }
      }
    },
    setTodos: (state, action) => {
      actions.payload.forEach(todo => state.push(todo))
    }
  }
})

export const { addTodo } = actions
export default TodosReducer
