import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as canManageAdmins, o as canManageUsers, r as canAddWorkers } from "./types-ewVYReTc.mjs";
import { n as currentMonthKey } from "./hours-BLlQzWhI.mjs";
import { n as useActor } from "./actor-BiCkV9LO.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as PageHeader } from "./empty-state-8P1X4Fw6.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { t as RoleBadge } from "./status-badge-CsNiohDG.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route } from "./router-BJ8T7AVI.mjs";
import { E as updateUser, _ as regenerateWorkerLink, d as listAttendance, h as listUsers, l as getUser, m as listOvertime, p as listDepartments, u as getWorkerLink, x as startImpersonation, y as resetUserPassword } from "./server-fns-CWYoxqTA.mjs";
import { t as MonthPicker } from "./month-picker-BxO-jHr9.mjs";
import { r as formatWorkDate } from "./format-DR5st7Zr.mjs";
import { t as OvertimeCard } from "./overtime-card-CaFyrBaT.mjs";
import { n as Input, r as Select, t as Field } from "./input-DZXKLHSz.mjs";
import { t as WorkerLinkCard } from "./worker-link-card-BkY3HKOa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users._id-DOOn1NRf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UserDetail() {
	const { id } = Route.useParams();
	const actor = useActor();
	const qc = useQueryClient();
	const [month, setMonth] = (0, import_react.useState)(currentMonthKey());
	const user = useQuery({
		queryKey: ["user", id],
		queryFn: () => getUser({ data: id })
	});
	const records = useQuery({
		queryKey: [
			"ot",
			"worker",
			id,
			month
		],
		queryFn: () => listOvertime({ data: {
			month,
			workerUserId: id
		} })
	});
	const attendance = useQuery({
		queryKey: [
			"att",
			"worker",
			id,
			month
		],
		queryFn: () => listAttendance({ data: {
			month,
			workerUserId: id
		} }),
		enabled: user.data?.role === "worker"
	});
	const depts = useQuery({
		queryKey: ["departments"],
		queryFn: () => listDepartments()
	});
	const supervisors = useQuery({
		queryKey: ["users", "supervisor"],
		queryFn: () => listUsers({ data: { role: "supervisor" } })
	});
	const link = useQuery({
		queryKey: ["worker-link", id],
		queryFn: () => getWorkerLink({ data: id }),
		enabled: user.data?.role === "worker"
	});
	const profile = user.data;
	const [password, setPassword] = (0, import_react.useState)("");
	const save = useMutation({
		mutationFn: (patch) => updateUser({ data: patch }),
		onSuccess: async () => {
			toast.success("Saved");
			await qc.invalidateQueries();
		},
		onError: (err) => toast.error(err.message)
	});
	const reset = useMutation({
		mutationFn: () => resetUserPassword({ data: {
			userId: id,
			password
		} }),
		onSuccess: () => {
			toast.success("Password reset");
			setPassword("");
		},
		onError: (err) => toast.error(err.message)
	});
	const rotate = useMutation({
		mutationFn: () => regenerateWorkerLink({ data: id }),
		onSuccess: async () => {
			toast.success("New link created. The old one no longer works.");
			await qc.invalidateQueries({ queryKey: ["worker-link", id] });
		},
		onError: (err) => toast.error(err.message)
	});
	if (user.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface-2" });
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "User not found."
	});
	const canEdit = canManageUsers(actor.acting.role) && (profile.role !== "super_admin" || canManageAdmins(actor.acting.role)) || actor.acting.role === "supervisor" && profile.role === "worker" && profile.supervisorUserId === actor.acting.userId;
	const isWorker = profile.role === "worker";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: profile.employeeId ?? "Profile",
			title: profile.fullName,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleBadge, { role: profile.role })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-line bg-surface p-4 text-sm shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: profile.email ?? "No login account" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted",
					children: [
						profile.departmentName ?? "No department",
						" · Supervisor ",
						profile.supervisorName ?? "—"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: profile.isActive ? "text-approved" : "text-rejected",
					children: profile.isActive ? "Active" : "Deactivated"
				})
			]
		}),
		isWorker && link.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkerLinkCard, {
				workerName: profile.fullName,
				path: link.data.path,
				onRotate: canAddWorkers(actor.acting.role) ? () => rotate.mutate() : void 0,
				rotating: rotate.isPending
			})
		}) : null,
		actor.real.role === "super_admin" && profile.userId !== actor.real.userId && !isWorker ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			className: "mt-3 w-full",
			variant: "secondary",
			onClick: async () => {
				await startImpersonation({ data: profile.userId });
				window.location.href = "/app";
			},
			children: ["View as ", profile.fullName.split(" ")[0]]
		}) : null,
		canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-5 space-y-3",
			onSubmit: (e) => {
				e.preventDefault();
				const form = new FormData(e.currentTarget);
				save.mutate({
					userId: id,
					name: String(form.get("name") ?? profile.fullName),
					role: String(form.get("role") ?? profile.role),
					departmentId: String(form.get("departmentId") || "") || null,
					supervisorUserId: String(form.get("supervisorUserId") || "") || null,
					employeeId: String(form.get("employeeId") || "") || null
				});
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "name",
						defaultValue: profile.fullName
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Employee ID",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "employeeId",
						defaultValue: profile.employeeId ?? ""
					})
				}),
				canManageAdmins(actor.acting.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Role",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						name: "role",
						defaultValue: profile.role,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "worker",
								children: "Worker"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "supervisor",
								children: "Supervisor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "admin",
								children: "Admin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "super_admin",
								children: "Super Admin"
							})
						]
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Department",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						name: "departmentId",
						defaultValue: profile.departmentId ?? "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "None"
						}), (depts.data ?? []).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: d.id,
							children: d.name
						}, d.id))]
					})
				}),
				isWorker && actor.acting.role !== "supervisor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Supervisor",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						name: "supervisorUserId",
						defaultValue: profile.supervisorUserId ?? "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "None"
						}), (supervisors.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.userId,
							children: s.fullName
						}, s.userId))]
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: save.isPending,
					children: "Save profile"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: profile.isActive ? "danger" : "secondary",
					onClick: () => save.mutate({
						userId: id,
						isActive: !profile.isActive
					}),
					children: profile.isActive ? "Deactivate" : "Reactivate"
				}),
				!isWorker ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-line p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Reset password",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "New password"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						className: "mt-2",
						variant: "secondary",
						disabled: password.length < 8,
						onClick: () => reset.mutate(),
						children: "Set password"
					})]
				}) : null
			]
		}) : null,
		isWorker ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-lg font-semibold",
					children: "Attendance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthPicker, {
					value: month,
					onChange: setMonth
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-2",
					children: [(attendance.data ?? []).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: formatWorkDate(a.workDate)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: a.clockIn && a.clockOut ? `${a.clockIn} – ${a.clockOut}` : "No clock times"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-sm font-medium", a.status === "present" ? "text-approved" : "text-rejected"),
							children: a.status === "present" ? "Present" : "Absent"
						})]
					}, a.id)), attendance.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No attendance this month."
					}) : null]
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-lg font-semibold",
					children: "Overtime history"
				}),
				!isWorker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthPicker, {
					value: month,
					onChange: setMonth
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-3",
					children: [(records.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OvertimeCard, {
						record: r,
						href: r.status === "pending" ? `/app/approve/${r.id}` : `/app/overtime/${r.id}`,
						showWorker: false
					}, r.id)), records.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No overtime this month."
					}) : null]
				})
			]
		})
	] });
}
//#endregion
export { UserDetail as component };
