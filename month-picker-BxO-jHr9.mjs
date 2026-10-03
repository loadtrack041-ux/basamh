import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as shiftMonth, o as monthBounds } from "./hours-BLlQzWhI.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { m as ChevronLeft, p as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/month-picker-BxO-jHr9.js
var import_jsx_runtime = require_jsx_runtime();
function MonthPicker({ value, onChange }) {
	const { label } = monthBounds(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-2 py-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon",
				"aria-label": "Previous month",
				onClick: () => onChange(shiftMonth(value, -1)),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-base font-semibold tabular-nums",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon",
				"aria-label": "Next month",
				onClick: () => onChange(shiftMonth(value, 1)),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
			})
		]
	});
}
//#endregion
export { MonthPicker as t };
