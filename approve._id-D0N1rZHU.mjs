import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { r as formatHours } from "./hours-BLlQzWhI.mjs";
import { n as useActor } from "./actor-BiCkV9LO.mjs";
import { n as PageHeader } from "./empty-state-8P1X4Fw6.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { n as StatusBadge } from "./status-badge-CsNiohDG.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Route$2 } from "./router-BJ8T7AVI.mjs";
import { s as getOvertime, t as approveOvertime, v as rejectOvertime } from "./server-fns-CWYoxqTA.mjs";
import { r as formatWorkDate, t as formatClock } from "./format-DR5st7Zr.mjs";
import { i as Textarea, t as Field } from "./input-DZXKLHSz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/approve._id-D0N1rZHU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SignaturePad({ value, onChange }) {
	const canvasRef = (0, import_react.useRef)(null);
	const drawing = (0, import_react.useRef)(false);
	const last = (0, import_react.useRef)(null);
	const [dirty, setDirty] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			const ratio = Math.max(window.devicePixelRatio || 1, 1);
			const snapshot = canvas.toDataURL();
			canvas.width = Math.floor(rect.width * ratio);
			canvas.height = Math.floor(rect.height * ratio);
			const ctx = canvas.getContext("2d");
			if (!ctx) return;
			ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.strokeStyle = "#1a1714";
			ctx.lineWidth = 2.4;
			if (dirty) {
				const img = new Image();
				img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
				img.src = snapshot;
			}
		};
		resize();
		window.addEventListener("resize", resize);
		return () => window.removeEventListener("resize", resize);
	}, [dirty]);
	function pos(event) {
		const rect = canvasRef.current.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}
	function start(event) {
		event.preventDefault();
		drawing.current = true;
		last.current = pos(event);
		event.currentTarget.setPointerCapture(event.pointerId);
	}
	function move(event) {
		if (!drawing.current) return;
		const ctx = canvasRef.current?.getContext("2d");
		if (!ctx || !last.current) return;
		const next = pos(event);
		ctx.beginPath();
		ctx.moveTo(last.current.x, last.current.y);
		ctx.lineTo(next.x, next.y);
		ctx.stroke();
		last.current = next;
		setDirty(true);
	}
	function end() {
		if (!drawing.current) return;
		drawing.current = false;
		last.current = null;
		const canvas = canvasRef.current;
		if (canvas && dirty) onChange(canvas.toDataURL("image/png"));
	}
	function clear() {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		setDirty(false);
		onChange(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-lg border border-line bg-[#fbf8f1]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "block h-48 w-full touch-none md:h-56",
				onPointerDown: start,
				onPointerMove: move,
				onPointerUp: end,
				onPointerCancel: end
			}), !dirty && !value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none -mt-48 flex h-48 items-center justify-center text-sm text-faint md:-mt-56 md:h-56",
				children: "Sign here with your finger"
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "secondary",
			size: "sm",
			onClick: clear,
			children: "Clear signature"
		})]
	});
}
function ApprovePage() {
	const { id } = Route$2.useParams();
	const actor = useActor();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const query = useQuery({
		queryKey: ["ot", id],
		queryFn: () => getOvertime({ data: id })
	});
	const rec = query.data;
	const [signature, setSignature] = (0, import_react.useState)(null);
	const [reason, setReason] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("sign");
	const approve = useMutation({
		mutationFn: () => approveOvertime({ data: {
			id,
			signatureData: signature ?? ""
		} }),
		onSuccess: async () => {
			toast.success("Overtime approved");
			await qc.invalidateQueries();
			navigate({ to: "/app/pending" });
		},
		onError: (err) => toast.error(err.message)
	});
	const reject = useMutation({
		mutationFn: () => rejectOvertime({ data: {
			id,
			reason
		} }),
		onSuccess: async () => {
			toast.success("Overtime rejected");
			await qc.invalidateQueries();
			navigate({ to: "/app/pending" });
		},
		onError: (err) => toast.error(err.message)
	});
	if (query.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface-2" });
	if (!rec) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Record not found."
	});
	if (actor.acting.role === "worker") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Workers cannot approve overtime."
	});
	if (rec.status !== "pending") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Already reviewed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-muted",
		children: [
			"This overtime is ",
			rec.status,
			" and locked."
		]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Digital signature",
			title: rec.workerName,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: rec.status })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-line bg-surface p-4 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						rec.employeeId,
						" · ",
						rec.departmentName
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-medium",
					children: formatWorkDate(rec.workDate)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [
						formatClock(rec.startTime),
						" – ",
						formatClock(rec.endTime),
						rec.crossesMidnight ? " · overnight" : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-3xl font-semibold tabular-nums",
					children: formatHours(rec.totalHours)
				}),
				rec.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: rec.description
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: mode === "sign" ? "primary" : "secondary",
				onClick: () => setMode("sign"),
				children: "Approve & sign"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: mode === "reject" ? "danger" : "secondary",
				onClick: () => setMode("reject"),
				children: "Reject"
			})]
		}),
		mode === "sign" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Supervisor signature"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignaturePad, {
					value: signature,
					onChange: setSignature
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "xl",
					className: "w-full",
					disabled: !signature || approve.isPending,
					onClick: () => approve.mutate(),
					children: approve.isPending ? "Saving…" : "Approve & lock"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Rejection reason",
				hint: "Required — the worker will see this",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: reason,
					onChange: (e) => setReason(e.target.value),
					required: true
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "danger",
				size: "xl",
				className: "w-full",
				disabled: reason.trim().length < 3 || reject.isPending,
				onClick: () => reject.mutate(),
				children: reject.isPending ? "Saving…" : "Reject overtime"
			})]
		})
	] });
}
//#endregion
export { ApprovePage as component };
