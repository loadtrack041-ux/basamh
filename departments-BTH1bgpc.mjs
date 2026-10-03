import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { o as canManageUsers } from "./types-ewVYReTc.mjs";
import { n as useActor } from "./actor-BiCkV9LO.mjs";
import { n as PageHeader, t as EmptyState } from "./empty-state-8P1X4Fw6.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as createDepartment, p as listDepartments, w as updateDepartment } from "./server-fns-CWYoxqTA.mjs";
import { n as Input, t as Field } from "./input-DZXKLHSz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/departments-BTH1bgpc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DepartmentsPage() {
	const actor = useActor();
	const qc = useQueryClient();
	const depts = useQuery({
		queryKey: ["departments"],
		queryFn: () => listDepartments()
	});
	const [name, setName] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const create = useMutation({
		mutationFn: () => createDepartment({ data: {
			name,
			code
		} }),
		onSuccess: async () => {
			toast.success("Department added");
			setName("");
			setCode("");
			await qc.invalidateQueries({ queryKey: ["departments"] });
		},
		onError: (err) => toast.error(err.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Organisation",
			title: "Departments / projects"
		}),
		canManageUsers(actor.acting.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-5 grid gap-2 rounded-xl border border-line bg-surface p-4 md:grid-cols-[1fr_8rem_auto]",
			onSubmit: (e) => {
				e.preventDefault();
				create.mutate();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Code",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: code,
						onChange: (e) => setCode(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						disabled: create.isPending,
						children: "Add"
					})
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [(depts.data ?? []).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: d.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						d.code ?? "No code",
						" · ",
						d.isActive ? "Active" : "Inactive"
					]
				})] }), canManageUsers(actor.acting.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: async () => {
						await updateDepartment({ data: {
							id: d.id,
							isActive: !d.isActive
						} });
						await qc.invalidateQueries({ queryKey: ["departments"] });
					},
					children: d.isActive ? "Deactivate" : "Activate"
				}) : null]
			}, d.id)), depts.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No departments",
				body: "Add warehouse, night shift, or project codes."
			}) : null]
		})
	] });
}
//#endregion
export { DepartmentsPage as component };
