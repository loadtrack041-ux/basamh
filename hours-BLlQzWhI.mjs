//#region node_modules/.nitro/vite/services/ssr/assets/hours-BLlQzWhI.js
var TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;
function parseMinutes(time) {
	const match = TIME_RE.exec(time);
	if (!match) throw new Error("Enter times as HH:MM (24-hour).");
	return Number(match[1]) * 60 + Number(match[2]);
}
function isValidTime(time) {
	return TIME_RE.test(time);
}
function calculateOvertimeHours(startTime, endTime) {
	const start = parseMinutes(startTime);
	const end = parseMinutes(endTime);
	if (start === end) throw new Error("Start and end time cannot be the same.");
	const crossesMidnight = end < start;
	const minutes = crossesMidnight ? end + 1440 - start : end - start;
	if (minutes <= 0 || minutes > 1440) throw new Error("Overtime duration must be between 1 minute and 24 hours.");
	return {
		hours: Math.round(minutes / 60 * 100) / 100,
		crossesMidnight,
		minutes
	};
}
/** Inclusive ranges in minutes from work_date midnight. End may exceed 24h. */
function overtimeRange(workDate, startTime, endTime) {
	const { crossesMidnight } = calculateOvertimeHours(startTime, endTime);
	const day = Date.parse(`${workDate}T00:00:00Z`);
	if (Number.isNaN(day)) throw new Error("Invalid date.");
	return {
		start: day + parseMinutes(startTime) * 6e4,
		end: day + (parseMinutes(endTime) + (crossesMidnight ? 1440 : 0)) * 6e4
	};
}
function rangesOverlap(a, b) {
	return a.start < b.end && b.start < a.end;
}
function formatTime12(time) {
	if (!TIME_RE.test(time)) return time;
	const [h, m] = time.split(":").map(Number);
	const period = h < 12 ? "AM" : "PM";
	return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${period}`;
}
function formatHours(hours) {
	const n = Math.round(hours * 100) / 100;
	return `${Number.isInteger(n) ? String(n) : n.toFixed(2)} ${n === 1 ? "hour" : "hours"}`;
}
function currentMonthKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function monthBounds(monthKey) {
	const [yearStr, monthStr] = monthKey.split("-");
	const year = Number(yearStr);
	const month = Number(monthStr);
	if (!year || !month || month < 1 || month > 12) throw new Error("Invalid month.");
	const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
	return {
		from: `${yearStr}-${monthStr}-01`,
		to: `${yearStr}-${monthStr}-${String(last).padStart(2, "0")}`,
		label: new Date(year, month - 1, 1).toLocaleString("en-GB", {
			month: "long",
			year: "numeric"
		})
	};
}
function shiftMonth(monthKey, delta) {
	const [y, m] = monthKey.split("-").map(Number);
	const date = new Date(y, m - 1 + delta, 1);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}
//#endregion
export { isValidTime as a, rangesOverlap as c, formatTime12 as i, shiftMonth as l, currentMonthKey as n, monthBounds as o, formatHours as r, overtimeRange as s, calculateOvertimeHours as t };
