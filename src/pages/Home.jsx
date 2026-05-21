import useAuthStore from '../store/authStore'
import useTaskStore from '../store/taskStore'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'
import { AnimatePresence } from 'framer-motion'

function Home() {
  const { user } = useAuthStore()
  const { tasks } = useTaskStore()

  // Filter out data so users only see their own private tasks
  const userTasks = tasks.filter((t) => t.userId === user?.email)

  // Aggregated Task Stat Counters
  const totalTasks = userTasks.length
  const completedCount = userTasks.filter((t) => t.status === 'Complete').length
  const partialCount = userTasks.filter((t) => t.status === 'Partially Complete').length
  const pendingCount = userTasks.filter((t) => t.status === 'Not Complete').length

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-emerald-50/30 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Navbar />

        {/* Welcome Header Summary section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-stone-800">Hello, {user?.name || 'Friend'}!</h2>
          <p className="text-stone-500 text-sm mt-1">Here is a snapshot of your productivity rhythm today.</p>
        </div>

        {/* Metric Aggregator Cards Dashboard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-xs">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Total Tasks</p>
            <p className="text-2xl font-bold text-stone-800 mt-1">{totalTasks}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-xs">
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Complete</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{completedCount}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-xs">
            <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Partial</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{partialCount}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-xs">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Remaining</p>
            <p className="text-2xl font-bold text-stone-700 mt-1">{pendingCount}</p>
          </div>
        </div>

        {/* Action input block form code element component context layout */}
        <TaskForm />

        {/* Render Checklist Row Nodes Layout */}
        <div className="space-y-3">
          <h4 className="text-stone-700 font-semibold text-sm tracking-wide uppercase px-1">Your Daily Agenda</h4>
          {userTasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-200 text-stone-400 text-sm">
              ✨ No tasks listed yet. Take a breath or add a new goal above!
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <AnimatePresence mode="popLayout">
                {userTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home