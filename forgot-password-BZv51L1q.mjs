import { S as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-BZv51L1q.js
var import_jsx_runtime = require_jsx_runtime();
function ForgotPassword() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "ledger-bg grid min-h-dvh place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border border-line bg-surface p-6 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-muted",
					children: "Account recovery"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-2xl font-semibold",
					children: "Reset happens through your admin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "Overtime Ledger does not send reset emails. Ask your supervisor or an administrator to set a new password from People → the user → Reset password. That keeps payroll accounts inside the company."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "mt-6 inline-flex h-12 items-center font-medium text-accent underline-offset-4 hover:underline",
					children: "Back to sign in"
				})
			]
		})
	});
}
//#endregion
export { ForgotPassword as component };
