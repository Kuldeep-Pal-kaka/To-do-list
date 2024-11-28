import './TodoList.css'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, editTodo } from '../../features/TodoSlice';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const [editfullname, setEditfullname] = useState(''); // State for editing
  const [editingId, setEditingId] = useState(null); // State to track which todo is being edited
  const todos = useSelector(state => state.todos); // Get todos from the Redux store
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleEditTodo = (id, text) => {
    setEditingId(id);
    setEditfullname(text); // Set the initial text of the todo in the input field
  };

  const handleSaveEdit = () => {
    if (editfullname.trim()) {
      dispatch(editTodo({ id: editingId, newfullname: editfullname }));
      setEditingId(null); // Close the edit mode
      setEditfullname(''); // Clear the input field
    }
  };

  // Use an effect to update the edit field with the correct todo text when editing
  useEffect(() => {
    if (editingId !== null) {
      const todoBeingEdited = todos.find(todo => todo.id === editingId);
      if (todoBeingEdited) {
        setEditfullname(todoBeingEdited.text);
      }
    }
  }, [editingId, todos]); // Re-run when editingId or todos change

  return (
    <div className="body">

    <div className='main-container'>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
        />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <div>
                <input
                className='edit-input'
                  type="text"
                  value={editfullname}
                  onChange={(e) => setEditfullname(e.target.value)}
                  />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                {todo.id}. {todo.text}{' '}
                <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                <button onClick={() => handleEditTodo(todo.id, todo.text)}>
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
        </div>
  );
};

export default TodoList;
