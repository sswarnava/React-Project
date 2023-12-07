import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todo: [{
        id: 1,
        todo: 'Todo msg',
        completed: false,
    },]
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider