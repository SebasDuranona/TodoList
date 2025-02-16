import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import SignUp from '../components/SignUp'
import Login from '../components/Login'
import TodoList from '../components/TodoList'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div>
      <h1>Todo List App</h1>
      {!session ? (
        <div>
          <SignUp />
          <Login />
        </div>
      ) : (
        <TodoList />
      )}
    </div>
  )
}
