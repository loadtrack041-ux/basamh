import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { i as canExport } from "./types-ewVYReTc.mjs";
import { n as currentMonthKey } from "./hours-BLlQzWhI.mjs";
import { n as useActor } from "./actor-BiCkV9LO.mjs";
import { n as PageHeader } from "./empty-state-8P1X4Fw6.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { h as listUsers, o as exportExcel, p as listDepartments } from "./server-fns-CWYoxqTA.mjs";
import { n as Input, r as Select, t as Field } from "./input-DZXKLHSz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/export-lIGdwKt-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function download(filename, xml) {
	const blob = new Blob([xml], { type: "application/vnd.ms-excel;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function ExportPage() {
	const actor = useActor();
	const [month, setMonth] = (0, import_react.useState)(currentMonthKey());
	const [departmentId, setDepartmentId] = (0, import_react.useState)("");
	const [supervisorUserId, setSupervisorUserId] = (0, import_react.useState)("");
	const [workerUserId, setWorkerUserId] = (0, import_react.useState)("");
	const depts = useQuery({
		queryKey: ["departments"],
		queryFn: () => listDepartments()
	});
	const supervisors = useQuery({
		queryKey: ["users", "supervisor"],
		queryFn: () => listUsers({ data: { role: "supervisor" } })
	});
	const workers = useQuery({
		queryKey: ["users", "worker"],
		queryFn: () => listUsers({ data: { role: "worker" } })
	});
	const run = useMutation({
		mutationFn: () => exportExcel({ data: {
			month,
			departmentId: departmentId || void 0,
			supervisorUserId: supervisorUserId || void 0,
			workerUserId: workerUserId || void 0
		} }),
		onSuccess: (file) => {
			download(file.filename, file.xml);
			toast.success("Excel report downloaded");
		},
		onError: (err) => toast.error(err.message)
	});
	if (!canExport(actor.acting.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Only Admins and Super Admins can export company-wide Excel reports."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Payroll",
			title: "Export Excel"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 max-w-xl text-sm text-muted",
			children: "One file for the whole team — daily lines, worker totals, and a grand total. Optional filters narrow the same workbook; leave them blank to include everyone."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-3 rounded-xl border border-line bg-surface p-4 shadow-soft",
			onSubmit: (e) => {
				e.preventDefault();
				run.mutate();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Month",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "month",
						required: true,
						value: month,
						onChange: (e) => setMonth(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Department / project",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: departmentId,
						onChange: (e) => setDepartmentId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All"
						}), (depts.data ?? []).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: d.id,
							children: d.name
						}, d.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Supervisor",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: supervisorUserId,
						onChange: (e) => setSupervisorUserId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All"
						}), (supervisors.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.userId,
							children: s.fullName
						}, s.userId))]
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "xl",
					className: "w-full",
					disabled: run.isPending,
					children: run.isPending ? "Building workbook…" : "Export Excel"
				})
			]
		})
	] });
}
//#endregion
export { ExportPage as component };
