import { motion } from "framer-motion";

/**
 * ProgressBar
 * @param {number}  progress   0-100
 * @param {string}  accentClass  Tailwind bg-* class e.g. "bg-emerald-500"
 * @param {number}  delay      framer-motion animation delay (seconds)
 */
function ProgressBar({ progress, accentClass = "bg-emerald-500", delay = 0 }) {
	return (
		<div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
			<motion.div
				className={`h-full ${accentClass} rounded-full`}
				initial={{ width: 0 }}
				animate={{ width: `${progress}%` }}
				transition={{ duration: 0.6, ease: "easeOut", delay }}
			/>
		</div>
	);
}

export default ProgressBar;
