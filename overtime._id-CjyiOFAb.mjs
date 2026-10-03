import { S as Link, w as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { s as isAdminRole } from "./types-ewVYReTc.mjs";
import { r as formatHours } from "./hours-BLlQzWhI.mjs";
import { n as useActor } from "./actor-BiCkV9LO.mjs";
import { n as PageHeader } from "./empty-state-8P1X4Fw6.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { n as StatusBadge } from "./status-badge-CsNiohDG.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Route$1 } from "./router-BJ8T7AVI.mjs";
import { D as withdrawOvertime, s as getOvertime } from "./server-fns-CWYoxqTA.mjs";
import { n as formatDateTime, r as formatWorkDate, t as formatClock } from "./format-DR5st7Zr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/overtime._id-CjyiOFAb.js
var import_jsx_runtime = require_jsx_runtime();
function OvertimeDetail() {
	const { id } = Route$1.useParams();
	const actor = useActor();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const query = useQuery({
		queryKey: ["ot", id],
		queryFn: () => getOvertime({ data: id })
	});
	const rec = query.data;
	const withdraw = useMutation({
		mutationFn: () => withdrawOvertime({ data: id }),
		onSuccess: async () => {
			toast.success("Overtime withdrawn");
			await qc.invalidateQueries();
			navigate({ to: "/app/my-overtime" });
		},
		onError: (err) => toast.error(err.message)
	});
	if (query.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface-2" });
	if (!rec) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Record not found."
	});
	const canEdit = actor.acting.role === "worker" && rec.status === "pending" && rec.workerUserId === actor.acting.userId;
	const canApprove = rec.status === "pending" && rec.workerUserId !== actor.acting.userId && (isAdminRole(actor.acting.role) || actor.acting.role === "supervisor");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: rec.employeeId ?? "Overtime",
		title: rec.workerName,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: rec.status })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-4 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Date",
						value: formatWorkDate(rec.workDate)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Start",
						value: formatClock(rec.startTime)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "End",
						value: `${formatClock(rec.endTime)}${rec.crossesMidnight ? " (next day)" : ""}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Total",
						value: formatHours(rec.totalHours)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Department",
						value: rec.departmentName ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Supervisor",
						value: rec.supervisorName ?? "—"
					})
				]
			}),
			rec.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.14em] text-muted",
					children: "Description"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed",
					children: rec.description
				})]
			}) : null,
			rec.status === "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-approved/20 bg-approved-bg p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.14em] text-approved",
						children: "Signed approval"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						children: [
							rec.approvedByName,
							" · ",
							formatDateTime(rec.approvedAt)
						]
					}),
					rec.approvalIp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: ["IP ", rec.approvalIp]
					}) : null,
					rec.signatureData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: rec.signatureData,
						alt: "Supervisor signature",
						className: "mt-3 w-full rounded-md bg-surface"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "This record is locked and cannot be edited."
					})
				]
			}) : null,
			rec.status === "rejected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-rejected/20 bg-rejected-bg p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.14em] text-rejected",
						children: "Rejected"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						children: [
							rec.rejectedByName,
							" · ",
							formatDateTime(rec.rejectedAt)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: rec.rejectionReason
					})
				]
			}) : null,
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "secondary",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/submit",
						search: { edit: rec.id },
						children: "Edit"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					size: "lg",
					onClick: () => withdraw.mutate(),
					disabled: withdraw.isPending,
					children: "Withdraw"
				})]
			}) : null,
			canApprove ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "xl",
				className: "w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/approve/$id",
					params: { id: rec.id },
					children: "Review & sign"
				})
			}) : null
		]
	})] });
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-4 border-b border-line py-2 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { OvertimeDetail as component };
