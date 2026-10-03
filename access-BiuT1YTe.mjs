import { o as getRequest } from "./ssr.mjs";
import { s as isAdminRole } from "./types-ewVYReTc.mjs";
import { t as calculateOvertimeHours } from "./hours-BLlQzWhI.mjs";
import { i as hashPassword$1, r as getSql } from "./db-ZY3a9s7g.mjs";
import { t as DEMO_PASSWORD } from "./demo-BXvPf1hH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/access-BiuT1YTe.js
function sig(name) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="130" viewBox="0 0 420 130"><path d="M18 86 C 70 18, 110 110, 168 52 S 250 18, 310 78 S 360 96, 402 42" fill="none" stroke="#1a1714" stroke-width="3.2" stroke-linecap="round"/><text x="22" y="118" font-family="Georgia, serif" font-size="13" fill="#6b645b">${name}</text></svg>`;
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
var DEPTS = [
	{
		id: "dept-warehouse",
		name: "Warehouse",
		code: "WH"
	},
	{
		id: "dept-dispatch",
		name: "Dispatch",
		code: "DS"
	},
	{
		id: "dept-night",
		name: "Night Shift",
		code: "NS"
	},
	{
		id: "dept-maintenance",
		name: "Maintenance",
		code: "MT"
	}
];
var USERS = [
	{
		id: "demo-admin",
		name: "Maria Chen",
		email: "maria.chen@northline.demo",
		role: "admin",
		employeeId: "AD-1001",
		departmentId: null,
		supervisorId: null
	},
	{
		id: "demo-supervisor-1",
		name: "James Okonkwo",
		email: "james.okonkwo@northline.demo",
		role: "supervisor",
		employeeId: "SV-2001",
		departmentId: "dept-warehouse",
		supervisorId: null
	},
	{
		id: "demo-supervisor-2",
		name: "Priya Raman",
		email: "priya.raman@northline.demo",
		role: "supervisor",
		employeeId: "SV-2002",
		departmentId: "dept-night",
		supervisorId: null
	},
	{
		id: "demo-worker-1",
		name: "Luis Ferreira",
		email: null,
		role: "worker",
		employeeId: "WH-3101",
		departmentId: "dept-warehouse",
		supervisorId: "demo-supervisor-1",
		token: "demo-luis"
	},
	{
		id: "demo-worker-2",
		name: "Kenji Watanabe",
		email: null,
		role: "worker",
		employeeId: "WH-3102",
		departmentId: "dept-warehouse",
		supervisorId: "demo-supervisor-1",
		token: "demo-kenji"
	},
	{
		id: "demo-worker-3",
		name: "Amina Diallo",
		email: null,
		role: "worker",
		employeeId: "WH-3103",
		departmentId: "dept-warehouse",
		supervisorId: "demo-supervisor-1",
		token: "demo-amina"
	},
	{
		id: "demo-worker-4",
		name: "Elena Rossi",
		email: null,
		role: "worker",
		employeeId: "NS-4101",
		departmentId: "dept-night",
		supervisorId: "demo-supervisor-2",
		token: "demo-elena"
	},
	{
		id: "demo-worker-5",
		name: "Omar Haddad",
		email: null,
		role: "worker",
		employeeId: "NS-4102",
		departmentId: "dept-night",
		supervisorId: "demo-supervisor-2",
		token: "demo-omar"
	},
	{
		id: "demo-worker-6",
		name: "Grace Nkomo",
		email: null,
		role: "worker",
		employeeId: "MT-5101",
		departmentId: "dept-maintenance",
		supervisorId: "demo-supervisor-1",
		token: "demo-grace"
	}
];
var RECORDS = [
	{
		id: "ot-1",
		worker: "demo-worker-1",
		date: "2026-09-22",
		start: "17:00",
		end: "20:00",
		description: "Container unload after late vessel",
		status: "approved"
	},
	{
		id: "ot-2",
		worker: "demo-worker-1",
		date: "2026-09-28",
		start: "17:30",
		end: "21:00",
		description: "Inventory recount",
		status: "approved"
	},
	{
		id: "ot-3",
		worker: "demo-worker-1",
		date: "2026-10-01",
		start: "17:00",
		end: "20:00",
		description: "Covered outbound dock",
		status: "pending"
	},
	{
		id: "ot-4",
		worker: "demo-worker-2",
		date: "2026-09-18",
		start: "16:00",
		end: "19:30",
		description: "Forklift coverage",
		status: "approved"
	},
	{
		id: "ot-5",
		worker: "demo-worker-2",
		date: "2026-09-29",
		start: "17:00",
		end: "22:00",
		description: "Weekend inbound",
		status: "rejected",
		reason: "Weekend inbound was already staffed. Please confirm with dispatch before submitting."
	},
	{
		id: "ot-6",
		worker: "demo-worker-2",
		date: "2026-10-01",
		start: "17:00",
		end: "19:00",
		description: "Aisle 12 restock",
		status: "pending"
	},
	{
		id: "ot-7",
		worker: "demo-worker-3",
		date: "2026-09-24",
		start: "17:00",
		end: "20:30",
		description: "Returns processing",
		status: "approved"
	},
	{
		id: "ot-8",
		worker: "demo-worker-3",
		date: "2026-09-30",
		start: "17:00",
		end: "21:00",
		description: "Month-end cycle count",
		status: "approved"
	},
	{
		id: "ot-9",
		worker: "demo-worker-4",
		date: "2026-09-21",
		start: "23:00",
		end: "02:30",
		description: "Line 3 breakdown — stayed to clear backlog",
		status: "approved"
	},
	{
		id: "ot-10",
		worker: "demo-worker-4",
		date: "2026-09-27",
		start: "22:00",
		end: "01:00",
		description: "Covered absent picker",
		status: "approved"
	},
	{
		id: "ot-11",
		worker: "demo-worker-4",
		date: "2026-09-30",
		start: "22:30",
		end: "01:30",
		description: "Night inbound from Rotterdam",
		status: "pending"
	},
	{
		id: "ot-12",
		worker: "demo-worker-5",
		date: "2026-09-19",
		start: "22:00",
		end: "01:45",
		description: "Reefer container check",
		status: "approved"
	},
	{
		id: "ot-13",
		worker: "demo-worker-5",
		date: "2026-09-26",
		start: "23:00",
		end: "03:00",
		description: "Double shift request",
		status: "rejected",
		reason: "Consecutive long nights exceed the rest-period policy."
	},
	{
		id: "ot-14",
		worker: "demo-worker-5",
		date: "2026-10-01",
		start: "22:00",
		end: "00:30",
		description: "Late truck arrival",
		status: "pending"
	},
	{
		id: "ot-15",
		worker: "demo-worker-6",
		date: "2026-09-20",
		start: "16:00",
		end: "19:00",
		description: "Conveyor belt repair",
		status: "approved"
	},
	{
		id: "ot-16",
		worker: "demo-worker-6",
		date: "2026-09-25",
		start: "18:00",
		end: "21:30",
		description: "Dock door 4 hydraulics",
		status: "approved"
	},
	{
		id: "ot-17",
		worker: "demo-worker-6",
		date: "2026-09-30",
		start: "17:00",
		end: "20:00",
		description: "Preventative maintenance catch-up",
		status: "pending"
	},
	{
		id: "ot-18",
		worker: "demo-worker-3",
		date: "2026-09-16",
		start: "17:00",
		end: "18:30",
		description: "Label reprint run",
		status: "approved"
	}
];
USERS.filter((u) => u.email).map((u) => ({
	role: u.role,
	name: u.name,
	email: u.email,
	password: DEMO_PASSWORD
}));
USERS.filter((u) => u.token).map((u) => ({
	name: u.name,
	employeeId: u.employeeId,
	token: u.token
}));
async function seedDemoCompany(actor) {
	const sql = await getSql();
	if ((await sql.query(`select user_id from profiles where user_id = 'demo-admin'`))[0]) return;
	const passwordHash = await hashPassword$1(DEMO_PASSWORD);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	await sql.query(`insert into system_settings (key, value) values ('company_name', 'Northline Logistics')
     on conflict (key) do update set value = excluded.value`);
	for (const d of DEPTS) await sql.query(`insert into departments (id, name, code, is_active) values ($1,$2,$3,true)
       on conflict (id) do nothing`, [
		d.id,
		d.name,
		d.code
	]);
	for (const u of USERS) {
		if (u.role !== "worker" && u.email) {
			await sql.query(`insert into "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
         values ($1,$2,$3,true,$4,$4) on conflict (id) do nothing`, [
				u.id,
				u.name,
				u.email,
				now
			]);
			await sql.query(`insert into "account" (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
         values ($1,$2,'credential',$3,$4,$5,$5) on conflict (id) do nothing`, [
				`acc-${u.id}`,
				u.id,
				u.id,
				passwordHash,
				now
			]);
		}
		await sql.query(`insert into profiles (user_id, role, full_name, employee_id, department_id, supervisor_user_id, is_active, created_by)
       values ($1,$2,$3,$4,$5,$6,true,$7) on conflict (user_id) do nothing`, [
			u.id,
			u.role,
			u.name,
			u.employeeId,
			u.departmentId,
			u.supervisorId,
			actor.userId
		]);
		if (u.role === "worker" && u.token) await sql.query(`insert into worker_links (token, worker_user_id) values ($1,$2) on conflict (token) do nothing`, [u.token, u.id]);
	}
	for (const rec of RECORDS) {
		const worker = USERS.find((u) => u.id === rec.worker);
		const { hours, crossesMidnight } = calculateOvertimeHours(rec.start, rec.end);
		const supervisor = worker.supervisorId;
		const supervisorName = USERS.find((u) => u.id === supervisor)?.name ?? null;
		const approved = rec.status === "approved";
		const rejected = rec.status === "rejected";
		const stamp = `${rec.date}T20:14:00.000Z`;
		await sql.query(`insert into overtime_records (
        id, worker_user_id, work_date, start_time, end_time, total_hours, crosses_midnight,
        description, status, department_id, supervisor_user_id,
        approved_by_user_id, approved_by_name, signature_data, approved_at, approval_ip, approval_user_agent,
        rejection_reason, rejected_at, rejected_by_user_id, rejected_by_name
      ) values (
        $1,$2,$3,$4,$5,$6,$7,
        $8,$9,$10,$11,
        $12,$13,$14,$15,$16,$17,
        $18,$19,$20,$21
      ) on conflict (id) do nothing`, [
			rec.id,
			rec.worker,
			rec.date,
			rec.start,
			rec.end,
			hours,
			crossesMidnight,
			rec.description,
			rec.status,
			worker.departmentId,
			supervisor,
			approved ? supervisor : null,
			approved ? supervisorName : null,
			approved ? sig(supervisorName ?? "Supervisor") : null,
			approved ? stamp : null,
			approved ? "10.4.12.18" : null,
			approved ? "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)" : null,
			rejected ? rec.reason ?? null : null,
			rejected ? stamp : null,
			rejected ? supervisor : null,
			rejected ? supervisorName : null
		]);
	}
	for (const a of [
		{
			id: "att-1",
			worker: "demo-worker-1",
			date: "2026-10-01",
			status: "present",
			in: "08:00",
			out: "17:00"
		},
		{
			id: "att-2",
			worker: "demo-worker-2",
			date: "2026-10-01",
			status: "present",
			in: "08:00",
			out: "17:00"
		},
		{
			id: "att-3",
			worker: "demo-worker-3",
			date: "2026-10-01",
			status: "absent"
		},
		{
			id: "att-4",
			worker: "demo-worker-4",
			date: "2026-09-30",
			status: "present",
			in: "22:00",
			out: "06:00"
		}
	]) {
		let hours = null;
		if (a.in && a.out) hours = calculateOvertimeHours(a.in, a.out).hours;
		await sql.query(`insert into attendance (id, worker_user_id, work_date, status, clock_in, clock_out, hours)
       values ($1,$2,$3,$4,$5,$6,$7) on conflict (worker_user_id, work_date) do nothing`, [
			a.id,
			a.worker,
			a.date,
			a.status,
			a.in ?? null,
			a.out ?? null,
			hours
		]);
	}
	await sql.query(`insert into audit_logs (id, actor_user_id, actor_name, actor_role, action, entity_type, entity_id, details)
     values ($1,$2,$3,$4,'system.seed_demo','company','northline',$5)`, [
		crypto.randomUUID(),
		actor.userId,
		actor.fullName,
		actor.role,
		JSON.stringify({
			workers: 6,
			supervisors: 2,
			records: RECORDS.length,
			links: true
		})
	]);
}
var AppError = class extends Error {
	status;
	constructor(message, status = 400) {
		super(message);
		this.name = "AppError";
		this.status = status;
	}
};
function newId() {
	return crypto.randomUUID();
}
function newAccessToken() {
	const bytes = /* @__PURE__ */ new Uint8Array(24);
	crypto.getRandomValues(bytes);
	let bin = "";
	for (const b of bytes) bin += String.fromCharCode(b);
	return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function num(value) {
	if (typeof value === "number") return value;
	if (typeof value === "string") return Number(value);
	return 0;
}
function assertTokenShape(token) {
	const trimmed = token.trim();
	if (!trimmed || trimmed.length < 8 || trimmed.length > 96 || !/^[A-Za-z0-9_-]+$/.test(trimmed)) throw new AppError("This worker link is invalid.", 404);
	return trimmed;
}
function mapProfile(row) {
	return {
		userId: row.user_id,
		role: row.role,
		fullName: row.full_name,
		employeeId: row.employee_id,
		departmentId: row.department_id,
		departmentName: row.department_name,
		supervisorUserId: row.supervisor_user_id,
		supervisorName: row.supervisor_name,
		phone: row.phone,
		isActive: row.is_active,
		email: row.email,
		createdAt: String(row.created_at)
	};
}
var PROFILE_SELECT = `
  select
    p.user_id,
    p.role,
    p.full_name,
    p.employee_id,
    p.department_id,
    d.name as department_name,
    p.supervisor_user_id,
    s.full_name as supervisor_name,
    p.phone,
    p.is_active,
    u.email,
    p.created_at
  from profiles p
  left join departments d on d.id = p.department_id
  left join profiles s on s.user_id = p.supervisor_user_id
  left join "user" u on u.id = p.user_id
`;
async function loadProfile(userId) {
	const rows = await (await getSql()).query(`${PROFILE_SELECT} where p.user_id = $1`, [userId]);
	return rows[0] ? mapProfile(rows[0]) : null;
}
async function loadAuthUser(userId) {
	return (await (await getSql()).query(`select name, email from "user" where id = $1`, [userId]))[0] ?? {
		name: "User",
		email: null
	};
}
async function getSetting(key, fallback = "") {
	return (await (await getSql()).query(`select value from system_settings where key = $1`, [key]))[0]?.value ?? fallback;
}
async function writeAudit(opts) {
	await (await getSql()).query(`insert into audit_logs (id, actor_user_id, actor_name, actor_role, action, entity_type, entity_id, details)
     values ($1,$2,$3,$4,$5,$6,$7,$8)`, [
		newId(),
		opts.actor.userId,
		opts.actor.fullName,
		opts.actor.role,
		opts.action,
		opts.entityType ?? null,
		opts.entityId ?? null,
		opts.details ? JSON.stringify(opts.details) : null
	]);
}
async function resolveActor(realUserId) {
	const sql = await getSql();
	let real = await loadProfile(realUserId);
	if (!real) {
		const authUser = await loadAuthUser(realUserId);
		const isFirst = ((await sql.query(`select count(*)::int as n from profiles where role = 'super_admin'`))[0]?.n ?? 0) === 0;
		await sql.query(`insert into profiles (user_id, role, full_name, employee_id, is_active, created_by)
       values ($1,$2,$3,$4,$5,$1)`, [
			realUserId,
			isFirst ? "super_admin" : "supervisor",
			authUser.name || authUser.email || "New supervisor",
			isFirst ? "SA-0001" : null,
			isFirst
		]);
		real = await loadProfile(realUserId);
		if (!real) throw new AppError("Could not create profile.", 500);
		if (isFirst) {
			await writeAudit({
				actor: real,
				action: "user.bootstrap_super_admin",
				entityType: "profile",
				entityId: real.userId
			});
			await seedDemoCompany(real);
		} else await writeAudit({
			actor: real,
			action: "user.pending_activation",
			entityType: "profile",
			entityId: real.userId,
			details: {
				email: authUser.email,
				role: "supervisor"
			}
		});
	}
	const companyName = await getSetting("company_name", "Overtime Ledger");
	const imp = await sql.query(`select target_user_id from impersonation where actor_user_id = $1`, [realUserId]);
	if (imp[0] && real.role === "super_admin") {
		const target = await loadProfile(imp[0].target_user_id);
		if (target && target.userId !== real.userId) return {
			real,
			acting: target,
			impersonating: true,
			companyName
		};
		await sql.query(`delete from impersonation where actor_user_id = $1`, [realUserId]);
	}
	return {
		real,
		acting: real,
		impersonating: false,
		companyName
	};
}
function requireActive(profile) {
	if (!profile.isActive) throw new AppError("This account is deactivated. Contact an administrator.", 403);
}
function requireRole(profile, roles) {
	requireActive(profile);
	if (!roles.includes(profile.role)) throw new AppError("You do not have permission to do that.", 403);
}
function assertCanViewWorker(actor, worker) {
	requireActive(actor);
	if (isAdminRole(actor.role)) return;
	if (actor.role === "supervisor" && worker.supervisorUserId === actor.userId) return;
	if (actor.role === "worker" && worker.userId === actor.userId) return;
	throw new AppError("You can only view workers assigned to you.", 403);
}
function clientMeta() {
	try {
		const request = getRequest();
		if (!request) return {
			ip: null,
			userAgent: null
		};
		return {
			ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || null,
			userAgent: request.headers.get("user-agent")
		};
	} catch {
		return {
			ip: null,
			userAgent: null
		};
	}
}
async function hashUserPassword(password) {
	if (password.length < 8) throw new AppError("Password must be at least 8 characters.");
	return hashPassword$1(password);
}
async function createAuthUser(opts) {
	const sql = await getSql();
	const now = (/* @__PURE__ */ new Date()).toISOString();
	if ((await sql.query(`select id from "user" where email = $1`, [opts.email.toLowerCase()]))[0]) throw new AppError("An account with that email already exists.");
	await sql.query(`insert into "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
     values ($1,$2,$3,true,$4,$4)`, [
		opts.id,
		opts.name,
		opts.email.toLowerCase(),
		now
	]);
	await sql.query(`insert into "account" (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
     values ($1,$2,'credential',$3,$4,$5,$5)`, [
		newId(),
		opts.id,
		opts.id,
		opts.passwordHash,
		now
	]);
}
async function nextEmployeeId(prefix) {
	const rows = await (await getSql()).query(`select employee_id from profiles where employee_id like $1 order by employee_id desc limit 20`, [`${prefix}-%`]);
	let max = 1e3;
	for (const row of rows) {
		const n = Number(row.employee_id.split("-")[1]);
		if (Number.isFinite(n) && n > max) max = n;
	}
	return `${prefix}-${max + 1}`;
}
async function issueWorkerLink(workerUserId, preferredToken) {
	const sql = await getSql();
	await sql.query(`update worker_links set revoked_at = now() where worker_user_id = $1 and revoked_at is null`, [workerUserId]);
	const token = preferredToken ?? newAccessToken();
	await sql.query(`insert into worker_links (token, worker_user_id) values ($1, $2)`, [token, workerUserId]);
	return token;
}
async function loadActiveWorkerToken(workerUserId) {
	return (await (await getSql()).query(`select token from worker_links where worker_user_id = $1 and revoked_at is null order by created_at desc limit 1`, [workerUserId]))[0]?.token ?? null;
}
async function loadWorkerByToken(token) {
	const safe = assertTokenShape(token);
	const sql = await getSql();
	const rows = await sql.query(`select worker_user_id from worker_links where token = $1 and revoked_at is null`, [safe]);
	if (!rows[0]) throw new AppError("This worker link is invalid or has been replaced.", 404);
	const worker = await loadProfile(rows[0].worker_user_id);
	if (!worker || worker.role !== "worker") throw new AppError("Worker not found.", 404);
	if (!worker.isActive) throw new AppError("This worker profile is deactivated. Contact your supervisor.", 403);
	await sql.query(`update worker_links set last_used_at = now() where token = $1`, [safe]);
	return {
		worker,
		companyName: await getSetting("company_name", "Overtime Ledger")
	};
}
function mapOvertime(row) {
	return {
		id: row.id,
		workerUserId: row.worker_user_id,
		workerName: row.worker_name,
		employeeId: row.employee_id,
		workDate: String(row.work_date).slice(0, 10),
		startTime: row.start_time,
		endTime: row.end_time,
		totalHours: num(row.total_hours),
		crossesMidnight: row.crosses_midnight,
		description: row.description,
		status: row.status,
		departmentId: row.department_id,
		departmentName: row.department_name,
		supervisorUserId: row.supervisor_user_id,
		supervisorName: row.supervisor_name,
		approvedByUserId: row.approved_by_user_id,
		approvedByName: row.approved_by_name,
		signatureData: row.signature_data,
		approvedAt: row.approved_at ? String(row.approved_at) : null,
		approvalIp: row.approval_ip,
		approvalUserAgent: row.approval_user_agent,
		rejectionReason: row.rejection_reason,
		rejectedAt: row.rejected_at ? String(row.rejected_at) : null,
		rejectedByName: row.rejected_by_name,
		createdAt: String(row.created_at),
		updatedAt: String(row.updated_at)
	};
}
var OT_SELECT = `
  select
    o.id,
    o.worker_user_id,
    w.full_name as worker_name,
    w.employee_id,
    o.work_date,
    o.start_time,
    o.end_time,
    o.total_hours,
    o.crosses_midnight,
    o.description,
    o.status,
    o.department_id,
    d.name as department_name,
    o.supervisor_user_id,
    sv.full_name as supervisor_name,
    o.approved_by_user_id,
    o.approved_by_name,
    o.signature_data,
    o.approved_at,
    o.approval_ip,
    o.approval_user_agent,
    o.rejection_reason,
    o.rejected_at,
    o.rejected_by_name,
    o.created_at,
    o.updated_at
  from overtime_records o
  join profiles w on w.user_id = o.worker_user_id
  left join departments d on d.id = o.department_id
  left join profiles sv on sv.user_id = o.supervisor_user_id
`;
function mapAttendance(row) {
	return {
		id: row.id,
		workerUserId: row.worker_user_id,
		workerName: row.worker_name,
		employeeId: row.employee_id,
		departmentName: row.department_name,
		workDate: String(row.work_date).slice(0, 10),
		status: row.status,
		clockIn: row.clock_in,
		clockOut: row.clock_out,
		hours: row.hours == null ? null : num(row.hours),
		notes: row.notes,
		createdAt: String(row.created_at),
		updatedAt: String(row.updated_at)
	};
}
var ATTENDANCE_SELECT = `
  select
    a.id,
    a.worker_user_id,
    w.full_name as worker_name,
    w.employee_id,
    d.name as department_name,
    a.work_date,
    a.status,
    a.clock_in,
    a.clock_out,
    a.hours,
    a.notes,
    a.created_at,
    a.updated_at
  from attendance a
  join profiles w on w.user_id = a.worker_user_id
  left join departments d on d.id = w.department_id
`;
function overtimeScopeSql(actor, alias = "o") {
	if (actor.role === "worker") return {
		sql: `${alias}.worker_user_id = $1`,
		params: [actor.userId]
	};
	if (actor.role === "supervisor") return {
		sql: `${alias}.worker_user_id in (select user_id from profiles where supervisor_user_id = $1)`,
		params: [actor.userId]
	};
	return {
		sql: "true",
		params: []
	};
}
async function listDepartmentsRows(activeOnly = false) {
	return (await (await getSql()).query(`select id, name, code, is_active from departments ${activeOnly ? "where is_active = true" : ""} order by name`)).map((r) => ({
		id: r.id,
		name: r.name,
		code: r.code,
		isActive: r.is_active
	}));
}
function mapSummary(row) {
	return {
		userId: row.user_id,
		fullName: row.full_name,
		employeeId: row.employee_id,
		departmentName: row.department_name,
		totalHours: num(row.total_hours),
		approvedHours: num(row.approved_hours),
		pendingHours: num(row.pending_hours),
		rejectedHours: num(row.rejected_hours),
		approvedCount: num(row.approved_count),
		pendingCount: num(row.pending_count),
		rejectedCount: num(row.rejected_count),
		presentDays: num(row.present_days),
		absentDays: num(row.absent_days)
	};
}
//#endregion
export { requireRole as C, writeAudit as E, requireActive as S, seedDemoCompany as T, mapSummary as _, clientMeta as a, num as b, hashUserPassword as c, loadActiveWorkerToken as d, loadProfile as f, mapProfile as g, mapOvertime as h, assertCanViewWorker as i, issueWorkerLink as l, mapAttendance as m, AppError as n, createAuthUser as o, loadWorkerByToken as p, OT_SELECT as r, getSetting as s, ATTENDANCE_SELECT as t, listDepartmentsRows as u, newId as v, resolveActor as w, overtimeScopeSql as x, nextEmployeeId as y };
