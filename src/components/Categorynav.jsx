// import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTaskStore from "../store/taskStore";
import useAuthStore from "../store/authStore";
import { NAV_CATEGORIES, CATEGORIES } from "../constants";

// ── Mobile category card (mirrors desktop CategoryCard visually) ───────────
function MobileCategoryCard({ cat, tasks, isActive, onSelect }) {
	const complete = tasks.filter((t) => t.status === "Complete").length;
	const partial = tasks.filter((t) => t.status === "Partially Complete").length;
	const remaining = tasks.filter((t) => t.status === "Not Complete").length;
	const progress =
		tasks.length > 0 ? Math.round((complete / tasks.length) * 100) : 0;

	return (
		<motion.button
			whileTap={{ scale: 0.97 }}
			onClick={() => onSelect(cat.id)}
			className={`text-left w-full bg-gradient-to-br ${cat.gradient} border ${
				isActive
					? "border-2 " + cat.ring.replace("ring-", "border-")
					: cat.border
			} rounded-2xl p-4 cursor-pointer focus:outline-none focus:ring-2 ${cat.ring} transition-all`}
		>
			<div className="flex items-start justify-between mb-2">
				<span className="text-2xl leading-none">{cat.icon}</span>
				<span
					className={`text-xs font-bold px-2 py-0.5 rounded-lg ${cat.badge}`}
				>
					{tasks.length} task{tasks.length !== 1 ? "s" : ""}
				</span>
			</div>
			<p className={`font-bold text-sm ${cat.text} mb-1`}>{cat.label}</p>
			<div className="flex items-center gap-2 mb-2 flex-wrap">
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
				<div
					className={`h-full ${cat.accent} rounded-full transition-all duration-500`}
					style={{ width: `${progress}%` }}
				/>
			</div>
			<p className="text-xs text-stone-400 mt-1 text-right">
				{progress}% complete
			</p>
		</motion.button>
	);
}

// ── Main CategoryNav ───────────────────────────────────────────────────────
function CategoryNav({
	selectedCategory,
	onSelect,
	getCategoryCount,
	isMobileMenuOpen,
	onMobileMenuToggle,
}) {
	const { tasks } = useTaskStore();
	const { user } = useAuthStore();
	const userTasks = tasks.filter((t) => t.userId === user?.email);
	const getTasksFor = (catId) =>
		catId === "All" ? userTasks : userTasks.filter((t) => t.category === catId);

	const activeCatLabel =
		NAV_CATEGORIES.find((c) => c.id === selectedCategory)?.label || "My Day";

	return (
		<div className="relative w-full">
			{/* ── Mobile Top Bar ── */}
			<div className="md:hidden flex items-center justify-between mb-4">
				<h2 className="text-lg font-bold text-stone-800">{activeCatLabel}</h2>

				{/* Hamburger */}
				<motion.button
					whileTap={{ scale: 0.92 }}
					onClick={onMobileMenuToggle}
					aria-label="Toggle category menu"
					className="relative z-50 flex flex-col justify-center items-center w-11 h-11 bg-white shadow-sm border border-stone-200 rounded-xl gap-1.5"
				>
					<span
						className={`absolute h-0.5 w-5 bg-stone-700 rounded-full transition-all duration-300 ${
							isMobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
						}`}
					/>
					<span
						className={`absolute h-0.5 w-5 bg-stone-700 rounded-full transition-all duration-300 ${
							isMobileMenuOpen ? "opacity-0" : "opacity-100"
						}`}
					/>
					<span
						className={`absolute h-0.5 w-5 bg-stone-700 rounded-full transition-all duration-300 ${
							isMobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
						}`}
					/>
				</motion.button>
			</div>

			{/* ── Mobile Full-Screen Menu (card grid layout) ── */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={onMobileMenuToggle}
							className="fixed inset-0 bg-black/40 z-40 md:hidden"
						/>

						{/* Slide-down panel */}
						<motion.div
							initial={{ opacity: 0, y: -16 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -16 }}
							transition={{ duration: 0.22, ease: "easeOut" }}
							className="fixed top-0 left-0 right-0 bottom-0 z-50 md:hidden bg-stone-50 flex flex-col overflow-hidden"
						>
							{/* Panel header */}
							<div className="flex items-center justify-between px-4 py-4 bg-white border-b border-stone-100 shadow-xs flex-shrink-0">
								<div>
									<p className="text-xs font-bold uppercase text-stone-400 tracking-wider">
										Categories
									</p>
									<h3 className="text-base font-bold text-stone-800 leading-tight">
										Choose a list
									</h3>
								</div>
								<motion.button
									whileTap={{ scale: 0.92 }}
									onClick={onMobileMenuToggle}
									className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 font-bold text-sm transition-all"
								>
									✕
								</motion.button>
							</div>

							{/* Scrollable content */}
							<div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
								{/* "My Day / All" row */}
								<motion.button
									whileTap={{ scale: 0.97 }}
									onClick={() => {
										onSelect("All");
										onMobileMenuToggle();
									}}
									className={`w-full text-left flex items-center justify-between px-4 py-3.5 rounded-2xl border font-semibold text-sm transition-all ${
										selectedCategory === "All"
											? "bg-emerald-50 border-emerald-200 text-emerald-700"
											: "bg-white border-stone-100 text-stone-700 hover:bg-stone-50"
									}`}
								>
									<div className="flex items-center gap-3">
										<span className="text-xl">☀️</span>
										<span>My Day</span>
									</div>
									<span
										className={`text-xs px-2.5 py-1 rounded-lg font-bold ${
											selectedCategory === "All"
												? "bg-emerald-100 text-emerald-700"
												: "bg-stone-100 text-stone-500"
										}`}
									>
										{getCategoryCount("All")}
									</span>
								</motion.button>

								{/* Section label */}
								<p className="text-xs font-bold uppercase text-stone-400 tracking-wider px-1">
									All Lists
								</p>

								{/* Category cards grid — same visual as desktop */}
								<div className="grid grid-cols-2 gap-3">
									{CATEGORIES.map((cat) => (
										<div
											key={cat.id}
											onClick={() => {
												onSelect(cat.id);
												onMobileMenuToggle();
											}}
										>
											<MobileCategoryCard
												cat={cat}
												tasks={getTasksFor(cat.id)}
												isActive={selectedCategory === cat.id}
												onSelect={() => {}}
											/>
										</div>
									))}
								</div>
							</div>

							{/* Done button */}
							<div className="flex-shrink-0 px-4 py-4 bg-white border-t border-stone-100">
								<button
									onClick={onMobileMenuToggle}
									className="w-full bg-stone-900 hover:bg-black text-white py-3.5 rounded-xl text-sm font-semibold transition-all"
								>
									Done
								</button>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}

export default CategoryNav;
