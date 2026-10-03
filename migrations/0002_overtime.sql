-- Overtime Ledger schema. Idempotent. Applied after Better Auth 0001_auth.sql.

create table if not exists departments (
  id text primary key,
  name text not null,
  code text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  user_id text primary key,
  role text not null check (role in ('super_admin', 'admin', 'supervisor', 'worker')),
  full_name text not null,
  employee_id text unique,
  department_id text references departments (id) on delete set null,
  supervisor_user_id text,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text
);

create index if not exists profiles_role_idx on profiles (role);
create index if not exists profiles_supervisor_idx on profiles (supervisor_user_id);
create index if not exists profiles_department_idx on profiles (department_id);
create index if not exists profiles_active_idx on profiles (is_active);

create table if not exists overtime_records (
  id text primary key,
  worker_user_id text not null references profiles (user_id),
  work_date date not null,
  start_time text not null,
  end_time text not null,
  total_hours numeric(6, 2) not null,
  crosses_midnight boolean not null default false,
  description text,
  status text not null check (status in ('pending', 'approved', 'rejected')),
  department_id text references departments (id) on delete set null,
  supervisor_user_id text,
  approved_by_user_id text,
  approved_by_name text,
  signature_data text,
  approved_at timestamptz,
  approval_ip text,
  approval_user_agent text,
  rejection_reason text,
  rejected_at timestamptz,
  rejected_by_user_id text,
  rejected_by_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ot_worker_date_idx on overtime_records (worker_user_id, work_date);
create index if not exists ot_status_idx on overtime_records (status);
create index if not exists ot_supervisor_idx on overtime_records (supervisor_user_id);
create index if not exists ot_department_idx on overtime_records (department_id);
create index if not exists ot_work_date_idx on overtime_records (work_date);

create table if not exists audit_logs (
  id text primary key,
  actor_user_id text,
  actor_name text,
  actor_role text,
  action text not null,
  entity_type text,
  entity_id text,
  details text,
  created_at timestamptz not null default now()
);

create index if not exists audit_created_idx on audit_logs (created_at desc);
create index if not exists audit_actor_idx on audit_logs (actor_user_id);
create index if not exists audit_entity_idx on audit_logs (entity_type, entity_id);

create table if not exists impersonation (
  actor_user_id text primary key,
  target_user_id text not null,
  started_at timestamptz not null default now()
);

create table if not exists system_settings (
  key text primary key,
  value text not null
);

insert into system_settings (key, value) values
  ('company_name', 'Overtime Ledger'),
  ('timezone', 'Europe/Berlin'),
  ('require_description', 'false')
on conflict (key) do nothing;
