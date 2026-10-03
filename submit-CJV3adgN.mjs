import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as isValidTime, r as formatHours, t as calculateOvertimeHours } from "./hours-BLlQzWhI.mjs";
import { n as useActor } from "./actor-BiCkV9LO.mjs";
import { n as PageHeader } from "./empty-state-8P1X4Fw6.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Route$7 } from "./router-BJ8T7AVI.mjs";
import { C as submitOvertime, s as getOvertime } from "./server-fns-CWYoxqTA.mjs";
import { i as Textarea, n as Input, t as Field } from "./input-DZXKLHSz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/submit-CJV3adgN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function todayISO() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function SubmitPage() {
	const actor = useActor();
	const navigate = useNavigate();
	const { edit } = Route$7.useSearch();
	const existing = useQuery({
		queryKey: ["ot", edit],
		queryFn: () => getOvertime({ data: edit }),
		enabled: Boolean(edit)
	});
	const [date, setDate] = (0, import_react.useState)(todayISO());
	const [startTime, setStartTime] = (0, import_react.useState)("17:00");
	const [endTime, setEndTime] = (0, import_react.useState)("20:00");
	const [description, setDescription] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!existing.data) return;
		setDate(existing.data.workDate);
		setStartTime(existing.data.startTime);
		setEndTime(existing.data.endTime);
		setDescription(existing.data.description ?? "");
	}, [existing.data]);
	const calc = (0, import_react.useMemo)(() => {
		if (!isValidTime(startTime) || !isValidTime(endTime)) return null;
		try {
			return calculateOvertimeHours(startTime, endTime);
		} catch {
			return null;
		}
	}, [startTime, endTime]);
	const mutation = useMutation({
		mutationFn: () => submitOvertime({ data: {
			id: edit,
			date,
			startTime,
			endTime,
			description
		} }),
		onSuccess: () => {
			toast.success(edit ? "Overtime updated" : "Overtime submitted");
			navigate({ to: "/app/my-overtime" });
		},
		onError: (err) => toast.error(err.message)
	});
	if (actor.acting.role !== "worker") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Only workers submit overtime from this screen."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Daily overtime",
		title: edit ? "Edit overtime" : "Submit overtime"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (e) => {
			e.preventDefault();
			mutation.mutate();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-4 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.14em] text-muted",
						children: "Worker"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-lg font-medium",
						children: actor.acting.fullName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							actor.acting.employeeId ?? "No ID",
							" · ",
							actor.acting.departmentName ?? "No department"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["Supervisor ", actor.acting.supervisorName ?? "unassigned"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Date",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "date",
					required: true,
					value: date,
					onChange: (e) => setDate(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Start time",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "time",
						required: true,
						value: startTime,
						onChange: (e) => setStartTime(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "End time",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "time",
						required: true,
						value: endTime,
						onChange: (e) => setEndTime(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-accent/20 bg-accent-soft px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.14em] text-accent",
						children: "Total overtime"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-3xl font-semibold tabular-nums",
						children: calc ? formatHours(calc.hours) : "—"
					}),
					calc?.crossesMidnight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-pending",
						children: "This shift crosses midnight"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Description / reason",
				hint: "Optional — what you stayed for",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: description,
					onChange: (e) => setDescription(e.target.value),
					placeholder: "Late vessel, machine repair, covering an absent teammate…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "xl",
				className: "w-full",
				disabled: !calc || mutation.isPending,
				children: mutation.isPending ? "Saving…" : edit ? "Save changes" : "Submit overtime"
			})
		]
	})] });
}
//#endregion
export { SubmitPage as component };
