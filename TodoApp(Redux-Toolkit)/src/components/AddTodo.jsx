import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../features/todo/todoSlice"

export default function AddTodo() {

    const [input, setInput] = useState('')
    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()
        dispatch(addTodo(input))
        setInput('')
    }

    return (
        <div>
            <h1 className="text-white font-bold text-4xl text-center mt-10">Todo App</h1>
            <p className="text-blue-400 text-center px-12 mt-3 text-sm">Easily manage your personal tasks, family projects, and
                team’s work all in one place.</p>

            <form onSubmit={addTodoHandler} className=" mt-12 mb-16 text-center">
                <input
                    type="text"
                    className="bg-gray-800 w-7/12 rounded focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter a Todo..."
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                />
                <button
                    type="submit"
                    className="text-gray-200 ml-5 w-2/12 bg-indigo-500 py-1 focus:outline-none hover:bg-indigo-600 rounded text-lg font-semibold"
                >
                    Add
                </button>
            </form>

        </div>
    )
}
