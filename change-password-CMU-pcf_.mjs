import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHeader } from "./empty-state-8P1X4Fw6.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Input, t as Field } from "./input-DZXKLHSz.mjs";
import { t as authClient } from "./client-1vAx-gM_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/change-password-CMU-pcf_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChangePassword() {
	const [currentPassword, setCurrent] = (0, import_react.useState)("");
	const [newPassword, setNext] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Account",
			title: "Change password"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-3 rounded-xl border border-line bg-surface p-4 shadow-soft",
			onSubmit: async (e) => {
				e.preventDefault();
				setBusy(true);
				const { error } = await authClient.changePassword({
					currentPassword,
					newPassword,
					revokeOtherSessions: true
				});
				setBusy(false);
				if (error) {
					toast.error(error.message ?? "Could not change password. Email/password accounts only.");
					return;
				}
				toast.success("Password updated");
				setCurrent("");
				setNext("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Current password",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						required: true,
						value: currentPassword,
						onChange: (e) => setCurrent(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "New password",
					hint: "At least 8 characters",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						required: true,
						minLength: 8,
						value: newPassword,
						onChange: (e) => setNext(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					children: busy ? "Saving…" : "Update password"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: "Google or X sign-in does not use a local password. Ask an admin to attach one if you need email login."
		})
	] });
}
//#endregion
export { ChangePassword as component };
