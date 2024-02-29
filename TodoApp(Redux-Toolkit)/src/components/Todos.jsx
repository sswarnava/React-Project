import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo, todoCompleted } from '../features/todo/todoSlice';
import { useState } from 'react';

import { FaRegPenToSquare, FaFolderOpen } from "react-icons/fa6";
import { ImBin } from "react-icons/im";


function Todos() {
  const todos = useSelector(state => state.todos);

  const dispatch = useDispatch();
  const [editableIds, setEditableIds] = useState([]);
  const [todoUpdates, setTodoUpdates] = useState({});

  const handleUpdate = (id) => {
    if (editableIds.includes(id)) {
      dispatch(updateTodo({ id, ...todoUpdates[id] }));
    }
    setEditableIds(prevEditableIds =>
      prevEditableIds.includes(id) ? prevEditableIds.filter(item => item !== id) : [...prevEditableIds, id]
    );
  };

  const handleInputChange = (id, value) => {
    setTodoUpdates(prevTodoUpdates => ({
      ...prevTodoUpdates,
      [id]: { ...prevTodoUpdates[id], todomsg: value }
    }));
  };

  return (
    <>
      <ul className="list-none text-center content-center">
        {todos.map((todo) => (
          <li
            className="mt-4 w-10/12 mx-auto flex justify-between items-center bg-zinc-800 px-4 py-2 rounded text-center"
            key={todo.id}
          >
            {/* Completed Checkbox */}
            <input
              type="checkbox"
              className="cursor-pointer w-4 h-4 mr-2"
              checked={todo.completed}
              onChange={() => dispatch(todoCompleted(todo.id))}
            />

            <input
              type="text"
              className={`w-full bg-transparent text-base font-medium font-mono text-white pl-2 ${todo.completed ? "line-through" : ""
                } ${!editableIds.includes(todo.id)
                  ? "border border-transparent "
                  : "border border-gray-300"
                }`}
              value={todoUpdates[todo.id]?.todomsg !== undefined ? todoUpdates[todo.id]?.todomsg : todo.text}
              onChange={(e) => handleInputChange(todo.id, e.target.value)}
              readOnly={!editableIds.includes(todo.id)}
            />

            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              <ImBin className='bg-transparent mb-1' />
            </button>

            <button
              onClick={() => {
                if (todo.completed == true) return;
                handleUpdate(todo.id)
              }}
              className="text-white bg-blue-500 border-0 py-1 px-2 focus:outline-none hover:bg-blue-600 rounded text-md ml-2"
            >
              {editableIds.includes(todo.id) ? <FaFolderOpen className='bg-transparent mb-1' /> : <FaRegPenToSquare className='bg-transparent mb-1' />}
            </button>

          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;