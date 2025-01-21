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


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      parsedTodos.forEach((todo) => dispatch(addTodo(todo.text)));
    }
  }, [dispatch]);


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

  return (
    <div className="body" style={{ margin: '0 100px' }}>
    <div className="main-container">
          <div className='header'>
            <h1>Todo List</h1> 
            </div>
       

        <div className='add-todo'>
        <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
            />
        <button onClick={handleAddTodo}>Add Todo</button>

            </div>

<ul>
  {todos.map((todo) => (
    <li key={todo.id} className="todo-item">
      {editingId === todo.id ? (
        <div className="todo-container">
          <input
            className="edit-input"
            type="text"
            value={editfullname}
            onChange={(e) => setEditfullname(e.target.value)}
          />
          <div className="todo-buttons">
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setEditingId(null)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="todo-container">
          <span className="todo-text">
            {todo.id}. {todo.text}
          </span>
          <div className="todo-buttons">
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
            <button onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
          </div>
        </div>
      )}
    </li>
  ))}
</ul>


    </div>
</div>

  );
};

export default TodoList;

