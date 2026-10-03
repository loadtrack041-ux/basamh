import { S as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as formatHours } from "./hours-BLlQzWhI.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as StatusBadge } from "./status-badge-CsNiohDG.mjs";
import { d as Clock3, o as Moon } from "../_libs/lucide-react.mjs";
import { r as formatWorkDate, t as formatClock } from "./format-DR5st7Zr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/overtime-card-CaFyrBaT.js
var import_jsx_runtime = require_jsx_runtime();
function OvertimeCard({ record, href, showWorker = true, footer }) {
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [showWorker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: record.workerName
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: formatWorkDate(record.workDate)
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: record.status })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-center gap-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 text-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4 text-muted" }),
					formatClock(record.startTime),
					" – ",
					formatClock(record.endTime)
				]
			}), record.crossesMidnight ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 text-pending",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-3.5" }), "Overnight"]
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-xl font-semibold tabular-nums",
			children: formatHours(record.totalHours)
		}),
		record.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 line-clamp-2 text-sm text-muted",
			children: record.description
		}) : null,
		record.rejectionReason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-rejected",
			children: record.rejectionReason
		}) : null,
		footer
	] });
	const className = cn("block rounded-xl border border-line bg-surface p-4 shadow-soft", href && "transition-transform duration-150 active:scale-[0.99]");
	if (href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: href,
		className,
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		children: body
	});
}
//#endregion
export { OvertimeCard as t };
