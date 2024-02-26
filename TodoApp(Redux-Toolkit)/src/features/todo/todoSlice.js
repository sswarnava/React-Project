import { createSlice, nanoid } from '@reduxjs/toolkit'
import { flushSync } from 'react-dom'

const initialState = {
    todos: []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                editable: false
            }
            state.todos.push(todo)
        },

        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },

        updateTodo: (state, action) => {
            const { id, editable } = action.payload;
            const todoToUpdate = state.todos.find((todo) => todo.id === id);
            console.log(todoToUpdate);
            if (todoToUpdate) {
                todoToUpdate.editable = editable;
            }
        },
    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer