import { useState } from 'react'
import { useTodo } from '../context/index'

function TodoForm() {
    const [todo, setTodo] = useState('')
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()

        if (!todo) return
        addTodo({ todo, completed: false })
        setTodo('')
    }
    return (
        <form onSubmit={add} className="flex" >
            <input
                type="text"
                placeholder="Add your new todo..."
                className=" w-full text-black rounded-lg px-5 outline-none duration-150 bg-white py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />

            <button type="submit" className="rounded-lg ml-4 p-3 bg-orange-600 text-white font-semibold">
                Add
            </button>
        </form>
    )
}

export default TodoForm