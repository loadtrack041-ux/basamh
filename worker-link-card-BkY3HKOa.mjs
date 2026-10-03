import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { h as Check, i as RefreshCw, u as Copy } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/worker-link-card-BkY3HKOa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function workerLinkUrl(path) {
	if (typeof window === "undefined") return path;
	return `${window.location.origin}${path}`;
}
async function copyText(value) {
	try {
		await navigator.clipboard.writeText(value);
		return true;
	} catch {
		return false;
	}
}
function WorkerLinkCard({ workerName, path, onRotate, rotating }) {
	const url = workerLinkUrl(path);
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-accent/20 bg-accent-soft/70 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.14em] text-accent",
				children: "Personal worker link"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [workerName, " does not sign up. Send this private link on WhatsApp. They only see their own hazri and overtime."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 break-all rounded-md bg-surface px-3 py-2 font-mono text-xs text-ink",
				children: url
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					className: "flex-1",
					onClick: async () => {
						if (await copyText(url)) {
							setCopied(true);
							window.setTimeout(() => setCopied(false), 1600);
						}
					},
					children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copied" : "Copy link"]
				}), onRotate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "secondary",
					onClick: onRotate,
					disabled: rotating,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), rotating ? "Replacing…" : "New link"]
				}) : null]
			}),
			onRotate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: "A new link disables the old one. Share the new URL after rotating."
			}) : null
		]
	});
}
//#endregion
export { WorkerLinkCard as t };
