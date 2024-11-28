import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {addTodo} from '../features/TodoSlice'

const AddTodo = () => {
    const [input,setInput] = useState('')
    const dispatch = useDispatch()

const addTodoHandler = (e) =>{
  e.preventDefault()
  dispatch(addTodo(input))
  setInput('')
}

  return (
    <div>
        <form onSubmit={addTodoHandler}>
            <input type="text" onChange={(e) => setInput(e.target.value)} placeholder='enter the Todo' value={input}/>
            <button type='submit'>add todo</button>
        </form>
    </div>
  )
}

export default AddTodo