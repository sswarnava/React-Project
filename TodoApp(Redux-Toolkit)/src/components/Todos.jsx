import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoSlice';
import { useState } from 'react';

function Todos() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch()

  const [editable, setEditable] = useState(true)

  const handelUpdate = (id) => {
    setEditable((prev) => !prev)
    dispatch(updateTodo({id, editable}))

  }

  return (
    <>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            <input
              type="text"
              className={`w-full bg-transparent text-lg font-medium font-mono text-white ${todo.completed ? "line-through" : ""}`}
              value={todo.text}
              readOnly={!(todo.editable)}
            />

            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              d
            </button>

            <button
              onClick={() => handelUpdate(todo.id) }
              className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md ml-2"
            >
              {!(todo.editable) ? 'Edit' : 'Save'}

            </button>

          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
