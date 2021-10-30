import React, { useState, useRef, useEffect} from 'react'
import './App.css';
import TodoList from './components/TodoList'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem([LOCAL_STORAGE_KEY]))
    setTodos(storedTodos)
  }, [])
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos) 
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id:Math.random(), name: name, complete: false}]
    })
    todoNameRef.current.value=null
  }
  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className="App">

      <h1 style={{fontSize: 65, fontWeight: 900,letterSpacing: 1 ,color: '#41292C'}}>Task App</h1>

      <form>
        <input style={{padding: 15, width: 300, borderRadius: 10, border: 'none'}} placeholder='Add Todo....' ref={todoNameRef} type='text'/>
        <button style={{padding: 15, width: 100, marginTop: 50, marginLeft: 10, color:'green', border: 'none', borderRadius: 10, fontWeight: 400, fontSize: 15}} onClick={handleAddTodo}>Add Todo</button>
        <button style={{padding: 15, width: 105, marginTop: 50, marginLeft: 10, color:'red', border:'none', borderRadius: 10, fontWeight: 400, fontSize: 15}} onClick={handleClearTodo}>Clear Todo</button>
        <h1 style={{color:'white'}}>{todos.length} Tasks</h1>
        <div style={{ marginTop: -20,fontWeight: 600, fontSize: 16, marginBottom: 20, fontWeight: 600}}>{todos.filter(todo => !todo.complete).length} todos left</div>
    
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
  
      </form>
    </div>
  );
}

export default App;
