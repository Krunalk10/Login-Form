import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useTaskStore from "../store/taskStore";
import useAuthStore from "../store/authStore";
import TaskItem from "./TaskItem";
import ProgressBar from "./ProgressBar";
import { STATUS, STATUS_OPTIONS, STATUS_DOT } from "../constants";

function CategoryModal({ cat, tasks, onClose }) {
	const { addTask } = useTaskStore();
	const { user } = useAuthStore();

	const [newTitle, setNewTitle] = useState("");
	const [newStatus, setNewStatus] = useState(STATUS.OPEN);

	const complete = tasks.filter((t) => t.status === STATUS.COMPLETE).length;
	const progress =
		tasks.length > 0 ? Math.round((complete / tasks.length) * 100) : 0;

	const handleAdd = () => {
		if (!newTitle.trim()) return;
		addTask({
			id: Date.now(),
			userId: user?.email,
			title: newTitle.trim(),
			status: newStatus,
			category: cat.id,
		});
		setNewTitle("");
		setNewStatus(STATUS.OPEN);
	};

	return (
		<motion.div
			className="fixed inset-0 z-50 flex items-center justify-center p-4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={onClose}
		>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm" />

			{/* Modal card */}
			<motion.div
				className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-lg h-[92vh] md:max-h-[85vh] flex flex-col overflow-hidden border border-stone-100"
				initial={{ scale: 0.85, y: 40, opacity: 0 }}
				animate={{ scale: 1, y: 0, opacity: 1 }}
				exit={{ scale: 0.9, y: 20, opacity: 0 }}
				transition={{ type: "spring", stiffness: 320, damping: 28 }}
				onClick={(e) => e.stopPropagation()}
			>
				{/* ── Header ── */}
				<div
					className={`bg-gradient-to-br ${cat.gradient} px-4 md:px-6 pt-5 md:pt-6 pb-4 border-b ${cat.border} flex-shrink-0`}
				>
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-3">
							<span className="text-3xl md:text-4xl leading-none">
								{cat.icon}
							</span>
							<div>
								<h2 className={`text-lg md:text-xl font-bold ${cat.text}`}>
									{cat.label}
								</h2>
								<p className="text-xs text-stone-500 mt-0.5">
									{tasks.length} task{tasks.length !== 1 ? "s" : ""} ·{" "}
									{complete} done
								</p>
							</div>
						</div>

						<button
							onClick={onClose}
							className="w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-stone-400 hover:text-stone-700 transition-all text-sm shadow-xs"
							aria-label="Close modal"
						>
							✕
						</button>
					</div>

					{/* Progress */}
					<div className="mt-4">
						<div className="flex justify-between text-xs text-stone-500 mb-1">
							<span>Progress</span>
							<span className="font-bold">{progress}%</span>
						</div>
						<ProgressBar
							progress={progress}
							accentClass={cat.accent}
							delay={0.2}
						/>
					</div>
				</div>

				{/* ── Add Task Form ── */}
				<div className="px-4 md:px-5 py-4 border-b border-stone-100 flex-shrink-0 bg-stone-50/50">
					<p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
						Add to {cat.label}
					</p>
					<div className="flex flex-col gap-2">
						<input
							type="text"
							value={newTitle}
							onChange={(e) => setNewTitle(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleAdd()}
							placeholder={`New ${cat.label.toLowerCase()} task…`}
							className={`w-full px-3 py-3 text-sm border border-stone-200 rounded-xl outline-none focus:ring-2 ${cat.inputFocus} bg-white text-stone-800 transition-all`}
						/>
						<div className="flex flex-col sm:flex-row gap-2">
							<select
								value={newStatus}
								onChange={(e) => setNewStatus(e.target.value)}
								className="flex-1 px-3 py-3 text-sm border border-stone-200 rounded-xl bg-white outline-none text-stone-700"
							>
								{STATUS_OPTIONS.map((s) => (
									<option key={s} value={s}>
										{s}
									</option>
								))}
							</select>
							<motion.button
								whileTap={{ scale: 0.95 }}
								onClick={handleAdd}
								className={`${cat.btnBg} text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap`}
							>
								+ Add Task
							</motion.button>
						</div>
					</div>
				</div>

				{/* ── Task List ── */}
				<div className="overflow-y-auto flex-1 p-4 space-y-2.5">
					{tasks.length === 0 ? (
						<div className="text-center py-10 text-stone-400 text-sm">
							<p className="text-3xl mb-3">✨</p>
							<p>No tasks yet. Add one above!</p>
						</div>
					) : (
						<AnimatePresence mode="popLayout">
							{tasks.map((task, i) => (
								<motion.div
									key={task.id}
									initial={{ opacity: 0, x: -12 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 12, height: 0, marginBottom: 0 }}
									transition={{ delay: i * 0.04 }}
								>
									<TaskItem task={task} />
								</motion.div>
							))}
						</AnimatePresence>
					)}
				</div>

				{/* ── Footer ── */}
				<div className="flex-shrink-0 px-4 md:px-5 py-3 border-t border-stone-100 bg-stone-50/50">
					{tasks.length > 0 && (
						<div className="flex flex-wrap gap-4 text-xs text-stone-500 mb-3">
							{Object.entries(STATUS_DOT).map(([label, dot]) => (
								<span key={label} className="flex items-center gap-1.5">
									<span className={`w-2 h-2 rounded-full ${dot}`} />
									{tasks.filter((t) => t.status === label).length}{" "}
									{label === "Complete"
										? "Complete"
										: label === "Partially Complete"
											? "Partial"
											: "Open"}
								</span>
							))}
						</div>
					)}
					<button
						onClick={onClose}
						className="w-full bg-stone-900 hover:bg-black text-white py-3 rounded-xl text-sm font-semibold transition-all"
					>
						Done
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default CategoryModal;
