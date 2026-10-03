import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as STATUS_LABEL, t as ROLE_LABEL } from "./types-ewVYReTc.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-CsNiohDG.js
var import_jsx_runtime = require_jsx_runtime();
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", status === "approved" ? "bg-approved-bg text-approved" : status === "rejected" ? "bg-rejected-bg text-rejected" : "bg-pending-bg text-pending"),
		children: STATUS_LABEL[status]
	});
}
function RoleBadge({ role }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent",
		children: ROLE_LABEL[role]
	});
}
//#endregion
export { StatusBadge as n, RoleBadge as t };
