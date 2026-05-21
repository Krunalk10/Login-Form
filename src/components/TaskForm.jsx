import { useState } from 'react'
import useTaskStore from '../store/taskStore'
import useAuthStore from '../store/authStore'

function TaskForm() {
  const { addTask } = useTaskStore()
  const { user } = useAuthStore()

  const [task, setTask] = useState('')
  const [status, setStatus] = useState('Not Complete')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task.trim()) return

    addTask({
      id: Date.now(),
      userId: user?.email, // Keeps tasks unique to the logged-in user account
      title: task,
      status,
    })

    setTask('')
    setStatus('Not Complete')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm mb-8">
      <h3 className="text-stone-700 font-semibold mb-3 text-sm tracking-wide uppercase">Add New Task</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="What are you working on today?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 p-3 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-300 transition-all text-stone-800 text-sm"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-3 border border-stone-200 rounded-xl bg-stone-50 outline-none focus:ring-2 focus:ring-emerald-300 text-stone-700 text-sm"
        >
          <option value="Complete">Complete</option>
          <option value="Partially Complete">Partially Complete</option>
          <option value="Not Complete">Not Complete</option>
        </select>

        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl transition-all text-sm shadow-sm">
          Add Task
        </button>
      </div>
    </form>
  )
}

export default TaskForm