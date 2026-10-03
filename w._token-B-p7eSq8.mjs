import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { a as isValidTime, n as currentMonthKey, r as formatHours, t as calculateOvertimeHours } from "./hours-BLlQzWhI.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Route$4, s as createSsrRpc } from "./router-BJ8T7AVI.mjs";
import { r as formatWorkDate } from "./format-DR5st7Zr.mjs";
import { t as OvertimeCard } from "./overtime-card-CaFyrBaT.mjs";
import { i as Textarea, n as Input, t as Field } from "./input-DZXKLHSz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/w._token-B-p7eSq8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var loadWorkerPortal = createServerFn({ method: "GET" }).validator((token) => token).handler(createSsrRpc("27de7d6935055786d4ec7f7ac647592022e9eeb633eabe868319c5766525aa6a"));
var listWorkerOvertime = createServerFn({ method: "GET" }).validator((input) => input).handler(createSsrRpc("969a4003f8db5bee9c4dc7320088e12b28696a5e19742ae28cba19c0322556fc"));
var listWorkerAttendance = createServerFn({ method: "GET" }).validator((input) => input).handler(createSsrRpc("485578f90fb4ba25c3b724e3c48c991f55e08acbf4fab0fe6459a5d552f0143a"));
var markWorkerAttendance = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("bd86e54d040bdd5f4ebed56ffe4baaf5e5a6670716ea812762d6d7e74a845504"));
var submitWorkerOvertime = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("d0008eb01131658cc695576d46350e985f20cd79fa2a14166201bccdaf2314e1"));
var withdrawWorkerOvertime = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("f2402eaf450924c2eb9a2c4b86b2fbfa94110ca2fd43f13a8ef554e106ffeb66"));
function todayISO() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function WorkerPortalPage() {
	const { token } = Route$4.useParams();
	const portal = useQuery({
		queryKey: ["worker-portal", token],
		queryFn: () => loadWorkerPortal({ data: token }),
		retry: false
	});
	if (portal.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "ledger-bg grid min-h-dvh place-items-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-semibold",
			children: "Opening your shift book"
		})
	});
	if (portal.error || !portal.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "ledger-bg grid min-h-dvh place-items-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-sm rounded-xl border border-line bg-surface p-6 text-center shadow-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl font-semibold",
				children: "Link not valid"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: portal.error instanceof Error ? portal.error.message : "Ask your supervisor to send a new personal link. You do not need to sign up."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkerDesk, {
		token,
		companyName: portal.data.companyName,
		workerName: portal.data.worker.fullName,
		employeeId: portal.data.worker.employeeId,
		supervisorName: portal.data.worker.supervisorName,
		departmentName: portal.data.worker.departmentName
	});
}
function WorkerDesk({ token, companyName, workerName, employeeId, supervisorName, departmentName }) {
	const qc = useQueryClient();
	const month = currentMonthKey();
	const today = todayISO();
	const [date, setDate] = (0, import_react.useState)(today);
	const [attStatus, setAttStatus] = (0, import_react.useState)("present");
	const [clockIn, setClockIn] = (0, import_react.useState)("08:00");
	const [clockOut, setClockOut] = (0, import_react.useState)("17:00");
	const [startTime, setStartTime] = (0, import_react.useState)("17:00");
	const [endTime, setEndTime] = (0, import_react.useState)("20:00");
	const [description, setDescription] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("today");
	const attendance = useQuery({
		queryKey: [
			"w-att",
			token,
			month
		],
		queryFn: () => listWorkerAttendance({ data: {
			token,
			month
		} })
	});
	const overtime = useQuery({
		queryKey: [
			"w-ot",
			token,
			month
		],
		queryFn: () => listWorkerOvertime({ data: {
			token,
			month
		} })
	});
	const todayAtt = (attendance.data ?? []).find((a) => a.workDate === date);
	const calc = (0, import_react.useMemo)(() => {
		if (!isValidTime(startTime) || !isValidTime(endTime)) return null;
		try {
			return calculateOvertimeHours(startTime, endTime);
		} catch {
			return null;
		}
	}, [startTime, endTime]);
	const saveAttendance = useMutation({
		mutationFn: () => markWorkerAttendance({ data: {
			token,
			date,
			status: attStatus,
			clockIn: attStatus === "present" ? clockIn : void 0,
			clockOut: attStatus === "present" ? clockOut : void 0
		} }),
		onSuccess: async () => {
			toast.success(attStatus === "present" ? "Hazri saved — present" : "Marked absent");
			await qc.invalidateQueries({ queryKey: ["w-att", token] });
		},
		onError: (err) => toast.error(err.message)
	});
	const saveOt = useMutation({
		mutationFn: () => submitWorkerOvertime({ data: {
			token,
			date,
			startTime,
			endTime,
			description
		} }),
		onSuccess: async () => {
			toast.success("Overtime sent to your supervisor");
			setDescription("");
			await qc.invalidateQueries({ queryKey: ["w-ot", token] });
		},
		onError: (err) => toast.error(err.message)
	});
	const withdraw = useMutation({
		mutationFn: (id) => withdrawWorkerOvertime({ data: {
			token,
			id
		} }),
		onSuccess: async () => {
			toast.success("Overtime withdrawn");
			await qc.invalidateQueries({ queryKey: ["w-ot", token] });
		},
		onError: (err) => toast.error(err.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-paper text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line bg-surface/95 px-4 py-4 backdrop-blur",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-muted",
					children: companyName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl font-semibold tracking-tight",
					children: workerName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						employeeId ?? "No ID",
						" · ",
						departmentName ?? "No department"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["Supervisor ", supervisorName ?? "—"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-lg px-4 py-5 pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 grid grid-cols-2 gap-1 rounded-lg bg-surface-2 p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab("today"),
						className: cn("h-11 rounded-md text-sm font-medium", tab === "today" ? "bg-surface text-ink shadow-soft" : "text-muted"),
						children: "Today"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab("history"),
						className: cn("h-11 rounded-md text-sm font-medium", tab === "history" ? "bg-surface text-ink shadow-soft" : "text-muted"),
						children: "My hours"
					})]
				}),
				tab === "today" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-line bg-surface p-4 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-[0.14em] text-muted",
								children: "Hazri · Attendance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl font-semibold",
								children: formatWorkDate(date)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Date",
								hint: "Aaj ya pichle din ki hazri",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: date,
									max: today,
									onChange: (e) => setDate(e.target.value)
								})
							}),
							todayAtt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-approved",
								children: [
									"Already marked ",
									todayAtt.status,
									todayAtt.clockIn ? ` · ${todayAtt.clockIn}–${todayAtt.clockOut ?? "…"}` : ""
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: attStatus === "present" ? "primary" : "secondary",
									onClick: () => setAttStatus("present"),
									children: "Present"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: attStatus === "absent" ? "danger" : "secondary",
									onClick: () => setAttStatus("absent"),
									children: "Absent"
								})]
							}),
							attStatus === "present" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Clock in",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "time",
										value: clockIn,
										onChange: (e) => setClockIn(e.target.value)
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Clock out",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "time",
										value: clockOut,
										onChange: (e) => setClockOut(e.target.value)
									})
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: "Supervisor will see you were off this day."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "lg",
								className: "mt-4 w-full",
								disabled: saveAttendance.isPending,
								onClick: () => saveAttendance.mutate(),
								children: saveAttendance.isPending ? "Saving…" : "Save attendance"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-line bg-surface p-4 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-[0.14em] text-muted",
								children: "Overtime ghante"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-xl font-semibold",
								children: "Extra hours"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Supervisor sign karke approve karega. Pura project yahan nahi dikhega."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Start",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "time",
										value: startTime,
										onChange: (e) => setStartTime(e.target.value)
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "End",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "time",
										value: endTime,
										onChange: (e) => setEndTime(e.target.value)
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 rounded-lg bg-accent-soft px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium uppercase tracking-[0.14em] text-accent",
										children: "Total overtime"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-3xl font-semibold tabular-nums",
										children: calc ? formatHours(calc.hours) : "—"
									}),
									calc?.crossesMidnight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-pending",
										children: "Overnight shift"
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Reason",
								hint: "Optional — kyun ruke",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: description,
									onChange: (e) => setDescription(e.target.value),
									placeholder: "Late truck, covering a teammate…"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "xl",
								className: "mt-4 w-full",
								disabled: !calc || saveOt.isPending,
								onClick: () => saveOt.mutate(),
								children: saveOt.isPending ? "Sending…" : "Submit overtime"
							})
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-display text-lg font-semibold",
						children: "Attendance this month"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
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
							children: "No attendance marked yet."
						}) : null]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 font-display text-lg font-semibold",
						children: "Overtime this month"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [(overtime.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OvertimeCard, {
							record: r,
							showWorker: false,
							footer: r.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								className: "mt-2",
								disabled: withdraw.isPending,
								onClick: () => withdraw.mutate(r.id),
								children: "Withdraw"
							}) : null
						}, r.id)), overtime.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "No overtime submitted this month."
						}) : null]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-8 text-center text-xs text-faint",
					children: [
						"Bookmark this page. Supervisors sign in separately.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "underline-offset-2 hover:underline",
							children: "Supervisor sign in"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { WorkerPortalPage as component };
