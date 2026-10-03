import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as RecordsPage } from "./records-page-BRK45_cC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pending-BNARQEwH.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordsPage, {
	title: "Pending approvals",
	kicker: "Needs a signature",
	status: "pending",
	hrefFor: (id) => `/app/approve/${id}`
});
//#endregion
export { SplitComponent as component };
