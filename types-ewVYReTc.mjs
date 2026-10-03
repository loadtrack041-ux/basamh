//#region node_modules/.nitro/vite/services/ssr/assets/types-ewVYReTc.js
var ROLE_LABEL = {
	super_admin: "Super Admin",
	admin: "Admin",
	supervisor: "Supervisor",
	worker: "Worker"
};
var STATUS_LABEL = {
	pending: "Pending",
	approved: "Approved",
	rejected: "Rejected"
};
function isAdminRole(role) {
	return role === "super_admin" || role === "admin";
}
function canExport(role) {
	return isAdminRole(role);
}
function canManageUsers(role) {
	return isAdminRole(role);
}
function canManageAdmins(role) {
	return role === "super_admin";
}
function canAddWorkers(role) {
	return isAdminRole(role) || role === "supervisor";
}
//#endregion
export { canManageAdmins as a, canExport as i, STATUS_LABEL as n, canManageUsers as o, canAddWorkers as r, isAdminRole as s, ROLE_LABEL as t };
