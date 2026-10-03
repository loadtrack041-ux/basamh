import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actor-BiCkV9LO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ActorContext = (0, import_react.createContext)(null);
function ActorProvider({ actor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActorContext.Provider, {
		value: actor,
		children
	});
}
function useActor() {
	const value = (0, import_react.useContext)(ActorContext);
	if (!value) throw new Error("useActor must be used within the app shell");
	return value;
}
//#endregion
export { useActor as n, ActorProvider as t };
