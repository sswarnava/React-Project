import { createSlice, nanoid } from '@reduxjs/toolkit'

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
                completed: false,
            }
            state.todos.push(todo)
        },

        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },

        updateTodo: (state, action) => {
            const { id, todomsg } = action.payload;
            const updatedTodos = state.todos.map((todo) =>
                todo.id === id ? { ...todo, text: todomsg } : todo
            );
            state.todos = updatedTodos;
        },

        todoCompleted: (state, action) => {
            const id  = action.payload
            const todoComplete = state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            state.todos = todoComplete
        }

    }
})

export const { addTodo, removeTodo, updateTodo, todoCompleted } = todoSlice.actions

export default todoSlice.reducer