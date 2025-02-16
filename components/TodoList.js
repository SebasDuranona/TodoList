import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: true })
    if (error) console.error('Error fetching todos:', error)
    else setTodos(data)
  }

  async function addTodo(e) {
    e.preventDefault()
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task: newTodo, user_id: supabase.auth.user().id }])
    if (error) console.error('Error adding todo:', error)
    else {
      setNewTodo('')
      fetchTodos()
    }
  }

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="New todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  )
}
