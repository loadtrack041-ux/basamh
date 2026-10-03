-- Worker personal links (no signup) and daily attendance.
-- Applied after 0002_overtime.sql. Idempotent.

create table if not exists worker_links (
  token text primary key,
  worker_user_id text not null references profiles (user_id) on delete cascade,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  revoked_at timestamptz
);

create index if not exists worker_links_worker_idx on worker_links (worker_user_id);
create index if not exists worker_links_active_idx on worker_links (worker_user_id) where revoked_at is null;

create table if not exists attendance (
  id text primary key,
  worker_user_id text not null references profiles (user_id) on delete cascade,
  work_date date not null,
  status text not null check (status in ('present', 'absent')),
  clock_in text,
  clock_out text,
  hours numeric(6, 2),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (worker_user_id, work_date)
);

create index if not exists attendance_worker_date_idx on attendance (worker_user_id, work_date);
create index if not exists attendance_date_idx on attendance (work_date);
