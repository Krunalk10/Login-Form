import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTaskStore from "../store/taskStore";
import useAuthStore from "../store/authStore";
import CategoryModal from "./CategoryModal";
import { CATEGORIES } from "../constants";

// ── Single category card ───────────────────────────────────────────────────
function CategoryCard({ cat, tasks, index, onOpen }) {
	const complete = tasks.filter((t) => t.status === "Complete").length;
	const partial = tasks.filter((t) => t.status === "Partially Complete").length;
	const remaining = tasks.filter((t) => t.status === "Not Complete").length;
	const progress =
		tasks.length > 0 ? Math.round((complete / tasks.length) * 100) : 0;

	return (
		<motion.button
			layout
			initial={{ opacity: 0, y: 24, scale: 0.96 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{
				delay: index * 0.07,
				type: "spring",
				stiffness: 280,
				damping: 24,
			}}
			whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.18 } }}
			whileTap={{ scale: 0.97 }}
			onClick={() => onOpen(cat.id)}
			className={`text-left w-full bg-gradient-to-br ${cat.gradient} border ${cat.border} rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus:ring-2 ${cat.ring}`}
		>
			<div className="flex items-start justify-between mb-3">
				<span className="text-3xl leading-none">{cat.icon}</span>
				<span
					className={`text-xs font-bold px-2.5 py-1 rounded-lg ${cat.badge}`}
				>
					{tasks.length} task{tasks.length !== 1 ? "s" : ""}
				</span>
			</div>

			<p className={`font-bold text-base ${cat.text} mb-1`}>{cat.label}</p>

			<div className="flex items-center gap-3 mb-3 flex-wrap">
				{[
					{ label: "Done", count: complete, dot: "bg-emerald-500" },
					{ label: "Part", count: partial, dot: "bg-amber-400" },
					{ label: "Open", count: remaining, dot: "bg-stone-300" },
				].map(({ label, count, dot }) => (
					<span
						key={label}
						className="flex items-center gap-1 text-xs text-stone-500"
					>
						<span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
						{count} {label}
					</span>
				))}
			</div>

			<div className="h-1 bg-white/50 rounded-full overflow-hidden">
				<motion.div
					className={`h-full ${cat.accent} rounded-full`}
					initial={{ width: 0 }}
					animate={{ width: `${progress}%` }}
					transition={{
						duration: 0.5,
						ease: "easeOut",
						delay: index * 0.07 + 0.2,
					}}
				/>
			</div>
			<p className="text-xs text-stone-400 mt-1.5 text-right">
				{progress}% complete
			</p>
		</motion.button>
	);
}

// ── Main export ────────────────────────────────────────────────────────────
function CategoryCards() {
	const { tasks } = useTaskStore();
	const { user } = useAuthStore();
	const [openCatId, setOpenCatId] = useState(null);

	const userTasks = tasks.filter((t) => t.userId === user?.email);
	const getTasksFor = (catId) => userTasks.filter((t) => t.category === catId);

	const activeCat = CATEGORIES.find((c) => c.id === openCatId);
	const activeTasks = openCatId ? getTasksFor(openCatId) : [];

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
				{CATEGORIES.map((cat, i) => (
					<CategoryCard
						key={cat.id}
						cat={cat}
						tasks={getTasksFor(cat.id)}
						index={i}
						onOpen={setOpenCatId}
					/>
				))}
			</div>

			<AnimatePresence>
				{openCatId && activeCat && (
					<CategoryModal
						cat={activeCat}
						tasks={activeTasks}
						onClose={() => setOpenCatId(null)}
					/>
				)}
			</AnimatePresence>
		</>
	);
}

export default CategoryCards;
