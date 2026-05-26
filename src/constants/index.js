// ─────────────────────────────────────────────────────────────────────────────
// constants/index.js  —  ONE file for all app-wide constants
// Import from here everywhere: import { CATEGORIES, STATUS } from "../constants"
// ─────────────────────────────────────────────────────────────────────────────

// ── TASK STATUS ──────────────────────────────────────────────────────────────

export const STATUS = {
	COMPLETE: "Complete",
	PARTIAL: "Partially Complete",
	OPEN: "Not Complete",
};

export const STATUS_OPTIONS = [STATUS.COMPLETE, STATUS.PARTIAL, STATUS.OPEN];

export const STATUS_STYLES = {
	[STATUS.COMPLETE]: "bg-emerald-50 text-emerald-700 border-emerald-200",
	[STATUS.PARTIAL]: "bg-amber-50 text-amber-700 border-amber-200",
	[STATUS.OPEN]: "bg-stone-50 text-stone-600 border-stone-200",
};

export const STATUS_DOT = {
	[STATUS.COMPLETE]: "bg-emerald-500",
	[STATUS.PARTIAL]: "bg-amber-400",
	[STATUS.OPEN]: "bg-stone-300",
};

// ── CATEGORIES ───────────────────────────────────────────────────────────────

export const CATEGORIES = [
	{
		id: "My Work",
		label: "My Work",
		icon: "👨‍💻",
		gradient: "from-yellow-500/10 to-orange-500/10",
		accent: "bg-yellow-500",
		ring: "ring-yellow-300",
		text: "text-yellow-700",
		badge: "bg-yellow-100 text-yellow-700",
		border: "border-yellow-100",
		inputFocus: "focus:ring-yellow-300",
		btnBg: "bg-yellow-600 hover:bg-yellow-700",
	},
	{
		id: "Work",
		label: "Work",
		icon: "💼",
		gradient: "from-violet-500/10 to-indigo-500/10",
		accent: "bg-violet-500",
		ring: "ring-violet-300",
		text: "text-violet-700",
		badge: "bg-violet-100 text-violet-700",
		border: "border-violet-100",
		inputFocus: "focus:ring-violet-300",
		btnBg: "bg-violet-600 hover:bg-violet-700",
	},
	{
		id: "Home",
		label: "Home",
		icon: "🏠",
		gradient: "from-sky-500/10 to-cyan-500/10",
		accent: "bg-sky-500",
		ring: "ring-sky-300",
		text: "text-sky-700",
		badge: "bg-sky-100 text-sky-700",
		border: "border-sky-100",
		inputFocus: "focus:ring-sky-300",
		btnBg: "bg-sky-600 hover:bg-sky-700",
	},
	{
		id: "Groceries",
		label: "Groceries",
		icon: "🍉",
		gradient: "from-emerald-500/10 to-teal-500/10",
		accent: "bg-emerald-500",
		ring: "ring-emerald-300",
		text: "text-emerald-700",
		badge: "bg-emerald-100 text-emerald-700",
		border: "border-emerald-100",
		inputFocus: "focus:ring-emerald-300",
		btnBg: "bg-emerald-600 hover:bg-emerald-700",
	},
	{
		id: "Movies",
		label: "Movies to watch",
		icon: "🍿",
		gradient: "from-rose-500/10 to-pink-500/10",
		accent: "bg-rose-500",
		ring: "ring-rose-300",
		text: "text-rose-700",
		badge: "bg-rose-100 text-rose-700",
		border: "border-rose-100",
		inputFocus: "focus:ring-rose-300",
		btnBg: "bg-rose-600 hover:bg-rose-700",
	},
	{
		id: "Places",
		label: "Places to eat",
		icon: "🍔",
		gradient: "from-amber-500/10 to-orange-500/10",
		accent: "bg-amber-500",
		ring: "ring-amber-300",
		text: "text-amber-700",
		badge: "bg-amber-100 text-amber-700",
		border: "border-amber-100",
		inputFocus: "focus:ring-amber-300",
		btnBg: "bg-amber-600 hover:bg-amber-700",
	},
	{
		id: "Card",
		label: "Card",
		icon: "🃏",
		gradient: "from-cyan-500/10 to-blue-500/10",
		accent: "bg-cyan-500",
		ring: "ring-cyan-300",
		text: "text-cyan-700",
		badge: "bg-cyan-100 text-cyan-700",
		border: "border-cyan-100",
		inputFocus: "focus:ring-cyan-300",
		btnBg: "bg-cyan-600 hover:bg-cyan-700",
	},
];

// "All / My Day" entry prepended for the nav filter
export const NAV_CATEGORIES = [
	{ id: "All", label: "My Day", icon: "☀️" },
	...CATEGORIES,
];
