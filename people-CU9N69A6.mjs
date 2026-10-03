import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as canManageAdmins, o as canManageUsers, r as canAddWorkers } from "./types-ewVYReTc.mjs";
import { n as useActor } from "./actor-BiCkV9LO.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as PageHeader, t as EmptyState } from "./empty-state-8P1X4Fw6.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { t as RoleBadge } from "./status-badge-CsNiohDG.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { h as listUsers, i as createWorker, p as listDepartments, r as createUser } from "./server-fns-CWYoxqTA.mjs";
import { n as Input, r as Select, t as Field } from "./input-DZXKLHSz.mjs";
import { t as WorkerLinkCard } from "./worker-link-card-BkY3HKOa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people-CU9N69A6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "worker",
		label: "Workers"
	},
	{
		id: "supervisor",
		label: "Supervisors"
	},
	{
		id: "admin",
		label: "Admins"
	}
];
function PeoplePage() {
	const actor = useActor();
	const [tab, setTab] = (0, import_react.useState)("worker");
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [createdLink, setCreatedLink] = (0, import_react.useState)(null);
	const users = useQuery({
		queryKey: ["users", tab],
		queryFn: () => listUsers({ data: { role: tab } })
	});
	const canCreateStaff = canManageUsers(actor.acting.role) && (tab !== "admin" || canManageAdmins(actor.acting.role));
	const canCreate = tab === "worker" ? canAddWorkers(actor.acting.role) : canCreateStaff;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Directory",
			title: "People",
			action: canCreate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => setCreating(true),
				children: ["Add ", tab]
			}) : null
		}),
		tab === "worker" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-muted",
			children: "Workers never sign up. Add them here and send their personal link. They only mark attendance and overtime."
		}) : null,
		actor.acting.role !== "supervisor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 grid grid-cols-3 gap-1 rounded-lg bg-surface-2 p-1",
			children: TABS.filter((t) => t.id !== "admin" || canManageUsers(actor.acting.role)).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTab(t.id),
				className: cn("h-10 rounded-md text-sm font-medium", tab === t.id ? "bg-surface text-ink shadow-soft" : "text-muted"),
				children: t.label
			}, t.id))
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [(users.data ?? []).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/users/$id",
				params: { id: u.userId },
				className: "flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: u.fullName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						u.employeeId ?? "No ID",
						" · ",
						u.departmentName ?? "No dept",
						" ",
						u.isActive ? "" : "· Deactivated"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleBadge, { role: u.role })]
			}, u.userId)), users.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No people here",
				body: tab === "worker" ? "Add a worker and share their link. They will not need an account." : "Create supervisors so they can approve overtime."
			}) : null]
		}),
		creating && tab === "worker" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateWorkerDialog, {
			onClose: () => setCreating(false),
			onCreated: (info) => {
				setCreating(false);
				setCreatedLink(info);
			}
		}) : null,
		creating && tab !== "worker" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateStaffDialog, {
			role: tab,
			onClose: () => setCreating(false)
		}) : null,
		createdLink ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50 grid place-items-end md:place-items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute inset-0 bg-ink/40",
				"aria-label": "Close",
				onClick: () => setCreatedLink(null)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 w-full rounded-t-xl border border-line bg-surface p-5 shadow-soft md:max-w-md md:rounded-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Share this link"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkerLinkCard, {
							workerName: createdLink.name,
							path: createdLink.path
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4 w-full",
						variant: "secondary",
						onClick: () => setCreatedLink(null),
						children: "Done"
					})
				]
			})]
		}) : null
	] });
}
function CreateWorkerDialog({ onClose, onCreated }) {
	const actor = useActor();
	const qc = useQueryClient();
	const depts = useQuery({
		queryKey: ["departments"],
		queryFn: () => listDepartments()
	});
	const supervisors = useQuery({
		queryKey: ["users", "supervisor"],
		queryFn: () => listUsers({ data: { role: "supervisor" } }),
		enabled: actor.acting.role !== "supervisor"
	});
	const [name, setName] = (0, import_react.useState)("");
	const [departmentId, setDepartmentId] = (0, import_react.useState)("");
	const [supervisorUserId, setSupervisorUserId] = (0, import_react.useState)("");
	const [employeeId, setEmployeeId] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const mutation = useMutation({
		mutationFn: () => createWorker({ data: {
			name,
			departmentId: departmentId || null,
			supervisorUserId: supervisorUserId || null,
			employeeId: employeeId || null,
			phone: phone || null
		} }),
		onSuccess: async (result) => {
			toast.success("Worker added");
			await qc.invalidateQueries({ queryKey: ["users"] });
			if (result?.profile && result.path) onCreated({
				name: result.profile.fullName,
				path: result.path
			});
			else onClose();
		},
		onError: (err) => toast.error(err.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 grid place-items-end md:place-items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-ink/40",
			"aria-label": "Close",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "relative z-10 max-h-[90dvh] w-full overflow-y-auto rounded-t-xl border border-line bg-surface p-5 shadow-soft md:max-w-md md:rounded-xl",
			onSubmit: (e) => {
				e.preventDefault();
				mutation.mutate();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "New worker"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "No email or password. They open a private link on their phone."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							hint: "Optional",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: phone,
								onChange: (e) => setPhone(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Employee ID",
							hint: "Leave blank to auto-assign",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: employeeId,
								onChange: (e) => setEmployeeId(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Department / project",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: departmentId,
								onChange: (e) => setDepartmentId(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "None"
								}), (depts.data ?? []).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: d.id,
									children: d.name
								}, d.id))]
							})
						}),
						actor.acting.role !== "supervisor" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Supervisor",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								required: true,
								value: supervisorUserId,
								onChange: (e) => setSupervisorUserId(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select supervisor"
								}), (supervisors.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.userId,
									children: s.fullName
								}, s.userId))]
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "lg",
							className: "w-full",
							disabled: mutation.isPending,
							children: mutation.isPending ? "Creating…" : "Create worker link"
						})
					]
				})
			]
		})]
	});
}
function CreateStaffDialog({ role, onClose }) {
	const qc = useQueryClient();
	const depts = useQuery({
		queryKey: ["departments"],
		queryFn: () => listDepartments()
	});
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("Ledger2026!");
	const [departmentId, setDepartmentId] = (0, import_react.useState)("");
	const [employeeId, setEmployeeId] = (0, import_react.useState)("");
	const mutation = useMutation({
		mutationFn: () => createUser({ data: {
			name,
			email,
			password,
			role,
			departmentId: departmentId || null,
			employeeId: employeeId || null
		} }),
		onSuccess: async () => {
			toast.success("Account created");
			await qc.invalidateQueries({ queryKey: ["users"] });
			onClose();
		},
		onError: (err) => toast.error(err.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 grid place-items-end md:place-items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-ink/40",
			"aria-label": "Close",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "relative z-10 max-h-[90dvh] w-full overflow-y-auto rounded-t-xl border border-line bg-surface p-5 shadow-soft md:max-w-md md:rounded-xl",
			onSubmit: (e) => {
				e.preventDefault();
				mutation.mutate();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-xl font-semibold",
				children: ["New ", role.replace("_", " ")]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Full name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							required: true,
							value: name,
							onChange: (e) => setName(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Temporary password",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: password,
							onChange: (e) => setPassword(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Employee ID",
						hint: "Leave blank to auto-assign",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: employeeId,
							onChange: (e) => setEmployeeId(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Department / project",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: departmentId,
							onChange: (e) => setDepartmentId(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "None"
							}), (depts.data ?? []).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: d.id,
								children: d.name
							}, d.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						className: "w-full",
						disabled: mutation.isPending,
						children: mutation.isPending ? "Creating…" : "Create account"
					})
				]
			})]
		})]
	});
}
//#endregion
export { PeoplePage as component };
