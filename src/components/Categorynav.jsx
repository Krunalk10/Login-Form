import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  { id: 'All',        label: 'My Day',           icon: '☀️' },
  { id: 'Work',       label: 'Work',              icon: '👨‍💻' },
  { id: 'Home',       label: 'Home',              icon: '🏠' },
  { id: 'Groceries',  label: 'Groceries',         icon: '🍉' },
  { id: 'Movies',     label: 'Movies to watch',   icon: '🍿' },
  { id: 'Places',     label: 'Places to eat',     icon: '🍔' },
]

/**
 * CategoryNav
 *
 * Props:
 *   selectedCategory  string   — currently active category id
 *   onSelect          fn       — (categoryId) => void
 *   getCategoryCount  fn       — (categoryId) => number
 *   isMobileMenuOpen  bool
 *   onMobileMenuToggle fn
 */
function CategoryNav({
  selectedCategory,
  onSelect,
  getCategoryCount,
  isMobileMenuOpen,
  onMobileMenuToggle,
}) {
  return (
    <>
      {/* ── Desktop pill bar ── */}
      <div className="hidden md:flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-2xl border border-stone-100 shadow-xs">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/10'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-md font-bold ${
                  isActive
                    ? 'bg-emerald-700 text-emerald-100'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {getCategoryCount(cat.id)}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* ── Mobile hamburger button ── */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={onMobileMenuToggle}
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 bg-white shadow-sm border border-stone-200 rounded-xl gap-1.5 focus:outline-none"
      >
        <span
          className={`h-0.5 w-5 bg-stone-600 rounded-full transition-all duration-300 ${
            isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`h-0.5 w-5 bg-stone-600 rounded-full transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`h-0.5 w-5 bg-stone-600 rounded-full transition-all duration-300 ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </motion.button>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white rounded-2xl border border-stone-100 shadow-md p-3 mb-6 flex flex-col gap-1"
          >
            <p className="text-xs font-bold uppercase text-stone-400 px-3 py-1 tracking-wider">
              Lists &amp; Folders
            </p>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSelect(cat.id)
                    onMobileMenuToggle()
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </div>
                  <span className="text-xs bg-stone-100 px-2 py-0.5 rounded-md text-stone-500 font-bold">
                    {getCategoryCount(cat.id)}
                  </span>
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { categories }
export default CategoryNav