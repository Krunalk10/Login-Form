import { useState } from "react";
import useAuthStore from "../store/authStore";
import useTaskStore from "../store/taskStore";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import CategoryNav from "../components/CategoryNav";
import CategoryCards from "../components/CategoryCards";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_CATEGORIES } from "../constants";

function Home() {
	const { user } = useAuthStore();
	const { tasks } = useTaskStore();

	const [selectedCategory, setSelectedCategory] = useState("All");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const userTasks = tasks.filter((t) => t.userId === user?.email);

	const filteredTasks = userTasks.filter((t) => {
		if (selectedCategory === "All") return true;
		return t.category === selectedCategory;
	});

	const totalTasks = userTasks.length;
	const completedCount = userTasks.filter(
		(t) => t.status === "Complete",
	).length;
	const partialCount = userTasks.filter(
		(t) => t.status === "Partially Complete",
	).length;
	const pendingCount = userTasks.filter(
		(t) => t.status === "Not Complete",
	).length;

	const getCategoryCount = (catId) => {
		if (catId === "All") return userTasks.length;
		return userTasks.filter((t) => t.category === catId).length;
	};

	const activeCategoryLabel =
		NAV_CATEGORIES.find((c) => c.id === selectedCategory)?.label || "My Day";

	return (
		<div className="min-h-screen bg-gradient-to-b from-stone-50 to-emerald-50/40 p-4 sm:p-6 md:p-8">
			<div className="max-w-5xl mx-auto">
				<Navbar />

				{/* Page heading + mobile hamburger */}
				<div className="mb-6 flex items-start justify-between gap-4">
					<div>
						<h2 className="text-3xl font-bold text-stone-800 tracking-tight">
							Hello, {user?.name || "Friend"}!
						</h2>
						<p className="text-stone-500 text-sm mt-0.5">
							Organize your workflows cleanly.
						</p>
					</div>

					<CategoryNav
						selectedCategory={selectedCategory}
						onSelect={setSelectedCategory}
						getCategoryCount={getCategoryCount}
						isMobileMenuOpen={isMobileMenuOpen}
						onMobileMenuToggle={() => setIsMobileMenuOpen((v) => !v)}
					/>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-xs">
						<p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
							Total Tasks
						</p>
						<p className="text-2xl font-bold text-stone-800 mt-0.5">
							{totalTasks}
						</p>
					</div>
					<div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-xs">
						<p className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
							Complete
						</p>
						<p className="text-2xl font-bold text-emerald-600 mt-0.5">
							{completedCount}
						</p>
					</div>
					<div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-xs">
						<p className="text-xs font-bold text-amber-500 uppercase tracking-wider">
							Partial
						</p>
						<p className="text-2xl font-bold text-amber-600 mt-0.5">
							{partialCount}
						</p>
					</div>
					<div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-xs">
						<p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
							Remaining
						</p>
						<p className="text-2xl font-bold text-stone-700 mt-0.5">
							{pendingCount}
						</p>
					</div>
				</div>

				{/* Category cards — desktop only */}
				<div className="hidden md:block mb-2">
					<h3 className="text-stone-700 font-bold text-xs tracking-wide uppercase mb-4 px-1">
						Categories
					</h3>
					<CategoryCards />
				</div>

				{/* Add task */}
				<TaskForm
					currentCategory={
						selectedCategory === "All" ? "All" : selectedCategory
					}
				/>

				{/* Filtered task list */}
				<div className="space-y-3">
					<div className="flex items-center justify-between px-1">
						<h4 className="text-stone-700 font-bold text-sm tracking-wide uppercase">
							{activeCategoryLabel} Agenda
						</h4>
						<span className="text-xs text-stone-400 font-medium font-mono">
							Showing {filteredTasks.length} elements
						</span>
					</div>

					{filteredTasks.length === 0 ? (
						<motion.div
							layout
							className="text-center py-12 bg-white rounded-2xl border border-dashed border-stone-200 text-stone-400 text-sm shadow-2xs"
						>
							✨ No entries logged inside this bucket. Time to relax or schedule
							a clean task!
						</motion.div>
					) : (
						<div className="flex flex-col gap-2.5">
							<AnimatePresence mode="popLayout">
								{filteredTasks.map((task) => (
									<TaskItem key={task.id} task={task} />
								))}
							</AnimatePresence>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;
