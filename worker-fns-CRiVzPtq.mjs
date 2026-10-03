import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { c as rangesOverlap, o as monthBounds, s as overtimeRange, t as calculateOvertimeHours } from "./hours-BLlQzWhI.mjs";
import { r as getSql } from "./db-ZY3a9s7g.mjs";
import { E as writeAudit, h as mapOvertime, m as mapAttendance, n as AppError, p as loadWorkerByToken, r as OT_SELECT, s as getSetting, t as ATTENDANCE_SELECT, v as newId } from "./access-BiuT1YTe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/worker-fns-CRiVzPtq.js
function fail(err) {
	if (err instanceof AppError) throw err;
	if (err instanceof Error) throw new AppError(err.message);
	throw new AppError("Something went wrong.");
}
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
var loadWorkerPortal_createServerFn_handler = createServerRpc({
	id: "27de7d6935055786d4ec7f7ac647592022e9eeb633eabe868319c5766525aa6a",
	name: "loadWorkerPortal",
	filename: "src/lib/overtime/worker-fns.ts"
}, (opts) => loadWorkerPortal.__executeServer(opts));
var loadWorkerPortal = createServerFn({ method: "GET" }).validator((token) => token).handler(loadWorkerPortal_createServerFn_handler, async ({ data: token }) => {
	try {
		const { worker, companyName } = await loadWorkerByToken(token);
		return {
			token,
			companyName,
			worker
		};
	} catch (err) {
		fail(err);
	}
});
var listWorkerOvertime_createServerFn_handler = createServerRpc({
	id: "969a4003f8db5bee9c4dc7320088e12b28696a5e19742ae28cba19c0322556fc",
	name: "listWorkerOvertime",
	filename: "src/lib/overtime/worker-fns.ts"
}, (opts) => listWorkerOvertime.__executeServer(opts));
var listWorkerOvertime = createServerFn({ method: "GET" }).validator((input) => input).handler(listWorkerOvertime_createServerFn_handler, async ({ data }) => {
	try {
		const { worker } = await loadWorkerByToken(data.token);
		const sql = await getSql();
		const params = [worker.userId];
		let extra = "";
		if (data.month) {
			const { from, to } = monthBounds(data.month);
			params.push(from, to);
			extra = ` and o.work_date between $2 and $3`;
		}
		return (await sql.query(`${OT_SELECT} where o.worker_user_id = $1${extra} order by o.work_date desc, o.start_time desc`, params)).map((row) => mapOvertime(row));
	} catch (err) {
		fail(err);
	}
});
var listWorkerAttendance_createServerFn_handler = createServerRpc({
	id: "485578f90fb4ba25c3b724e3c48c991f55e08acbf4fab0fe6459a5d552f0143a",
	name: "listWorkerAttendance",
	filename: "src/lib/overtime/worker-fns.ts"
}, (opts) => listWorkerAttendance.__executeServer(opts));
var listWorkerAttendance = createServerFn({ method: "GET" }).validator((input) => input).handler(listWorkerAttendance_createServerFn_handler, async ({ data }) => {
	try {
		const { worker } = await loadWorkerByToken(data.token);
		const sql = await getSql();
		const params = [worker.userId];
		let extra = "";
		if (data.month) {
			const { from, to } = monthBounds(data.month);
			params.push(from, to);
			extra = ` and a.work_date between $2 and $3`;
		}
		return (await sql.query(`${ATTENDANCE_SELECT} where a.worker_user_id = $1${extra} order by a.work_date desc`, params)).map((row) => mapAttendance(row));
	} catch (err) {
		fail(err);
	}
});
var markWorkerAttendance_createServerFn_handler = createServerRpc({
	id: "bd86e54d040bdd5f4ebed56ffe4baaf5e5a6670716ea812762d6d7e74a845504",
	name: "markWorkerAttendance",
	filename: "src/lib/overtime/worker-fns.ts"
}, (opts) => markWorkerAttendance.__executeServer(opts));
var markWorkerAttendance = createServerFn({ method: "POST" }).validator((input) => input).handler(markWorkerAttendance_createServerFn_handler, async ({ data }) => {
	try {
		const { worker } = await loadWorkerByToken(data.token);
		if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new AppError("Choose a valid date.");
		if (data.status !== "present" && data.status !== "absent") throw new AppError("Mark present or absent.");
		const clockIn = data.status === "present" ? data.clockIn?.trim() || null : null;
		const clockOut = data.status === "present" ? data.clockOut?.trim() || null : null;
		let hours = null;
		if (clockIn && clockOut) hours = calculateOvertimeHours(clockIn, clockOut).hours;
		const sql = await getSql();
		const existing = await sql.query(`select id from attendance where worker_user_id = $1 and work_date = $2`, [worker.userId, data.date]);
		const id = existing[0]?.id ?? newId();
		if (existing[0]) await sql.query(`update attendance
           set status=$2, clock_in=$3, clock_out=$4, hours=$5, notes=$6, updated_at=now()
           where id=$1`, [
			id,
			data.status,
			clockIn,
			clockOut,
			hours,
			data.notes?.trim() || null
		]);
		else await sql.query(`insert into attendance (id, worker_user_id, work_date, status, clock_in, clock_out, hours, notes)
           values ($1,$2,$3,$4,$5,$6,$7,$8)`, [
			id,
			worker.userId,
			data.date,
			data.status,
			clockIn,
			clockOut,
			hours,
			data.notes?.trim() || null
		]);
		return { id };
	} catch (err) {
		fail(err);
	}
});
var submitWorkerOvertime_createServerFn_handler = createServerRpc({
	id: "d0008eb01131658cc695576d46350e985f20cd79fa2a14166201bccdaf2314e1",
	name: "submitWorkerOvertime",
	filename: "src/lib/overtime/worker-fns.ts"
}, (opts) => submitWorkerOvertime.__executeServer(opts));
var submitWorkerOvertime = createServerFn({ method: "POST" }).validator((input) => input).handler(submitWorkerOvertime_createServerFn_handler, async ({ data }) => {
	try {
		const { worker } = await loadWorkerByToken(data.token);
		if (!worker.supervisorUserId) throw new AppError("You must be assigned to a supervisor before submitting overtime.");
		if (await getSetting("require_description", "false") === "true" && !data.description?.trim()) throw new AppError("A description is required.");
		const { hours, crossesMidnight } = calculateOvertimeHours(data.startTime, data.endTime);
		if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new AppError("Choose a valid date.");
		await assertNoOverlap(worker.userId, data.date, data.startTime, data.endTime, data.id);
		const sql = await getSql();
		const description = data.description?.trim() || null;
		if (data.id) {
			const existing = await sql.query(`select status, worker_user_id from overtime_records where id = $1`, [data.id]);
			if (!existing[0] || existing[0].worker_user_id !== worker.userId) throw new AppError("Overtime record not found.", 404);
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
				worker.departmentId,
				worker.supervisorUserId
			]);
			return { id: data.id };
		}
		const id = newId();
		await sql.query(`insert into overtime_records (
          id, worker_user_id, work_date, start_time, end_time, total_hours, crosses_midnight,
          description, status, department_id, supervisor_user_id
        ) values ($1,$2,$3,$4,$5,$6,$7,$8,'pending',$9,$10)`, [
			id,
			worker.userId,
			data.date,
			data.startTime,
			data.endTime,
			hours,
			crossesMidnight,
			description,
			worker.departmentId,
			worker.supervisorUserId
		]);
		await writeAudit({
			actor: worker,
			action: "overtime.submitted",
			entityType: "overtime",
			entityId: id,
			details: {
				date: data.date,
				hours,
				via: "worker_link"
			}
		});
		return { id };
	} catch (err) {
		fail(err);
	}
});
var withdrawWorkerOvertime_createServerFn_handler = createServerRpc({
	id: "f2402eaf450924c2eb9a2c4b86b2fbfa94110ca2fd43f13a8ef554e106ffeb66",
	name: "withdrawWorkerOvertime",
	filename: "src/lib/overtime/worker-fns.ts"
}, (opts) => withdrawWorkerOvertime.__executeServer(opts));
var withdrawWorkerOvertime = createServerFn({ method: "POST" }).validator((input) => input).handler(withdrawWorkerOvertime_createServerFn_handler, async ({ data }) => {
	try {
		const { worker } = await loadWorkerByToken(data.token);
		const sql = await getSql();
		const rows = await sql.query(`select status, worker_user_id from overtime_records where id = $1`, [data.id]);
		if (!rows[0] || rows[0].worker_user_id !== worker.userId) throw new AppError("Record not found.", 404);
		if (rows[0].status !== "pending") throw new AppError("Only pending overtime can be withdrawn.");
		await sql.query(`delete from overtime_records where id = $1`, [data.id]);
		return { ok: true };
	} catch (err) {
		fail(err);
	}
});
//#endregion
export { listWorkerAttendance_createServerFn_handler, listWorkerOvertime_createServerFn_handler, loadWorkerPortal_createServerFn_handler, markWorkerAttendance_createServerFn_handler, submitWorkerOvertime_createServerFn_handler, withdrawWorkerOvertime_createServerFn_handler };
