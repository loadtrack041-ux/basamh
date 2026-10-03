import { i as formatTime12 } from "./hours-BLlQzWhI.mjs";
import { n as format, t as parseISO } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-DR5st7Zr.js
function formatWorkDate(isoDate) {
	try {
		return format(parseISO(isoDate), "dd MMM yyyy");
	} catch {
		return isoDate;
	}
}
function formatDateTime(iso) {
	if (!iso) return "—";
	try {
		return format(parseISO(iso), "dd MMM yyyy, HH:mm");
	} catch {
		return iso;
	}
}
function formatClock(time) {
	return formatTime12(time);
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}
//#endregion
export { initials as i, formatDateTime as n, formatWorkDate as r, formatClock as t };
