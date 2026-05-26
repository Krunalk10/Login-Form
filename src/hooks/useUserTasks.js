import useTaskStore from "../store/taskStore";
import useAuthStore from "../store/authStore";
import { STATUS } from "../constants";

/**
 * useUserTasks
 * Returns the current user's tasks plus handy derived counts.
 * Keeps Home.jsx and CategoryCards.jsx free of repetitive filter logic.
 */
function useUserTasks() {
	const { tasks } = useTaskStore();
	const { user } = useAuthStore();

	const userTasks = tasks.filter((t) => t.userId === user?.email);

	const getTasksFor = (catId) =>
		catId === "All" ? userTasks : userTasks.filter((t) => t.category === catId);

	const getCategoryCount = (catId) => getTasksFor(catId).length;

	const totalTasks = userTasks.length;
	const completedCount = userTasks.filter(
		(t) => t.status === STATUS.COMPLETE,
	).length;
	const partialCount = userTasks.filter(
		(t) => t.status === STATUS.PARTIAL,
	).length;
	const pendingCount = userTasks.filter((t) => t.status === STATUS.OPEN).length;

	return {
		userTasks,
		getTasksFor,
		getCategoryCount,
		totalTasks,
		completedCount,
		partialCount,
		pendingCount,
	};
}

export default useUserTasks;
