import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as Link, _ as Outlet, m as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { n as useActor, t as ActorProvider } from "./actor-BiCkV9LO.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as Plus, c as FileSpreadsheet, d as Clock3, f as ClipboardCheck, l as Ellipsis, r as ScrollText, s as LayoutDashboard, t as Users } from "../_libs/lucide-react.mjs";
import { S as stopImpersonation, g as loadSession } from "./server-fns-CWYoxqTA.mjs";
import { i as initials } from "./format-DR5st7Zr.mjs";
import { n as useCurrentUserState } from "./use-current-user-BYyFvsCd.mjs";
import { n as UserButton, t as RedirectToSignIn } from "./gates-BKO45V5u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-Dl0zajsl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRIMARY = [
	{
		to: "/app",
		label: "Home",
		icon: LayoutDashboard,
		roles: [
			"super_admin",
			"admin",
			"supervisor",
			"worker"
		]
	},
	{
		to: "/app/submit",
		label: "Submit",
		icon: Plus,
		roles: ["worker"]
	},
	{
		to: "/app/pending",
		label: "Pending",
		icon: ClipboardCheck,
		roles: [
			"supervisor",
			"admin",
			"super_admin"
		]
	},
	{
		to: "/app/my-overtime",
		label: "My OT",
		icon: Clock3,
		roles: ["worker"]
	},
	{
		to: "/app/records",
		label: "Records",
		icon: ScrollText,
		roles: [
			"supervisor",
			"admin",
			"super_admin"
		]
	},
	{
		to: "/app/people",
		label: "People",
		icon: Users,
		roles: [
			"admin",
			"super_admin",
			"supervisor"
		]
	},
	{
		to: "/app/export",
		label: "Export",
		icon: FileSpreadsheet,
		roles: ["admin", "super_admin"]
	}
];
var MORE = [
	{
		to: "/app/approved",
		label: "Approved",
		roles: [
			"supervisor",
			"admin",
			"super_admin"
		]
	},
	{
		to: "/app/rejected",
		label: "Rejected",
		roles: [
			"supervisor",
			"admin",
			"super_admin"
		]
	},
	{
		to: "/app/reports",
		label: "Reports",
		roles: [
			"admin",
			"super_admin",
			"supervisor"
		]
	},
	{
		to: "/app/departments",
		label: "Departments",
		roles: ["admin", "super_admin"]
	},
	{
		to: "/app/audit",
		label: "Audit log",
		roles: ["admin", "super_admin"]
	},
	{
		to: "/app/settings",
		label: "Settings",
		roles: ["super_admin"]
	},
	{
		to: "/app/profile",
		label: "Profile",
		roles: [
			"super_admin",
			"admin",
			"supervisor",
			"worker"
		]
	}
];
function visible(items, role) {
	return items.filter((i) => i.roles.includes(role));
}
function AppShell({ actor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActorProvider, {
		actor,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellFrame, {})
	});
}
function ShellFrame() {
	const actor = useActor();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
	const role = actor.acting.role;
	const tabs = visible(PRIMARY, role).slice(0, 4);
	const moreItems = [...visible(PRIMARY, role).slice(4), ...visible(MORE, role)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper text-ink",
		children: [
			actor.impersonating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 bg-pending px-4 py-2 text-sm text-accent-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Viewing as ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: actor.acting.fullName
					}),
					" · ",
					actor.acting.role.replace("_", " ")
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "underline underline-offset-2",
					onClick: () => {
						stopImpersonation().then(() => window.location.reload());
					},
					children: "Exit"
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 hidden border-b border-line bg-surface/90 backdrop-blur md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/app",
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg font-semibold tracking-tight",
								children: actor.companyName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-[0.18em] text-muted",
								children: "Ledger"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex items-center gap-1",
							children: [visible(PRIMARY, role).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: item.to,
								active: isActive(pathname, item.to),
								children: item.label
							}, item.to)), visible(MORE, role).filter((i) => i.to !== "/app/profile").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: item.to,
								active: isActive(pathname, item.to),
								children: item.label
							}, item.to))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/profile",
								className: "text-sm text-muted hover:text-ink",
								children: actor.acting.fullName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-6xl px-4 pb-28 pt-5 md:px-6 md:pb-12 md:pt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-5",
					children: [tabs.map((item) => {
						const Icon = item.icon;
						const active = isActive(pathname, item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium", active ? "text-accent" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: active ? 2.4 : 1.8
							}), item.label]
						}, item.to);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMoreOpen((v) => !v),
						className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium", moreOpen ? "text-accent" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-5" }), "More"]
					})]
				})
			}),
			moreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-40 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute inset-0 bg-ink/30",
					"aria-label": "Close menu",
					onClick: () => setMoreOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 bottom-0 rounded-t-xl border border-line bg-surface p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-3 h-1 w-10 rounded-full bg-line-strong" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-10 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent",
								children: initials(actor.acting.fullName)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: actor.acting.fullName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: actor.acting.employeeId ?? actor.acting.email
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-1",
							children: moreItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								onClick: () => setMoreOpen(false),
								className: "rounded-md px-3 py-3 text-sm hover:bg-surface-2",
								children: item.label
							}, item.to))
						})
					]
				})]
			}) : null
		]
	});
}
function isActive(pathname, to) {
	if (to === "/app") return pathname === "/app" || pathname === "/app/";
	return pathname === to || pathname.startsWith(`${to}/`);
}
function NavLink({ to, active, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: cn("rounded-md px-3 py-2 text-sm font-medium", active ? "bg-accent-soft text-accent" : "text-muted hover:bg-surface-2 hover:text-ink"),
		children
	});
}
function InactiveScreen({ actor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ledger-bg grid min-h-dvh place-items-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md rounded-xl border border-line bg-surface p-6 text-center shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-semibold",
					children: "Account pending"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [actor.acting.fullName, ", your supervisor account is waiting for an administrator to activate it. Workers never sign up — they use a personal link after you are approved."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
				})
			]
		})
	});
}
function LoadingScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ledger-bg grid min-h-dvh place-items-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.22em] text-muted",
				children: "Overtime Ledger"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-2xl font-semibold",
				children: "Loading your shift book"
			})]
		})
	});
}
function AppLayout() {
	const { user, isPending } = useCurrentUserState();
	const session = useQuery({
		queryKey: ["session"],
		queryFn: () => loadSession(),
		enabled: Boolean(user)
	});
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (session.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	if (session.error || !session.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-paper px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: session.error instanceof Error ? session.error.message : "Could not load your profile."
		})
	});
	if (!session.data.acting.isActive) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InactiveScreen, { actor: session.data });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { actor: session.data });
}
//#endregion
export { AppLayout as component };
