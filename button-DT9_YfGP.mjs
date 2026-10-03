import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DT9_YfGP.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[transform,opacity,background-color] duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg shadow-soft hover:opacity-95",
			secondary: "bg-surface text-ink border border-line hover:bg-surface-2",
			ghost: "bg-transparent text-ink hover:bg-surface-2",
			danger: "bg-rejected text-accent-fg hover:opacity-95",
			outline: "border border-accent text-accent bg-transparent hover:bg-accent-soft"
		},
		size: {
			sm: "h-9 px-3 text-sm",
			md: "h-11 px-4 text-sm",
			lg: "h-12 px-5 text-base",
			xl: "h-14 px-6 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
