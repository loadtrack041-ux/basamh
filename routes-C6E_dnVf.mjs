import { C as Navigate, S as Link, x as getRouteApi } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as useCurrentUserState } from "./use-current-user-BYyFvsCd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C6E_dnVf.js
var import_jsx_runtime = require_jsx_runtime();
var rootRoute = getRouteApi("__root__");
function Home() {
	const { sessionUser } = rootRoute.useRouteContext();
	const { user, isPending } = useCurrentUserState();
	if (user || sessionUser) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/app" });
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "ledger-bg grid min-h-dvh place-items-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-semibold",
			children: "Overtime Ledger"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "ledger-bg min-h-dvh px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.22em] text-muted",
					children: "Workforce hours"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-semibold tracking-tight",
					children: "Overtime Ledger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-md text-muted",
					children: "Supervisors sign in. Workers never create an account — they open a private link, mark hazri, and log extra hours."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-surface p-5 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-[0.14em] text-muted",
								children: "Supervisors"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl font-semibold",
								children: "Sign in to approve"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Add workers, share their links, then sign overtime on your phone."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "mt-4 inline-flex h-12 w-full items-center justify-center rounded-md bg-accent text-accent-fg",
								children: "Supervisor sign in"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-line bg-surface p-5 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-[0.14em] text-muted",
								children: "Workers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl font-semibold",
								children: "Use your personal link"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "No signup. Open the WhatsApp / SMS link from your supervisor. You only see your own attendance and overtime."
							})
						]
					})]
				})
			]
		})
	});
}
//#endregion
export { Home as component };
