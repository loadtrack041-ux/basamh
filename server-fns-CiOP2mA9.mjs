import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { i as canExport, r as canAddWorkers, s as isAdminRole } from "./types-ewVYReTc.mjs";
import { c as rangesOverlap, o as monthBounds, r as formatHours, s as overtimeRange, t as calculateOvertimeHours } from "./hours-BLlQzWhI.mjs";
import { t as authMiddleware } from "./middleware-BZm1sS5r.mjs";
import { r as getSql } from "./db-ZY3a9s7g.mjs";
import { C as requireRole, E as writeAudit, S as requireActive, T as seedDemoCompany, _ as mapSummary, a as clientMeta, b as num, c as hashUserPassword, d as loadActiveWorkerToken, f as loadProfile, g as mapProfile, h as mapOvertime, i as assertCanViewWorker, l as issueWorkerLink, m as mapAttendance, n as AppError, o as createAuthUser, r as OT_SELECT, s as getSetting, t as ATTENDANCE_SELECT, u as listDepartmentsRows, v as newId, w as resolveActor, x as overtimeScopeSql, y as nextEmployeeId } from "./access-BiuT1YTe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-fns-CiOP2mA9.js
function xml(value) {
	const map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&apos;"
	};
	return value.replace(/[&<>"']/g, (ch) => map[ch] ?? ch);
}
function cell(value, style, type = "String") {
	if (typeof value === "number") return `<Cell ss:StyleID="${style}"><Data ss:Type="Number">${value}</Data></Cell>`;
	return `<Cell ss:StyleID="${style}"><Data ss:Type="${type}">${xml(value)}</Data></Cell>`;
}
function empty(style = "Body") {
	return `<Cell ss:StyleID="${style}"/>`;
}
function buildOvertimeWorkbook(opts) {
	const { companyName, title, periodLabel, generatedAt, generatedBy, records, summary } = opts;
	const grand = summary.reduce((s, w) => s + w.totalHours, 0);
	const header = [
		"Worker Name",
		"Employee ID",
		"Department/Project",
		"Date",
		"OT Start Time",
		"OT End Time",
		"Total OT Hours",
		"Description",
		"Supervisor Name",
		"Approval Status",
		"Approval Date",
		"Approval Time"
	];
	const detailRows = records.map((r) => {
		const approvedStamp = r.approvedAt ?? r.rejectedAt;
		const datePart = approvedStamp ? approvedStamp.slice(0, 10) : "";
		const timePart = approvedStamp ? approvedStamp.slice(11, 19) : "";
		const style = r.status === "approved" ? "Approved" : r.status === "rejected" ? "Rejected" : "Pending";
		return `<Row ss:AutoFitHeight="1">
        ${cell(r.workerName, "Body")}
        ${cell(r.employeeId ?? "", "Body")}
        ${cell(r.departmentName ?? "", "Body")}
        ${cell(r.workDate, "Body")}
        ${cell(r.startTime, "Body")}
        ${cell(r.endTime, "Body")}
        ${cell(r.totalHours, "Hours")}
        ${cell(r.description ?? "", "Body")}
        ${cell(r.supervisorName ?? "", "Body")}
        ${cell(r.status.charAt(0).toUpperCase() + r.status.slice(1), style)}
        ${cell(datePart, "Body")}
        ${cell(timePart, "Body")}
      </Row>`;
	}).join("\n");
	const summaryRows = summary.map((w) => `<Row>
        ${cell(w.fullName, "Body")}
        ${cell(w.employeeId ?? "", "Body")}
        ${cell(w.departmentName ?? "", "Body")}
        ${cell(w.totalHours, "Hours")}
        ${cell(w.approvedHours, "Hours")}
        ${cell(w.pendingHours, "Hours")}
      </Row>`).join("\n");
	return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
  <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
    <Title>${xml(title)}</Title>
    <Author>${xml(generatedBy)}</Author>
    <Company>${xml(companyName)}</Company>
    <Created>${xml(generatedAt)}</Created>
  </DocumentProperties>
  <Styles>
    <Style ss:ID="Default" ss:Name="Normal">
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1A1714"/>
      <Alignment ss:Vertical="Center"/>
    </Style>
    <Style ss:ID="Brand">
      <Font ss:FontName="Calibri" ss:Size="18" ss:Bold="1" ss:Color="#21564C"/>
    </Style>
    <Style ss:ID="Sub">
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#6B645B"/>
    </Style>
    <Style ss:ID="Head">
      <Font ss:FontName="Calibri" ss:Size="11" ss:Bold="1" ss:Color="#FBF8F1"/>
      <Interior ss:Color="#21564C" ss:Pattern="Solid"/>
      <Alignment ss:Vertical="Center" ss:WrapText="1"/>
    </Style>
    <Style ss:ID="Body">
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1A1714"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E6DFD2"/>
      </Borders>
    </Style>
    <Style ss:ID="Hours">
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#1A1714"/>
      <NumberFormat ss:Format="0.00"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E6DFD2"/>
      </Borders>
    </Style>
    <Style ss:ID="Approved">
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#215C45"/>
      <Interior ss:Color="#D7EEE3" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="Pending">
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#8A5A22"/>
      <Interior ss:Color="#F4E6D0" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="Rejected">
      <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#8B2E2E"/>
      <Interior ss:Color="#F3D6D4" ss:Pattern="Solid"/>
    </Style>
    <Style ss:ID="Total">
      <Font ss:FontName="Calibri" ss:Size="12" ss:Bold="1" ss:Color="#21564C"/>
      <Interior ss:Color="#DCE8E4" ss:Pattern="Solid"/>
      <NumberFormat ss:Format="0.00"/>
    </Style>
    <Style ss:ID="TotalLabel">
      <Font ss:FontName="Calibri" ss:Size="12" ss:Bold="1" ss:Color="#21564C"/>
      <Interior ss:Color="#DCE8E4" ss:Pattern="Solid"/>
    </Style>
  </Styles>
  <Worksheet ss:Name="Overtime">
    <Table ss:DefaultRowHeight="20">
      <Column ss:Width="140"/>
      <Column ss:Width="90"/>
      <Column ss:Width="130"/>
      <Column ss:Width="90"/>
      <Column ss:Width="90"/>
      <Column ss:Width="90"/>
      <Column ss:Width="90"/>
      <Column ss:Width="180"/>
      <Column ss:Width="130"/>
      <Column ss:Width="90"/>
      <Column ss:Width="100"/>
      <Column ss:Width="90"/>
      <Row ss:Height="28">${cell(companyName, "Brand")}${empty("Brand")}${empty("Brand")}</Row>
      <Row>${cell(title, "Sub")}</Row>
      <Row>${cell(`Period: ${periodLabel}`, "Sub")}</Row>
      <Row>${cell(`Generated ${generatedAt} by ${generatedBy}`, "Sub")}</Row>
      <Row/>
      <Row ss:Height="28">${header.map((h) => cell(h, "Head")).join("")}</Row>
      ${detailRows || `<Row>${cell("No overtime records for this selection.", "Body")}</Row>`}
      <Row/>
      <Row>
        ${cell("Grand Total OT Hours", "TotalLabel")}
        ${empty("TotalLabel")}${empty("TotalLabel")}${empty("TotalLabel")}${empty("TotalLabel")}${empty("TotalLabel")}
        ${cell(grand, "Total")}
      </Row>
      <Row>${cell(formatHours(grand), "Sub")}</Row>
    </Table>
    <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
      <FreezePanes/>
      <FrozenNoSplit/>
      <SplitHorizontal>6</SplitHorizontal>
      <TopRowBottomPane>6</TopRowBottomPane>
    </WorksheetOptions>
  </Worksheet>
  <Worksheet ss:Name="Summary">
    <Table ss:DefaultRowHeight="20">
      <Column ss:Width="160"/>
      <Column ss:Width="90"/>
      <Column ss:Width="130"/>
      <Column ss:Width="110"/>
      <Column ss:Width="110"/>
      <Column ss:Width="110"/>
      <Row ss:Height="28">${cell("Worker monthly totals", "Brand")}</Row>
      <Row>${cell(periodLabel, "Sub")}</Row>
      <Row/>
      <Row ss:Height="28">
        ${cell("Worker Name", "Head")}
        ${cell("Employee ID", "Head")}
        ${cell("Department/Project", "Head")}
        ${cell("Monthly Total OT Hours", "Head")}
        ${cell("Approved Hours", "Head")}
        ${cell("Pending Hours", "Head")}
      </Row>
      ${summaryRows || `<Row>${cell("No workers in this selection.", "Body")}</Row>`}
      <Row/>
      <Row>
        ${cell("Grand Total OT Hours", "TotalLabel")}
        ${empty("TotalLabel")}${empty("TotalLabel")}
        ${cell(grand, "Total")}
        ${empty("Total")}${empty("Total")}
      </Row>
    </Table>
  </Worksheet>
</Workbook>`;
}
function fail(err) {
	if (err instanceof AppError) throw err;
	if (err instanceof Error) throw new AppError(err.message);
	throw new AppError("Something went wrong.");
}
async function actorOf(userId) {
	return await resolveActor(userId);
}
var loadSession_createServerFn_handler = createServerRpc({
	id: "9641d70d3398798c736c847d63a3e98e3427c7b1756af9287a20b3ada7941bb2",
	name: "loadSession",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => loadSession.__executeServer(opts));
var loadSession = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(loadSession_createServerFn_handler, async ({ context }) => {
	return actorOf(context.userId);
});
var listDepartments_createServerFn_handler = createServerRpc({
	id: "66619e0443601d02c07af99ef320472bcac69d28064b9766c52931aa02b9beec",
	name: "listDepartments",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => listDepartments.__executeServer(opts));
var listDepartments = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listDepartments_createServerFn_handler, async ({ context }) => {
	const { acting } = await actorOf(context.userId);
	requireActive(acting);
	return listDepartmentsRows(false);
});
var listUsers_createServerFn_handler = createServerRpc({
	id: "88b837a66110baeacc8ef32a7858352c5a27d5695dab0541851b587db085a5e9",
	name: "listUsers",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => listUsers.__executeServer(opts));
var listUsers = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input = {}) => input).handler(listUsers_createServerFn_handler, async ({ context, data }) => {
	const { acting } = await actorOf(context.userId);
	requireActive(acting);
	const sql = await getSql();
	const roles = data.role ? Array.isArray(data.role) ? data.role : [data.role] : null;
	const params = [];
	const where = [];
	if (roles && roles.length) {
		const placeholders = roles.map((_, i) => `$${params.length + i + 1}`).join(", ");
		params.push(...roles);
		where.push(`p.role in (${placeholders})`);
	}
	if (acting.role === "supervisor") {
		params.push(acting.userId);
		where.push(`p.supervisor_user_id = $${params.length}`);
	} else if (acting.role === "worker") {
		params.push(acting.userId);
		where.push(`p.user_id = $${params.length}`);
	}
	const clause = where.length ? `where ${where.join(" and ")}` : "";
	return (await sql.query(`select p.user_id, p.role, p.full_name, p.employee_id, p.department_id, d.name as department_name,
              p.supervisor_user_id, s.full_name as supervisor_name, p.phone, p.is_active, u.email, p.created_at
       from profiles p
       left join departments d on d.id = p.department_id
       left join profiles s on s.user_id = p.supervisor_user_id
       left join "user" u on u.id = p.user_id
       ${clause}
       order by p.full_name`, params)).map(mapProfile);
});
var getUser_createServerFn_handler = createServerRpc({
	id: "bf54166a906aeb0ab7772a4ca308f9b2220eb915f6f3164319ca94932f19ed4e",
	name: "getUser",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => getUser.__executeServer(opts));
var getUser = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(getUser_createServerFn_handler, async ({ context, data: id }) => {
	const { acting } = await actorOf(context.userId);
	requireActive(acting);
	const profile = await loadProfile(id);
	if (!profile) throw new AppError("User not found.", 404);
	if (acting.role === "worker" && profile.userId !== acting.userId) throw new AppError("You can only view your own profile.", 403);
	if (acting.role === "supervisor" && profile.userId !== acting.userId && profile.supervisorUserId !== acting.userId) throw new AppError("You can only view workers assigned to you.", 403);
	return profile;
});
var createUser_createServerFn_handler = createServerRpc({
	id: "bc3187e59ede7caa8f27ab06abb7ca34d3d01df51e0117fa3fe1deda5ea13b6d",
	name: "createUser",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => createUser.__executeServer(opts));
var createUser = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createUser_createServerFn_handler, async ({ context, data }) => {
	try {
		const { acting } = await actorOf(context.userId);
		requireRole(acting, ["super_admin", "admin"]);
		if (data.role === "super_admin" && acting.role !== "super_admin") throw new AppError("Only a Super Admin can create Super Admins.", 403);
		if (data.role === "admin" && acting.role !== "super_admin") throw new AppError("Only a Super Admin can create Admins.", 403);
		if (data.role === "worker") throw new AppError("Workers do not get login accounts. Add them from People and share their personal link.");
		const name = data.name.trim();
		const email = data.email.trim().toLowerCase();
		if (!name) throw new AppError("Name is required.");
		if (!email.includes("@")) throw new AppError("A valid email is required.");
		const id = newId();
		const prefix = data.role === "supervisor" ? "SV" : "AD";
		const employeeId = data.employeeId?.trim() || await nextEmployeeId(prefix);
		const hash = await hashUserPassword(data.password);
		await createAuthUser({
			id,
			name,
			email,
			passwordHash: hash
		});
		await (await getSql()).query(`insert into profiles (user_id, role, full_name, employee_id, department_id, supervisor_user_id, phone, is_active, created_by)
         values ($1,$2,$3,$4,$5,$6,$7,true,$8)`, [
			id,
			data.role,
			name,
			employeeId,
			data.departmentId || null,
			null,
			data.phone?.trim() || null,
			acting.userId
		]);
		await writeAudit({
			actor: acting,
			action: "user.created",
			entityType: "profile",
			entityId: id,
			details: {
				email,
				role: data.role,
				employeeId
			}
		});
		return loadProfile(id);
	} catch (err) {
		fail(err);
	}
});
var createWorker_createServerFn_handler = createServerRpc({
	id: "380cc232ac475b4cbf83ea4ac832b5d94612ba219627dc9c0e9556ebb934d70b",
	name: "createWorker",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => createWorker.__executeServer(opts));
var createWorker = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createWorker_createServerFn_handler, async ({ context, data }) => {
	try {
		const { acting } = await actorOf(context.userId);
		requireActive(acting);
		if (!canAddWorkers(acting.role)) throw new AppError("Only supervisors and admins can add workers.", 403);
		const name = data.name.trim();
		if (!name) throw new AppError("Name is required.");
		const supervisorUserId = acting.role === "supervisor" ? acting.userId : data.supervisorUserId?.trim() || null;
		if (!supervisorUserId) throw new AppError("Workers must be assigned to a supervisor.");
		const supervisor = await loadProfile(supervisorUserId);
		if (!supervisor || supervisor.role !== "supervisor") throw new AppError("Choose a valid supervisor.");
		const id = newId();
		const employeeId = data.employeeId?.trim() || await nextEmployeeId("EMP");
		await (await getSql()).query(`insert into profiles (user_id, role, full_name, employee_id, department_id, supervisor_user_id, phone, is_active, created_by)
         values ($1,'worker',$2,$3,$4,$5,$6,true,$7)`, [
			id,
			name,
			employeeId,
			data.departmentId || null,
			supervisorUserId,
			data.phone?.trim() || null,
			acting.userId
		]);
		const token = await issueWorkerLink(id);
		await writeAudit({
			actor: acting,
			action: "worker.created",
			entityType: "profile",
			entityId: id,
			details: {
				employeeId,
				supervisorUserId
			}
		});
		return {
			profile: await loadProfile(id),
			token,
			path: `/w/${token}`
		};
	} catch (err) {
		fail(err);
	}
});
var getWorkerLink_createServerFn_handler = createServerRpc({
	id: "17fa21a59cd96d396e02624f66af8539ade26a62b56d5b4f2baa6c4fb416e550",
	name: "getWorkerLink",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => getWorkerLink.__executeServer(opts));
var getWorkerLink = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((workerUserId) => workerUserId).handler(getWorkerLink_createServerFn_handler, async ({ context, data: workerUserId }) => {
	try {
		const { acting } = await actorOf(context.userId);
		const worker = await loadProfile(workerUserId);
		if (!worker || worker.role !== "worker") throw new AppError("Worker not found.", 404);
		assertCanViewWorker(acting, worker);
		let token = await loadActiveWorkerToken(workerUserId);
		if (!token) token = await issueWorkerLink(workerUserId);
		return {
			token,
			path: `/w/${token}`,
			workerName: worker.fullName
		};
	} catch (err) {
		fail(err);
	}
});
var regenerateWorkerLink_createServerFn_handler = createServerRpc({
	id: "9f9668bff5a5c6d491c2145d049dd30e06276e34c3339da204b99f3ae9867641",
	name: "regenerateWorkerLink",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => regenerateWorkerLink.__executeServer(opts));
var regenerateWorkerLink = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((workerUserId) => workerUserId).handler(regenerateWorkerLink_createServerFn_handler, async ({ context, data: workerUserId }) => {
	try {
		const { acting } = await actorOf(context.userId);
		requireActive(acting);
		const worker = await loadProfile(workerUserId);
		if (!worker || worker.role !== "worker") throw new AppError("Worker not found.", 404);
		assertCanViewWorker(acting, worker);
		if (acting.role === "worker") throw new AppError("Workers cannot rotate their own link.", 403);
		const token = await issueWorkerLink(workerUserId);
		await writeAudit({
			actor: acting,
			action: "worker.link_rotated",
			entityType: "profile",
			entityId: workerUserId
		});
		return {
			token,
			path: `/w/${token}`,
			workerName: worker.fullName
		};
	} catch (err) {
		fail(err);
	}
});
var listAttendance_createServerFn_handler = createServerRpc({
	id: "a5e946f0ebdb2e82fad5b9931ca3148a9ae68801201aef7c2a045d1a95d569b7",
	name: "listAttendance",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => listAttendance.__executeServer(opts));
var listAttendance = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((filters = {}) => filters).handler(listAttendance_createServerFn_handler, async ({ context, data: filters }) => {
	const { acting } = await actorOf(context.userId);
	requireActive(acting);
	const sql = await getSql();
	const scope = overtimeScopeSql(acting, "a");
	const params = [...scope.params];
	const where = [scope.sql];
	if (filters.month) {
		const { from, to } = monthBounds(filters.month);
		params.push(from, to);
		where.push(`a.work_date between $${params.length - 1} and $${params.length}`);
	}
	if (filters.workerUserId) {
		params.push(filters.workerUserId);
		where.push(`a.worker_user_id = $${params.length}`);
	}
	return (await sql.query(`${ATTENDANCE_SELECT} where ${where.join(" and ")} order by a.work_date desc, w.full_name`, params)).map((row) => mapAttendance(row));
});
var updateUser_createServerFn_handler = createServerRpc({
	id: "d49a0562f4b9b16af895983c11ca5b809a68956b925c85e2b273fd99756cb248",
	name: "updateUser",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => updateUser.__executeServer(opts));
var updateUser = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(updateUser_createServerFn_handler, async ({ context, data }) => {
	try {
		const { acting } = await actorOf(context.userId);
		requireActive(acting);
		const existing = await loadProfile(data.userId);
		if (!existing) throw new AppError("User not found.", 404);
		const supervisorOwnsWorker = acting.role === "supervisor" && existing.role === "worker" && existing.supervisorUserId === acting.userId;
		if (!isAdminRole(acting.role) && !supervisorOwnsWorker) throw new AppError("You do not have permission to edit this person.", 403);
		if (existing.role === "super_admin" && acting.role !== "super_admin") throw new AppError("You cannot edit a Super Admin.", 403);
		if ((data.role === "admin" || data.role === "super_admin") && acting.role !== "super_admin") throw new AppError("Only a Super Admin can assign that role.", 403);
		if (acting.role === "supervisor" && data.role && data.role !== "worker") throw new AppError("Supervisors can only manage workers.", 403);
		const sql = await getSql();
		const name = data.name?.trim() || existing.fullName;
		const role = acting.role === "supervisor" ? existing.role : data.role ?? existing.role;
		const departmentId = data.departmentId === void 0 ? existing.departmentId : data.departmentId;
		const supervisorUserId = role === "worker" ? acting.role === "supervisor" ? existing.supervisorUserId : data.supervisorUserId === void 0 ? existing.supervisorUserId : data.supervisorUserId : null;
		if (role === "worker" && !supervisorUserId) throw new AppError("Workers must be assigned to a supervisor.");
		await sql.query(`update profiles
         set full_name = $2, role = $3, department_id = $4, supervisor_user_id = $5,
             employee_id = $6, phone = $7, is_active = $8, updated_at = now()
         where user_id = $1`, [
			data.userId,
			name,
			role,
			departmentId,
			supervisorUserId,
			data.employeeId === void 0 ? existing.employeeId : data.employeeId,
			data.phone === void 0 ? existing.phone : data.phone,
			data.isActive ?? existing.isActive
		]);
		await sql.query(`update "user" set name = $2, "updatedAt" = now() where id = $1`, [data.userId, name]);
		await writeAudit({
			actor: acting,
			action: "user.updated",
			entityType: "profile",
			entityId: data.userId,
			details: {
				role,
				isActive: data.isActive ?? existing.isActive
			}
		});
		return loadProfile(data.userId);
	} catch (err) {
		fail(err);
	}
});
var resetUserPassword_createServerFn_handler = createServerRpc({
	id: "8dd820f555a2db34da8ccacab803137d5c9b8a3f5029e5c062f8a0c668160d94",
	name: "resetUserPassword",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => resetUserPassword.__executeServer(opts));
var resetUserPassword = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(resetUserPassword_createServerFn_handler, async ({ context, data }) => {
	try {
		const { acting } = await actorOf(context.userId);
		requireRole(acting, ["super_admin", "admin"]);
		const existing = await loadProfile(data.userId);
		if (!existing) throw new AppError("User not found.", 404);
		if (existing.role === "super_admin" && acting.role !== "super_admin") throw new AppError("You cannot reset a Super Admin password.", 403);
		const hash = await hashUserPassword(data.password);
		const sql = await getSql();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const existingAcc = await sql.query(`select id from "account" where "userId" = $1 and "providerId" = 'credential'`, [data.userId]);
		if (existingAcc[0]) await sql.query(`update "account" set password = $2, "updatedAt" = $3 where id = $1`, [
			existingAcc[0].id,
			hash,
			now
		]);
		else await sql.query(`insert into "account" (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
           values ($1,$2,'credential',$3,$4,$5,$5)`, [
			newId(),
			data.userId,
			data.userId,
			hash,
			now
		]);
		await writeAudit({
			actor: acting,
			action: "user.password_reset",
			entityType: "profile",
			entityId: data.userId
		});
		return { ok: true };
	} catch (err) {
		fail(err);
	}
});
var createDepartment_createServerFn_handler = createServerRpc({
	id: "257d2c8f0cb7ef92b48f4cd88815e6a20ea529db089f0d29112f74080e9deffb",
	name: "createDepartment",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => createDepartment.__executeServer(opts));
var createDepartment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createDepartment_createServerFn_handler, async ({ context, data }) => {
	try {
		const { acting } = await actorOf(context.userId);
		requireRole(acting, ["super_admin", "admin"]);
		const name = data.name.trim();
		if (!name) throw new AppError("Department name is required.");
		const sql = await getSql();
		const id = newId();
		await sql.query(`insert into departments (id, name, code) values ($1,$2,$3)`, [
			id,
			name,
			data.code?.trim() || null
		]);
		await writeAudit({
			actor: acting,
			action: "department.created",
			entityType: "department",
			entityId: id,
			details: { name }
		});
		return {
			id,
			name,
			code: data.code?.trim() || null,
			isActive: true
		};
	} catch (err) {
		fail(err);
	}
});
var updateDepartment_createServerFn_handler = createServerRpc({
	id: "f72358c7e50cb5234d44ab3eb884c8907e51ab4b3ed0086f8f8ae87aed0cbace",
	name: "updateDepartment",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => updateDepartment.__executeServer(opts));
var updateDepartment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(updateDepartment_createServerFn_handler, async ({ context, data }) => {
	try {
		const { acting } = await actorOf(context.userId);
		requireRole(acting, ["super_admin", "admin"]);
		const sql = await getSql();
		const current = await sql.query(`select name, code, is_active from departments where id = $1`, [data.id]);
		if (!current[0]) throw new AppError("Department not found.", 404);
		await sql.query(`update departments set name = $2, code = $3, is_active = $4 where id = $1`, [
			data.id,
			data.name?.trim() || current[0].name,
			data.code === void 0 ? current[0].code : data.code,
			data.isActive ?? current[0].is_active
		]);
		await writeAudit({
			actor: acting,
			action: "department.updated",
			entityType: "department",
			entityId: data.id
		});
		return { ok: true };
	} catch (err) {
		fail(err);
	}
});
async function assertNoOverlap(workerId, date, start, end, exceptId) {
	const rows = await (await getSql()).query(`select id, work_date, start_time, end_time from overtime_records
     where worker_user_id = $1 and status in ('pending','approved')
       and work_date between ($2::date - interval '1 day') and ($2::date + interval '1 day')
       ${exceptId ? "and id <> $3" : ""}`, exceptId ? [
		workerId,
		date,
		exceptId
	] : [workerId, date]);
	const next = overtimeRange(date, start, end);
	for (const row of rows) {
		const existing = overtimeRange(String(row.work_date).slice(0, 10), row.start_time, row.end_time);
		if (rangesOverlap(next, existing)) throw new AppError("This overtime overlaps an existing pending or approved entry.");
	}
}
var submitOvertime_createServerFn_handler = createServerRpc({
	id: "3980d5207ba838bd44a8bd6c4c09952ebb188c958896a20c2b484e6756cd1765",
	name: "submitOvertime",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => submitOvertime.__executeServer(opts));
var submitOvertime = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(submitOvertime_createServerFn_handler, async ({ context, data }) => {
	try {
		const { acting } = await actorOf(context.userId);
		requireRole(acting, ["worker"]);
		if (!acting.supervisorUserId) throw new AppError("You must be assigned to a supervisor before submitting overtime.");
		if (await getSetting("require_description", "false") === "true" && !data.description?.trim()) throw new AppError("A description is required.");
		const { hours, crossesMidnight } = calculateOvertimeHours(data.startTime, data.endTime);
		if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new AppError("Choose a valid date.");
		await assertNoOverlap(acting.userId, data.date, data.startTime, data.endTime, data.id);
		const sql = await getSql();
		const description = data.description?.trim() || null;
		if (data.id) {
			const existing = await sql.query(`select status, worker_user_id from overtime_records where id = $1`, [data.id]);
			if (!existing[0] || existing[0].worker_user_id !== acting.userId) throw new AppError("Overtime record not found.", 404);
			if (existing[0].status !== "pending") throw new AppError("Approved or rejected overtime cannot be edited.");
			await sql.query(`update overtime_records
           set work_date=$2, start_time=$3, end_time=$4, total_hours=$5, crosses_midnight=$6,
               description=$7, department_id=$8, supervisor_user_id=$9, updated_at=now()
           where id=$1`, [
				data.id,
				data.date,
				data.startTime,
				data.endTime,
				hours,
				crossesMidnight,
				description,
				acting.departmentId,
				acting.supervisorUserId
			]);
			await writeAudit({
				actor: acting,
				action: "overtime.updated",
				entityType: "overtime",
				entityId: data.id
			});
			return { id: data.id };
		}
		const id = newId();
		await sql.query(`insert into overtime_records (
          id, worker_user_id, work_date, start_time, end_time, total_hours, crosses_midnight,
          description, status, department_id, supervisor_user_id
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,'pending',$9,$10)`, [
			id,
			acting.userId,
			data.date,
			data.startTime,
			data.endTime,
			hours,
			crossesMidnight,
			description,
			acting.departmentId,
			acting.supervisorUserId
		]);
		await writeAudit({
			actor: acting,
			action: "overtime.submitted",
			entityType: "overtime",
			entityId: id,
			details: {
				date: data.date,
				hours
			}
		});
		return { id };
	} catch (err) {
		fail(err);
	}
});
var withdrawOvertime_createServerFn_handler = createServerRpc({
	id: "b417ae523e03c77e9df6f4756ac498f53ee76fc8545a17ec050ed31fe6069606",
	name: "withdrawOvertime",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => withdrawOvertime.__executeServer(opts));
var withdrawOvertime = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(withdrawOvertime_createServerFn_handler, async ({ context, data: id }) => {
	try {
		const { acting } = await actorOf(context.userId);
		requireRole(acting, ["worker"]);
		const sql = await getSql();
		const rows = await sql.query(`select status, worker_user_id from overtime_records where id = $1`, [id]);
		if (!rows[0] || rows[0].worker_user_id !== acting.userId) throw new AppError("Record not found.", 404);
		if (rows[0].status !== "pending") throw new AppError("Only pending overtime can be withdrawn.");
		await sql.query(`delete from overtime_records where id = $1`, [id]);
		await writeAudit({
			actor: acting,
			action: "overtime.withdrawn",
			entityType: "overtime",
			entityId: id
		});
		return { ok: true };
	} catch (err) {
		fail(err);
	}
});
async function authorizeRecord(acting, rec) {
	if (isAdminRole(acting.role)) return;
	if (acting.role === "worker") {
		if (rec.workerUserId !== acting.userId) throw new AppError("You can only view your own overtime.", 403);
		return;
	}
	if (acting.role === "supervisor") {
		if ((await loadProfile(rec.workerUserId))?.supervisorUserId === acting.userId || rec.supervisorUserId === acting.userId) return;
		throw new AppError("You can only view overtime for workers assigned to you.", 403);
	}
	throw new AppError("You do not have permission to view that record.", 403);
}
var getOvertime_createServerFn_handler = createServerRpc({
	id: "142d5e2f0668fb9d292108a0c381aeaf546b3fd25ff213a2f8ac022aedbd1552",
	name: "getOvertime",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => getOvertime.__executeServer(opts));
var getOvertime = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(getOvertime_createServerFn_handler, async ({ context, data: id }) => {
	const actor = await actorOf(context.userId);
	requireActive(actor.acting);
	const rows = await (await getSql()).query(`${OT_SELECT} where o.id = $1`, [id]);
	if (!rows[0]) throw new AppError("Record not found.", 404);
	const rec = mapOvertime(rows[0]);
	await authorizeRecord(actor.acting, rec);
	return rec;
});
var listOvertime_createServerFn_handler = createServerRpc({
	id: "237d71785371a768fdd8756a60df9fafe02f2c41bd7f1d59ca7b5430db73ecde",
	name: "listOvertime",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => listOvertime.__executeServer(opts));
var listOvertime = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((filters = {}) => filters).handler(listOvertime_createServerFn_handler, async ({ context, data: filters }) => {
	const { acting } = await actorOf(context.userId);
	requireActive(acting);
	const sql = await getSql();
	const scope = overtimeScopeSql(acting);
	const params = [...scope.params];
	const where = [scope.sql];
	const add = (fragment, value) => {
		params.push(value);
		where.push(fragment.replace("?", `$${params.length}`));
	};
	if (filters.month) {
		const { from, to } = monthBounds(filters.month);
		add("o.work_date >= ?", from);
		add("o.work_date <= ?", to);
	}
	if (filters.from) add("o.work_date >= ?", filters.from);
	if (filters.to) add("o.work_date <= ?", filters.to);
	if (filters.workerUserId) add("o.worker_user_id = ?", filters.workerUserId);
	if (filters.employeeId) add("w.employee_id ilike ?", `%${filters.employeeId.trim()}%`);
	if (filters.supervisorUserId) add("o.supervisor_user_id = ?", filters.supervisorUserId);
	if (filters.departmentId) add("o.department_id = ?", filters.departmentId);
	if (filters.status) add("o.status = ?", filters.status);
	return (await sql.query(`${OT_SELECT} where ${where.join(" and ")} order by o.work_date desc, o.start_time desc`, params)).map((row) => mapOvertime(row));
});
var approveOvertime_createServerFn_handler = createServerRpc({
	id: "3ff040bca868aa4a66de69cd25fb1e726a2fce16bcd7a428077170660ac2a53f",
	name: "approveOvertime",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => approveOvertime.__executeServer(opts));
var approveOvertime = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(approveOvertime_createServerFn_handler, async ({ context, data }) => {
	try {
		const { acting } = await actorOf(context.userId);
		requireActive(acting);
		if (acting.role === "worker") throw new AppError("Workers cannot approve overtime.", 403);
		const sql = await getSql();
		const rec = (await sql.query(`select status, worker_user_id, supervisor_user_id from overtime_records where id = $1`, [data.id]))[0];
		if (!rec) throw new AppError("Record not found.", 404);
		if (rec.worker_user_id === acting.userId) throw new AppError("You cannot approve your own overtime.", 403);
		if (rec.status !== "pending") throw new AppError("Only pending overtime can be approved.");
		const worker = await loadProfile(rec.worker_user_id);
		if (!worker) throw new AppError("Worker not found.", 404);
		const assignedToActor = worker.supervisorUserId === acting.userId;
		if (!assignedToActor && !isAdminRole(acting.role)) throw new AppError("You can only approve overtime for workers assigned to you.", 403);
		if (!data.signatureData || data.signatureData.length < 80) throw new AppError("A signature is required to approve overtime.");
		const meta = clientMeta();
		await sql.query(`update overtime_records set
           status = 'approved',
           approved_by_user_id = $2,
           approved_by_name = $3,
           signature_data = $4,
           approved_at = now(),
           approval_ip = $5,
           approval_user_agent = $6,
           rejection_reason = null,
           rejected_at = null,
           rejected_by_user_id = null,
           rejected_by_name = null,
           updated_at = now()
         where id = $1`, [
			data.id,
			acting.userId,
			acting.fullName,
			data.signatureData,
			meta.ip,
			meta.userAgent
		]);
		await writeAudit({
			actor: acting,
			action: "overtime.approved",
			entityType: "overtime",
			entityId: data.id,
			details: {
				worker: worker.fullName,
				override: !assignedToActor
			}
		});
		return { ok: true };
	} catch (err) {
		fail(err);
	}
});
var rejectOvertime_createServerFn_handler = createServerRpc({
	id: "a3ff24fc2a311c3b385631171a7aad2823226a804e4e561c36a4ef799ceea108",
	name: "rejectOvertime",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => rejectOvertime.__executeServer(opts));
var rejectOvertime = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(rejectOvertime_createServerFn_handler, async ({ context, data }) => {
	try {
		const { acting } = await actorOf(context.userId);
		requireActive(acting);
		if (acting.role === "worker") throw new AppError("Workers cannot reject overtime.", 403);
		const reason = data.reason.trim();
		if (reason.length < 3) throw new AppError("A rejection reason is required.");
		const sql = await getSql();
		const rec = (await sql.query(`select status, worker_user_id from overtime_records where id = $1`, [data.id]))[0];
		if (!rec) throw new AppError("Record not found.", 404);
		if (rec.worker_user_id === acting.userId) throw new AppError("You cannot reject your own overtime.", 403);
		if (rec.status !== "pending") throw new AppError("Only pending overtime can be rejected.");
		const worker = await loadProfile(rec.worker_user_id);
		if (!worker) throw new AppError("Worker not found.", 404);
		if (!(worker.supervisorUserId === acting.userId) && !isAdminRole(acting.role)) throw new AppError("You can only reject overtime for workers assigned to you.", 403);
		await sql.query(`update overtime_records set
           status = 'rejected',
           rejection_reason = $2,
           rejected_at = now(),
           rejected_by_user_id = $3,
           rejected_by_name = $4,
           signature_data = null,
           approved_at = null,
           approved_by_user_id = null,
           approved_by_name = null,
           updated_at = now()
         where id = $1`, [
			data.id,
			reason,
			acting.userId,
			acting.fullName
		]);
		await writeAudit({
			actor: acting,
			action: "overtime.rejected",
			entityType: "overtime",
			entityId: data.id,
			details: {
				worker: worker.fullName,
				reason
			}
		});
		return { ok: true };
	} catch (err) {
		fail(err);
	}
});
var dashboardStats_createServerFn_handler = createServerRpc({
	id: "9c97a0af24f8a6edcda043884409ce182449f646127831319e5ceaf09a6554f4",
	name: "dashboardStats",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => dashboardStats.__executeServer(opts));
var dashboardStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((month) => month).handler(dashboardStats_createServerFn_handler, async ({ context, data: month }) => {
	const { acting } = await actorOf(context.userId);
	requireActive(acting);
	const { from, to } = monthBounds(month);
	const sql = await getSql();
	const scope = overtimeScopeSql(acting);
	const params = [
		...scope.params,
		from,
		to
	];
	const fromP = `$${scope.params.length + 1}`;
	const toP = `$${scope.params.length + 2}`;
	const counts = await sql.query(`select
         count(*) filter (where o.status = 'pending')::int as pending_count,
         count(*) filter (where o.status = 'approved')::int as approved_count,
         count(*) filter (where o.status = 'rejected')::int as rejected_count,
         coalesce(sum(o.total_hours) filter (where o.status = 'pending'), 0) as pending_hours,
         coalesce(sum(o.total_hours) filter (where o.status = 'approved'), 0) as approved_hours,
         coalesce(sum(o.total_hours) filter (where o.status <> 'rejected'), 0) as total_hours
       from overtime_records o
       where ${scope.sql} and o.work_date between ${fromP} and ${toP}`, params);
	let workerWhere = "role = 'worker' and is_active = true";
	const workerParams = [];
	if (acting.role === "supervisor") {
		workerParams.push(acting.userId);
		workerWhere += ` and supervisor_user_id = $1`;
	} else if (acting.role === "worker") {
		workerParams.push(acting.userId);
		workerWhere += ` and user_id = $1`;
	}
	const workers = await sql.query(`select count(*)::int as n from profiles where ${workerWhere}`, workerParams);
	const daily = await sql.query(`select o.work_date::text as date, coalesce(sum(o.total_hours),0) as hours
       from overtime_records o
       where ${scope.sql} and o.work_date between ${fromP} and ${toP} and o.status <> 'rejected'
       group by o.work_date order by o.work_date`, params);
	const c = counts[0];
	let presentDays = 0;
	let absentDays = 0;
	const attScope = overtimeScopeSql(acting, "a");
	const attParams = [
		...attScope.params,
		from,
		to
	];
	const attFrom = `$${attScope.params.length + 1}`;
	const attTo = `$${attScope.params.length + 2}`;
	const att = await sql.query(`select
         count(*) filter (where a.status = 'present')::int as present_days,
         count(*) filter (where a.status = 'absent')::int as absent_days
       from attendance a
       where ${attScope.sql} and a.work_date between ${attFrom} and ${attTo}`, attParams);
	presentDays = att[0]?.present_days ?? 0;
	absentDays = att[0]?.absent_days ?? 0;
	return {
		month,
		totalWorkers: workers[0]?.n ?? 0,
		totalHours: num(c?.total_hours),
		pendingCount: c?.pending_count ?? 0,
		approvedCount: c?.approved_count ?? 0,
		rejectedCount: c?.rejected_count ?? 0,
		pendingHours: num(c?.pending_hours),
		approvedHours: num(c?.approved_hours),
		presentDays,
		absentDays,
		daily: daily.map((d) => ({
			date: String(d.date).slice(0, 10),
			hours: num(d.hours)
		}))
	};
});
var workerSummary_createServerFn_handler = createServerRpc({
	id: "cb41dae0140f2804087803464cb0379310dba58292a08cb5a8ed7dfcf3d26acc",
	name: "workerSummary",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => workerSummary.__executeServer(opts));
var workerSummary = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => input).handler(workerSummary_createServerFn_handler, async ({ context, data }) => {
	const { acting } = await actorOf(context.userId);
	requireActive(acting);
	const { from, to } = monthBounds(data.month);
	const sql = await getSql();
	const params = [from, to];
	const where = ["p.role = 'worker'"];
	if (acting.role === "supervisor") {
		params.push(acting.userId);
		where.push(`p.supervisor_user_id = $${params.length}`);
	} else if (acting.role === "worker") {
		params.push(acting.userId);
		where.push(`p.user_id = $${params.length}`);
	}
	if (data.departmentId) {
		params.push(data.departmentId);
		where.push(`p.department_id = $${params.length}`);
	}
	if (data.supervisorUserId && isAdminRole(acting.role)) {
		params.push(data.supervisorUserId);
		where.push(`p.supervisor_user_id = $${params.length}`);
	}
	return (await sql.query(`select p.user_id, p.full_name, p.employee_id, d.name as department_name,
              coalesce(sum(o.total_hours) filter (where o.status <> 'rejected'), 0) as total_hours,
              coalesce(sum(o.total_hours) filter (where o.status = 'approved'), 0) as approved_hours,
              coalesce(sum(o.total_hours) filter (where o.status = 'pending'), 0) as pending_hours,
              coalesce(sum(o.total_hours) filter (where o.status = 'rejected'), 0) as rejected_hours,
              count(o.id) filter (where o.status = 'approved')::int as approved_count,
              count(o.id) filter (where o.status = 'pending')::int as pending_count,
              count(o.id) filter (where o.status = 'rejected')::int as rejected_count,
              (select count(*) from attendance a where a.worker_user_id = p.user_id and a.work_date between $1 and $2 and a.status = 'present')::int as present_days,
              (select count(*) from attendance a where a.worker_user_id = p.user_id and a.work_date between $1 and $2 and a.status = 'absent')::int as absent_days
       from profiles p
       left join departments d on d.id = p.department_id
       left join overtime_records o on o.worker_user_id = p.user_id and o.work_date between $1 and $2
       where ${where.join(" and ")}
       group by p.user_id, p.full_name, p.employee_id, d.name
       order by p.full_name`, params)).map(mapSummary);
});
var listAudit_createServerFn_handler = createServerRpc({
	id: "daceb62a608a369ee4b84660961ad75983ac172c3f78ad46883054c21ca1d51e",
	name: "listAudit",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => listAudit.__executeServer(opts));
var listAudit = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAudit_createServerFn_handler, async ({ context }) => {
	const { acting } = await actorOf(context.userId);
	requireRole(acting, ["super_admin", "admin"]);
	return (await (await getSql()).query(`select * from audit_logs order by created_at desc limit 300`)).map((r) => ({
		id: r.id,
		actorUserId: r.actor_user_id,
		actorName: r.actor_name,
		actorRole: r.actor_role,
		action: r.action,
		entityType: r.entity_type,
		entityId: r.entity_id,
		details: r.details,
		createdAt: String(r.created_at)
	}));
});
var getSettings_createServerFn_handler = createServerRpc({
	id: "39a6e751a14464d5cb46fafd7e81d2a50b0fcecd51bea795c6c36198bb07e0d6",
	name: "getSettings",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => getSettings.__executeServer(opts));
var getSettings = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getSettings_createServerFn_handler, async ({ context }) => {
	const { acting } = await actorOf(context.userId);
	requireActive(acting);
	const rows = await (await getSql()).query(`select key, value from system_settings`);
	const map = {};
	for (const r of rows) map[r.key] = r.value;
	return {
		companyName: map.company_name ?? "Overtime Ledger",
		timezone: map.timezone ?? "Europe/Berlin",
		requireDescription: map.require_description === "true"
	};
});
var updateSettings_createServerFn_handler = createServerRpc({
	id: "40935fd2ecfb1f39d3f712f5d00d6c2f2b01ea84aedc82601d0b1ff1d49298a6",
	name: "updateSettings",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => updateSettings.__executeServer(opts));
var updateSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(updateSettings_createServerFn_handler, async ({ context, data }) => {
	try {
		const { acting } = await actorOf(context.userId);
		requireRole(acting, ["super_admin"]);
		const sql = await getSql();
		const entries = [
			["company_name", data.companyName.trim() || "Overtime Ledger"],
			["timezone", data.timezone.trim() || "Europe/Berlin"],
			["require_description", data.requireDescription ? "true" : "false"]
		];
		for (const [k, v] of entries) await sql.query(`insert into system_settings (key, value) values ($1,$2)
           on conflict (key) do update set value = excluded.value`, [k, v]);
		await writeAudit({
			actor: acting,
			action: "settings.updated",
			entityType: "settings",
			entityId: "system"
		});
		return { ok: true };
	} catch (err) {
		fail(err);
	}
});
var startImpersonation_createServerFn_handler = createServerRpc({
	id: "adea2b577aa600704c46bf3ad4ed40e17b03007e19982edefcf8c53fd2668227",
	name: "startImpersonation",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => startImpersonation.__executeServer(opts));
var startImpersonation = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((targetUserId) => targetUserId).handler(startImpersonation_createServerFn_handler, async ({ context, data: targetUserId }) => {
	try {
		const actor = await actorOf(context.userId);
		requireRole(actor.real, ["super_admin"]);
		if (targetUserId === actor.real.userId) throw new AppError("You are already yourself.");
		const target = await loadProfile(targetUserId);
		if (!target) throw new AppError("User not found.", 404);
		await (await getSql()).query(`insert into impersonation (actor_user_id, target_user_id, started_at)
         values ($1,$2,now())
         on conflict (actor_user_id) do update set target_user_id = excluded.target_user_id, started_at = now()`, [actor.real.userId, targetUserId]);
		await writeAudit({
			actor: actor.real,
			action: "impersonation.start",
			entityType: "profile",
			entityId: targetUserId,
			details: {
				as: target.fullName,
				role: target.role
			}
		});
		return { ok: true };
	} catch (err) {
		fail(err);
	}
});
var stopImpersonation_createServerFn_handler = createServerRpc({
	id: "8dd53e33e6f2afa9a9209417c6ec482632487c749fff732c25c2233cb1d1185d",
	name: "stopImpersonation",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => stopImpersonation.__executeServer(opts));
var stopImpersonation = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(stopImpersonation_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const real = await loadProfile(context.userId);
	await sql.query(`delete from impersonation where actor_user_id = $1`, [context.userId]);
	if (real) await writeAudit({
		actor: real,
		action: "impersonation.end",
		entityType: "profile",
		entityId: context.userId
	});
	return { ok: true };
});
var exportExcel_createServerFn_handler = createServerRpc({
	id: "abc62de86ed93935db58dd0568de900ff8d45d99511b2b6278fb3cccb9cbadd5",
	name: "exportExcel",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => exportExcel.__executeServer(opts));
var exportExcel = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(exportExcel_createServerFn_handler, async ({ context, data }) => {
	try {
		const actor = await actorOf(context.userId);
		requireActive(actor.acting);
		if (!canExport(actor.acting.role)) throw new AppError("Only Admins can export Excel reports.", 403);
		data.month, data.from, data.to, data.departmentId, data.supervisorUserId, data.workerUserId;
		const sql = await getSql();
		const params = [];
		const where = ["true"];
		const add = (fragment, value) => {
			params.push(value);
			where.push(fragment.replace("?", `$${params.length}`));
		};
		let periodLabel = "All dates";
		if (data.month) {
			const b = monthBounds(data.month);
			add("o.work_date >= ?", b.from);
			add("o.work_date <= ?", b.to);
			periodLabel = b.label;
		} else {
			if (data.from) add("o.work_date >= ?", data.from);
			if (data.to) add("o.work_date <= ?", data.to);
			if (data.from || data.to) periodLabel = `${data.from ?? "…"} to ${data.to ?? "…"}`;
		}
		if (data.departmentId) add("o.department_id = ?", data.departmentId);
		if (data.supervisorUserId) add("o.supervisor_user_id = ?", data.supervisorUserId);
		if (data.workerUserId) add("o.worker_user_id = ?", data.workerUserId);
		const records = (await sql.query(`${OT_SELECT} where ${where.join(" and ")} order by w.full_name, o.work_date, o.start_time`, params)).map((row) => mapOvertime(row));
		const summaryMap = /* @__PURE__ */ new Map();
		for (const rec of records) {
			const cur = summaryMap.get(rec.workerUserId) ?? {
				userId: rec.workerUserId,
				fullName: rec.workerName,
				employeeId: rec.employeeId,
				departmentName: rec.departmentName,
				totalHours: 0,
				approvedHours: 0,
				pendingHours: 0,
				rejectedHours: 0,
				approvedCount: 0,
				pendingCount: 0,
				rejectedCount: 0,
				presentDays: 0,
				absentDays: 0
			};
			if (rec.status !== "rejected") cur.totalHours += rec.totalHours;
			if (rec.status === "approved") {
				cur.approvedHours += rec.totalHours;
				cur.approvedCount += 1;
			} else if (rec.status === "pending") {
				cur.pendingHours += rec.totalHours;
				cur.pendingCount += 1;
			} else {
				cur.rejectedHours += rec.totalHours;
				cur.rejectedCount += 1;
			}
			summaryMap.set(rec.workerUserId, cur);
		}
		const xml = buildOvertimeWorkbook({
			companyName: actor.companyName,
			title: "Overtime report",
			periodLabel,
			generatedAt: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19),
			generatedBy: actor.acting.fullName,
			records,
			summary: [...summaryMap.values()].sort((a, b) => a.fullName.localeCompare(b.fullName))
		});
		await writeAudit({
			actor: actor.acting,
			action: "report.exported",
			entityType: "report",
			entityId: data.month ?? "custom",
			details: {
				records: records.length,
				periodLabel
			}
		});
		return {
			filename: `overtime-${(data.month ?? "export").replaceAll("/", "-")}.xls`,
			mime: "application/vnd.ms-excel",
			xml
		};
	} catch (err) {
		fail(err);
	}
});
var seedDemo_createServerFn_handler = createServerRpc({
	id: "bfb21b50695ee76c4461e679e1fa29e81df13f079b7ab06eba9a35a83a0aaf3a",
	name: "seedDemo",
	filename: "src/lib/overtime/server-fns.ts"
}, (opts) => seedDemo.__executeServer(opts));
var seedDemo = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(seedDemo_createServerFn_handler, async ({ context }) => {
	const { acting } = await actorOf(context.userId);
	requireRole(acting, ["super_admin"]);
	await seedDemoCompany(acting);
	return { ok: true };
});
//#endregion
export { approveOvertime_createServerFn_handler, createDepartment_createServerFn_handler, createUser_createServerFn_handler, createWorker_createServerFn_handler, dashboardStats_createServerFn_handler, exportExcel_createServerFn_handler, getOvertime_createServerFn_handler, getSettings_createServerFn_handler, getUser_createServerFn_handler, getWorkerLink_createServerFn_handler, listAttendance_createServerFn_handler, listAudit_createServerFn_handler, listDepartments_createServerFn_handler, listOvertime_createServerFn_handler, listUsers_createServerFn_handler, loadSession_createServerFn_handler, regenerateWorkerLink_createServerFn_handler, rejectOvertime_createServerFn_handler, resetUserPassword_createServerFn_handler, seedDemo_createServerFn_handler, startImpersonation_createServerFn_handler, stopImpersonation_createServerFn_handler, submitOvertime_createServerFn_handler, updateDepartment_createServerFn_handler, updateSettings_createServerFn_handler, updateUser_createServerFn_handler, withdrawOvertime_createServerFn_handler, workerSummary_createServerFn_handler };
