import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { t as GROK_PROVIDERS } from "./server-SWuc6UZL.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Input, t as Field } from "./input-DZXKLHSz.mjs";
import { r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { t as DEMO_PASSWORD } from "./demo-BXvPf1hH.mjs";
import { n as useCurrentUserState } from "./use-current-user-BYyFvsCd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Ct2ovWKN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [showDemo, setShowDemo] = (0, import_react.useState)(false);
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/app" });
	async function onEmailLogin(event) {
		event.preventDefault();
		setBusy(true);
		const { error } = await authClient.signIn.email({
			email,
			password,
			callbackURL: "/app"
		});
		setBusy(false);
		if (error) {
			toast.error(error.message ?? "Could not sign in");
			return;
		}
		window.location.href = "/app";
	}
	async function onSignUp(event) {
		event.preventDefault();
		if (name.trim().length < 2) {
			toast.error("Enter your full name");
			return;
		}
		setBusy(true);
		const { error } = await authClient.signUp.email({
			name: name.trim(),
			email,
			password,
			callbackURL: "/app"
		});
		setBusy(false);
		if (error) {
			toast.error(error.message ?? "Could not create account");
			return;
		}
		window.location.href = "/app";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "ledger-bg min-h-dvh px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-[80dvh] max-w-md flex-col justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.22em] text-muted",
					children: "Supervisors & admins"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-semibold tracking-tight",
					children: "Overtime Ledger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-sm text-muted",
					children: "Workers do not sign up here. They only open the personal link you send them."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-2 gap-1 rounded-lg bg-surface-2 p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode("signin"),
						className: cn("h-10 rounded-md text-sm font-medium", mode === "signin" ? "bg-surface text-ink shadow-soft" : "text-muted"),
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode("signup"),
						className: cn("h-10 rounded-md text-sm font-medium", mode === "signup" ? "bg-surface text-ink shadow-soft" : "text-muted"),
						children: "Supervisor sign up"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: mode === "signin" ? onEmailLogin : onSignUp,
					className: "mt-4 space-y-3 rounded-xl border border-line bg-surface p-5 shadow-soft",
					children: [
						mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Your name"
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Work email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								autoComplete: "username",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "you@company.com"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Password",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "password",
								autoComplete: mode === "signin" ? "current-password" : "new-password",
								required: true,
								minLength: 8,
								value: password,
								onChange: (e) => setPassword(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "xl",
							className: "w-full",
							disabled: busy || false,
							children: busy ? mode === "signin" ? "Signing in…" : "Creating…" : mode === "signin" ? "Sign in" : "Create supervisor account"
						}),
						mode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/forgot-password",
							className: "block text-center text-sm text-muted underline-offset-4 hover:underline",
							children: "Forgot password"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "The first person to sign up becomes Super Admin. Later supervisor accounts wait for activation."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs uppercase tracking-[0.16em] text-faint",
						children: "or"
					}), GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "secondary",
						size: "lg",
						className: "w-full",
						onClick: () => signIn(p.providerId, { callbackURL: "/app" }),
						children: ["Continue with ", p.label]
					}, p.providerId))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-6 text-left text-sm text-muted underline-offset-4 hover:underline",
					onClick: () => setShowDemo((v) => !v),
					children: showDemo ? "Hide demo accounts" : "Demo accounts"
				}),
				showDemo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 rounded-lg border border-line bg-surface p-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted",
							children: [
								"The first person to sign in becomes Super Admin and loads the sample company. Supervisors (password",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-ink",
									children: DEMO_PASSWORD
								}),
								"):"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 space-y-1 font-mono text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Admin · maria.chen@northline.demo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Supervisor · james.okonkwo@northline.demo" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-muted",
							children: [
								"Demo workers have no password. After the sample company loads, open",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-ink",
									children: "/w/demo-luis"
								}),
								" as a worker."
							]
						})
					]
				}) : null
			]
		})
	});
}
//#endregion
export { Login as component };
