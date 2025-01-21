import React, { useState } from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {removeTodo , editTodo} from '../features/TodoSlice'

const Todos = () => {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const [newfullname,setNewfullname] = useState('')


  
  const handleEdit = (id) => {
    if (newfullname.trim()) {
      dispatch(editTodo({ id, newfullname }));
      setNewfullname(""); // Reset input field
    }
  };

  return (
    <div>

<input
        type="text"
        value={newfullname}
        onChange={(e) => setNewfullname(e.target.value)}
        placeholder="New fullname"
      />

<button onClick={() => handleEdit(1)}>Edit Todo</button>

<ul>
     {todos.map((todo) => (
       <li key={todo.id}>
         {todo.fullname}{" "}
        <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button> 
        <button onClick={() => dispatch(handleEdit())}>Edit</button> 
        </li>
    ))}
    </ul>
    </div>
  )
}
export default Todos