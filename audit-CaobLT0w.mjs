import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { n as PageHeader } from "./empty-state-8P1X4Fw6.mjs";
import { f as listAudit } from "./server-fns-CWYoxqTA.mjs";
import { n as formatDateTime } from "./format-DR5st7Zr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-CaobLT0w.js
var import_jsx_runtime = require_jsx_runtime();
function AuditPage() {
	const logs = useQuery({
		queryKey: ["audit"],
		queryFn: () => listAudit()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Security",
		title: "Audit log"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: (logs.data ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-xl border border-line bg-surface px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: row.action
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tabular-nums text-muted",
						children: formatDateTime(row.createdAt)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						row.actorName ?? "System",
						" ",
						row.actorRole ? `· ${row.actorRole}` : "",
						row.entityType ? ` · ${row.entityType}` : ""
					]
				}),
				row.details ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 break-all font-mono text-[11px] text-faint",
					children: row.details
				}) : null
			]
		}, row.id))
	})] });
}
//#endregion
export { AuditPage as component };
