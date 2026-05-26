import { useState } from "react";
import { motion } from "framer-motion";
import useTaskStore from "../store/taskStore";
import StatusSelect from "./StatusSelect";
import { STATUS } from "../constants";

function TaskItem({ task }) {
	const { deleteTask, updateTask } = useTaskStore();
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(task.title);

	const handleSave = () => {
		if (editedTitle.trim()) {
			updateTask(task.id, { title: editedTitle });
			setIsEditing(false);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") handleSave();
		if (e.key === "Escape") setIsEditing(false);
	};

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.95 }}
			className="bg-white border border-stone-100 p-4 rounded-xl flex items-center justify-between shadow-xs gap-4"
		>
			{/* Title / Edit input */}
			<div className="flex-1 flex items-center gap-3 min-w-0">
				{isEditing ? (
					<input
						type="text"
						value={editedTitle}
						onChange={(e) => setEditedTitle(e.target.value)}
						onKeyDown={handleKeyDown}
						className="flex-1 p-1.5 border border-emerald-400 rounded-lg outline-none text-sm"
						autoFocus
					/>
				) : (
					<p
						className={`text-sm font-medium truncate ${
							task.status === STATUS.COMPLETE
								? "line-through text-stone-400"
								: "text-stone-800"
						}`}
					>
						{task.title}
					</p>
				)}
			</div>

			{/* Actions */}
			<div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
				<StatusSelect
					value={task.status}
					onChange={(val) => updateTask(task.id, { status: val })}
				/>

				{isEditing ? (
					<button
						onClick={handleSave}
						className="text-xs bg-emerald-600 text-white px-2.5 py-1.5 rounded-lg font-medium"
					>
						Save
					</button>
				) : (
					<button
						onClick={() => setIsEditing(true)}
						className="text-xs text-stone-500 hover:bg-stone-100 p-1.5 rounded-lg transition-all"
						aria-label="Edit task"
					>
						✏️
					</button>
				)}

				<button
					onClick={() => deleteTask(task.id)}
					className="text-xs text-red-400 hover:bg-red-50 p-1.5 rounded-lg transition-all"
					aria-label="Delete task"
				>
					🗑️
				</button>
			</div>
		</motion.div>
	);
}

export default TaskItem;
