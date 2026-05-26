import { STATUS_OPTIONS, STATUS_STYLES } from "../constants";

/**
 * StatusSelect
 * Shared controlled select for task status.
 *
 * @param {string}   value       current status string
 * @param {Function} onChange    (newValue: string) => void
 * @param {string}   className   extra Tailwind classes
 */
function StatusSelect({ value, onChange, className = "" }) {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium outline-none ${STATUS_STYLES[value]} ${className}`}
		>
			{STATUS_OPTIONS.map((s) => (
				<option key={s} value={s}>
					{s}
				</option>
			))}
		</select>
	);
}

export default StatusSelect;
