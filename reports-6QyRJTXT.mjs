import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { s as isAdminRole } from "./types-ewVYReTc.mjs";
import { n as currentMonthKey, r as formatHours } from "./hours-BLlQzWhI.mjs";
import { n as useActor } from "./actor-BiCkV9LO.mjs";
import { n as PageHeader, r as StatCard, t as EmptyState } from "./empty-state-8P1X4Fw6.mjs";
import { h as listUsers, m as listOvertime, p as listDepartments } from "./server-fns-CWYoxqTA.mjs";
import { t as OvertimeCard } from "./overtime-card-CaFyrBaT.mjs";
import { n as Input, r as Select, t as Field } from "./input-DZXKLHSz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-6QyRJTXT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRESETS = [
	{
		id: "month",
		label: "Monthly"
	},
	{
		id: "approved",
		label: "Approved",
		status: "approved"
	},
	{
		id: "pending",
		label: "Pending",
		status: "pending"
	},
	{
		id: "rejected",
		label: "Rejected",
		status: "rejected"
	}
];
function ReportsPage() {
	const actor = useActor();
	const [preset, setPreset] = (0, import_react.useState)("month");
	const [month, setMonth] = (0, import_react.useState)(currentMonthKey());
	const [from, setFrom] = (0, import_react.useState)("");
	const [to, setTo] = (0, import_react.useState)("");
	const [workerUserId, setWorkerUserId] = (0, import_react.useState)("");
	const [employeeId, setEmployeeId] = (0, import_react.useState)("");
	const [supervisorUserId, setSupervisorUserId] = (0, import_react.useState)("");
	const [departmentId, setDepartmentId] = (0, import_react.useState)("");
	const status = PRESETS.find((p) => p.id === preset)?.status;
	const workers = useQuery({
		queryKey: ["users", "worker"],
		queryFn: () => listUsers({ data: { role: "worker" } })
	});
	const supervisors = useQuery({
		queryKey: ["users", "supervisor"],
		queryFn: () => listUsers({ data: { role: "supervisor" } }),
		enabled: isAdminRole(actor.acting.role)
	});
	const depts = useQuery({
		queryKey: ["departments"],
		queryFn: () => listDepartments()
	});
	const records = useQuery({
		queryKey: [
			"report",
			preset,
			month,
			from,
			to,
			workerUserId,
			employeeId,
			supervisorUserId,
			departmentId
		],
		queryFn: () => listOvertime({ data: {
			month: from || to ? void 0 : month,
			from: from || void 0,
			to: to || void 0,
			workerUserId: workerUserId || void 0,
			employeeId: employeeId || void 0,
			supervisorUserId: supervisorUserId || void 0,
			departmentId: departmentId || void 0,
			status
		} })
	});
	const totals = (0, import_react.useMemo)(() => {
		const rows = records.data ?? [];
		const hours = rows.filter((r) => r.status !== "rejected").reduce((s, r) => s + r.totalHours, 0);
		return {
			count: rows.length,
			hours
		};
	}, [records.data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Analytics",
			title: "Reports"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex gap-2 overflow-x-auto pb-1",
			children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setPreset(p.id),
				className: `h-10 shrink-0 rounded-full px-4 text-sm font-medium ${preset === p.id ? "bg-accent text-accent-fg" : "bg-surface-2 text-ink"}`,
				children: p.label
			}, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 rounded-xl border border-line bg-surface p-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Month",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "month",
						value: month,
						onChange: (e) => setMonth(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "From",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: from,
						onChange: (e) => setFrom(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "To",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: to,
						onChange: (e) => setTo(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Worker",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: workerUserId,
						onChange: (e) => setWorkerUserId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All workers"
						}), (workers.data ?? []).map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: w.userId,
							children: w.fullName
						}, w.userId))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Employee ID",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: employeeId,
						onChange: (e) => setEmployeeId(e.target.value),
						placeholder: "WH-3101"
					})
				}),
				isAdminRole(actor.acting.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Supervisor",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: supervisorUserId,
						onChange: (e) => setSupervisorUserId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All supervisors"
						}), (supervisors.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.userId,
							children: s.fullName
						}, s.userId))]
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Department / project",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: departmentId,
						onChange: (e) => setDepartmentId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All departments"
						}), (depts.data ?? []).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: d.id,
							children: d.name
						}, d.id))]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Records",
				value: totals.count
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Hours",
				value: formatHours(totals.hours)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 space-y-3",
			children: [(records.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OvertimeCard, {
				record: r,
				href: `/app/overtime/${r.id}`
			}, r.id)), records.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No matching overtime",
				body: "Widen the filters or pick another month."
			}) : null]
		}),
		isAdminRole(actor.acting.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-sm text-muted",
			children: ["Need a spreadsheet? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app/export",
				className: "text-accent underline-offset-4 hover:underline",
				children: "Export Excel"
			})]
		}) : null
	] });
}
//#endregion
export { ReportsPage as component };
