import { useState } from "react";
import { useTodo } from "../context/TodoContext";

import { RxCross2 } from "react-icons/rx";
import { FaPen } from "react-icons/fa6";
import { IoIosFolderOpen } from "react-icons/io";

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? "bg-[#abee71]" : "bg-[#cec43f]"
                }`}
        >
            {/* Completed Checkbox */}
            <input
                type="checkbox"
                className="cursor-pointer mt-2 w-4 h-4 mr-2"
                checked={todo.completed}
                onChange={toggleCompleted}
            />

            {/* Todo Value */}
            <input
                type="text"
                className={`border outline-none w-full bg-transparent text-lg font-medium font-mono ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            {/* Edit, Save Button */}
            <button
                className="inline-flex p-2 rounded-lg justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? <IoIosFolderOpen /> : <FaPen />}
            </button>

            {/* Delete Todo Button */}
            <button
                className="inline-flex p-2 rounded-lg justify-center items-center bg-gray-50 hover:bg-gray-300 text-rose-700"
                onClick={() => deleteTodo(todo.id)}
            >
                <RxCross2 />
            </button>
        </div>
    );
}

export default TodoItem;