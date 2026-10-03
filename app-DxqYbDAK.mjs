import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { s as isAdminRole } from "./types-ewVYReTc.mjs";
import { n as currentMonthKey, r as formatHours } from "./hours-BLlQzWhI.mjs";
import { n as useActor } from "./actor-BiCkV9LO.mjs";
import { n as PageHeader, r as StatCard, t as EmptyState } from "./empty-state-8P1X4Fw6.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { t as RoleBadge } from "./status-badge-CsNiohDG.mjs";
import { O as workerSummary, a as dashboardStats, h as listUsers, m as listOvertime, x as startImpersonation } from "./server-fns-CWYoxqTA.mjs";
import { t as MonthPicker } from "./month-picker-BxO-jHr9.mjs";
import { n as format, t as parseISO } from "../_libs/date-fns.mjs";
import { t as OvertimeCard } from "./overtime-card-CaFyrBaT.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-DxqYbDAK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const actor = useActor();
	const [month, setMonth] = (0, import_react.useState)(currentMonthKey());
	const role = actor.acting.role;
	const stats = useQuery({
		queryKey: ["stats", month],
		queryFn: () => dashboardStats({ data: month })
	});
	const pending = useQuery({
		queryKey: [
			"ot",
			"pending",
			month
		],
		queryFn: () => listOvertime({ data: {
			month,
			status: "pending"
		} })
	});
	const mine = useQuery({
		queryKey: [
			"ot",
			"mine",
			month
		],
		queryFn: () => listOvertime({ data: { month } }),
		enabled: role === "worker"
	});
	const summary = useQuery({
		queryKey: ["summary", month],
		queryFn: () => workerSummary({ data: { month } }),
		enabled: isAdminRole(role) || role === "supervisor"
	});
	const demoUsers = useQuery({
		queryKey: ["demo-users"],
		queryFn: () => listUsers({ data: {} }),
		enabled: actor.real.role === "super_admin" && !actor.impersonating
	});
	const s = stats.data;
	const chart = (s?.daily ?? []).map((d) => ({
		label: format(parseISO(d.date), "d"),
		hours: d.hours
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: actor.companyName,
			title: greeting(actor.acting.fullName),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleBadge, { role })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthPicker, {
				value: month,
				onChange: setMonth
			})
		}),
		role === "worker" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "xl",
			className: "mb-5 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app/submit",
				children: "Submit today’s overtime"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-5 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-muted",
			children: "Workers do not log in. Add them in People and send their personal link. They mark attendance and overtime; you sign to approve."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-4",
			children: [
				role !== "worker" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Workers",
					value: s?.totalWorkers ?? "—"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "OT hours",
					value: s ? round(s.totalHours) : "—",
					hint: "Pending + approved"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Pending",
					value: s?.pendingCount ?? "—",
					hint: s ? formatHours(s.pendingHours) : void 0
				}),
				role !== "worker" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Hazri",
					value: s ? `${s.presentDays} in` : "—",
					hint: s ? `${s.absentDays} absent` : void 0
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Approved",
					value: s?.approvedCount ?? "—",
					hint: s ? formatHours(s.approvedHours) : void 0
				})
			]
		}),
		chart.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 rounded-xl border border-line bg-surface p-4 shadow-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.14em] text-muted",
				children: "Daily hours"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: chart,
						barCategoryGap: 6,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								tick: {
									fontSize: 11,
									fill: "#6b645b"
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								cursor: { fill: "rgba(33,86,76,0.08)" },
								contentStyle: {
									borderRadius: 12,
									borderColor: "#ddd6c8",
									fontSize: 12
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "hours",
								fill: "#21564c",
								radius: [
									4,
									4,
									0,
									0
								]
							})
						]
					})
				})
			})]
		}) : null,
		actor.real.role === "super_admin" && !actor.impersonating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoRoles, { users: demoUsers.data ?? [] }) : null,
		role === "worker" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-lg font-semibold",
				children: "This month"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [(mine.data ?? []).slice(0, 6).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OvertimeCard, {
					record: r,
					href: `/app/overtime/${r.id}`,
					showWorker: false
				}, r.id)), mine.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No overtime yet",
					body: "Submit extra hours after your shift. Your supervisor will sign them on their phone."
				}) : null]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Pending approvals"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/pending",
					className: "text-sm text-accent",
					children: "View all"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [(pending.data ?? []).slice(0, 5).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OvertimeCard, {
					record: r,
					href: `/app/approve/${r.id}`
				}, r.id)), pending.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Nothing waiting",
					body: "When your team submits overtime, it will land here for a signature."
				}) : null]
			})]
		}),
		(isAdminRole(role) || role === "supervisor") && summary.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-lg font-semibold",
				children: "Worker summary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-line bg-surface shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden grid-cols-[1.4fr_1fr_1fr_1fr] gap-2 border-b border-line bg-surface-2 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-muted md:grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Worker" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total OT" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Approved" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pending" })
					]
				}), summary.data.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/users/$id",
					params: { id: w.userId },
					className: "grid grid-cols-2 gap-2 border-b border-line px-4 py-3 last:border-0 md:grid-cols-[1.4fr_1fr_1fr_1fr]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: w.fullName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								w.employeeId,
								" · ",
								w.departmentName ?? "No dept"
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tabular-nums text-sm",
							children: [round(w.totalHours), " h"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tabular-nums text-sm text-approved",
							children: [round(w.approvedHours), " h"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tabular-nums text-sm text-pending",
							children: [round(w.pendingHours), " h"]
						})
					]
				}, w.userId))]
			})]
		}) : null
	] });
}
function round(n) {
	return Math.round(n * 100) / 100;
}
function greeting(name) {
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const first = name.split(" ")[0] ?? name;
	if (hour < 12) return `Good morning, ${first}`;
	if (hour < 17) return `Good afternoon, ${first}`;
	return `Good evening, ${first}`;
}
function DemoRoles({ users }) {
	const qc = useQueryClient();
	const picks = [users.find((u) => u.role === "admin"), users.find((u) => u.role === "supervisor")].filter(Boolean);
	if (picks.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 rounded-xl border border-line bg-accent-soft/60 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-semibold",
				children: "Try a demo role"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Walk as a supervisor or admin without signing out. Workers use a personal link, not this login."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-2 md:grid-cols-3",
				children: [picks.map((u) => u ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "secondary",
					onClick: async () => {
						await startImpersonation({ data: u.userId });
						await qc.invalidateQueries();
						window.location.href = "/app";
					},
					children: [
						u.fullName.split(" ")[0],
						" · ",
						u.role
					]
				}, u.userId) : null), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					onClick: () => window.location.href = "/w/demo-luis",
					children: "Luis · worker link"
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
