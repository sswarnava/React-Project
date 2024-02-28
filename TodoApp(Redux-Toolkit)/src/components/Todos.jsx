import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoSlice';
import { useState } from 'react';

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
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            <input
              type="text"
              className={`w-full bg-transparent text-lg font-medium font-mono text-white pointer-events-none ${todo.completed ? "line-through" : ""
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
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              Delete
            </button>

            <button
              onClick={() => handleUpdate(todo.id)}
              className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md ml-2"
            >
              {editableIds.includes(todo.id) ? 'Save' : 'Edit'}
            </button>

          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
