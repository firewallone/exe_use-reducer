import React, { useReducer, useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

type State = Todo[]

type Action = { type: 'add'; text: string } | { type: 'remove'; id: number } | { type: 'toggle'; id: number }

const initialState: State = []

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.text, completed: false }]
    case 'remove':
      return state.filter(item => item.id !== action.id)
    case 'toggle':
      return state.map(item => item.id === action.id ? { ...item, completed: !item.completed } : item)
    default:
      return state
  }
}

const Todo: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [text, setText] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch({ type: 'add', text })
      setText('')
    }
  }

  const handleRemove = (id: number) => {
    dispatch({ type: 'remove', id })
  }

  const handleToggle = (id: number) => {
    dispatch({ type: 'toggle', id })
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleAdd}>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {state.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
            <button style={{ marginLeft: '20px' }} onClick={() => handleToggle(todo.id)}>Toggle</button>
            <button style={{ marginLeft: '20px' }} onClick={() => handleRemove(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
