import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as useActor } from "./actor-BiCkV9LO.mjs";
import { n as PageHeader } from "./empty-state-8P1X4Fw6.mjs";
import { t as Button } from "./button-DT9_YfGP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as updateSettings, b as seedDemo, c as getSettings } from "./server-fns-CWYoxqTA.mjs";
import { n as Input, t as Field } from "./input-DZXKLHSz.mjs";
import { t as DEMO_PASSWORD } from "./demo-BXvPf1hH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-6KE_5fvu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const actor = useActor();
	const qc = useQueryClient();
	const settings = useQuery({
		queryKey: ["settings"],
		queryFn: () => getSettings()
	});
	const [companyName, setCompanyName] = (0, import_react.useState)("");
	const [timezone, setTimezone] = (0, import_react.useState)("Europe/Berlin");
	const [requireDescription, setRequireDescription] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!settings.data) return;
		setCompanyName(settings.data.companyName);
		setTimezone(settings.data.timezone);
		setRequireDescription(settings.data.requireDescription);
	}, [settings.data]);
	const save = useMutation({
		mutationFn: () => updateSettings({ data: {
			companyName,
			timezone,
			requireDescription
		} }),
		onSuccess: async () => {
			toast.success("Settings saved");
			await qc.invalidateQueries({ queryKey: ["session"] });
		},
		onError: (err) => toast.error(err.message)
	});
	if (actor.acting.role !== "super_admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Only Super Admins can change system settings."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "System",
			title: "Settings"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-3 rounded-xl border border-line bg-surface p-4 shadow-soft",
			onSubmit: (e) => {
				e.preventDefault();
				save.mutate();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Company name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: companyName,
						onChange: (e) => setCompanyName(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Timezone",
					hint: "Stored for reports. Times are entered as local clock times.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: timezone,
						onChange: (e) => setTimezone(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: requireDescription,
						onChange: (e) => setRequireDescription(e.target.checked)
					}), "Require a description on overtime submissions"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: save.isPending,
					children: "Save settings"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-xl border border-line bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: "Sample company"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Demo users share the password ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-ink",
							children: DEMO_PASSWORD
						}),
						". Seeding is safe to retry — existing demo IDs are left alone."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					variant: "secondary",
					onClick: async () => {
						await seedDemo();
						toast.success("Demo company ready");
						await qc.invalidateQueries();
					},
					children: "Load sample company"
				})
			]
		})
	] });
}
//#endregion
export { SettingsPage as component };
