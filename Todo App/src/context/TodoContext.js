import { createContext, useContext } from "react";

// CreateContext
export const TodoContext = createContext({
    todos: [{
        id: 1,
        todo: 'Todo msg',
        completed: false,
    }],
    addTodo: (todo) => { },
    updateTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    toggleComplete: (id) => { }
})

// UseContext
export const useTodo = () => {
    return useContext(TodoContext)
}

// Provider
export const TodoProvider = TodoContext.Provider