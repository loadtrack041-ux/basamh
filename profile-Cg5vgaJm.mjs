import { S as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as useActor } from "./actor-BiCkV9LO.mjs";
import { n as PageHeader } from "./empty-state-8P1X4Fw6.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { t as RoleBadge } from "./status-badge-CsNiohDG.mjs";
import { n as UserButton } from "./gates-BKO45V5u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-Cg5vgaJm.js
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { acting, real, impersonating, companyName } = useActor();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: companyName,
			title: "Profile",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleBadge, { role: acting.role })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-line bg-surface p-4 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xl font-medium",
					children: acting.fullName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: acting.email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Employee ID",
							value: acting.employeeId ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Department",
							value: acting.departmentName ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Supervisor",
							value: acting.supervisorName ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Status",
							value: acting.isActive ? "Active" : "Deactivated"
						})
					]
				})
			]
		}),
		impersonating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-pending",
			children: "You are viewing this profile through Super Admin preview."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-sm text-muted",
			children: [
				"Signed in as ",
				real.fullName,
				"."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/change-password",
					children: "Change password"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-line bg-surface px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
			})]
		})
	] });
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-3 border-b border-line py-2 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-medium",
			children: value
		})]
	});
}
//#endregion
export { ProfilePage as component };
