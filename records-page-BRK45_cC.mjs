import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { n as currentMonthKey } from "./hours-BLlQzWhI.mjs";
import { n as useActor } from "./actor-BiCkV9LO.mjs";
import { n as PageHeader, t as EmptyState } from "./empty-state-8P1X4Fw6.mjs";
import { m as listOvertime } from "./server-fns-CWYoxqTA.mjs";
import { t as MonthPicker } from "./month-picker-BxO-jHr9.mjs";
import { t as OvertimeCard } from "./overtime-card-CaFyrBaT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/records-page-BRK45_cC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RecordsPage({ title, kicker, status, hrefFor }) {
	const actor = useActor();
	const [month, setMonth] = (0, import_react.useState)(currentMonthKey());
	const query = useQuery({
		queryKey: [
			"ot",
			status ?? "all",
			month,
			actor.acting.userId
		],
		queryFn: () => listOvertime({ data: {
			month,
			status
		} })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker,
			title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthPicker, {
				value: month,
				onChange: setMonth
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [(query.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OvertimeCard, {
				record: r,
				href: hrefFor(r.id),
				showWorker: actor.acting.role !== "worker"
			}, r.id)), query.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No records",
				body: "Nothing in this month matches the current filter."
			}) : null]
		})
	] });
}
//#endregion
export { RecordsPage as t };
