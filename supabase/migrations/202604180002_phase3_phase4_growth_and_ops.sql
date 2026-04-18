-- AE-13 through AE-22 foundational schema extensions

alter table public.test_sessions
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists referral_code text,
  add column if not exists referrer_session_id uuid references public.test_sessions(id) on delete set null,
  add column if not exists completed_at timestamptz;

create index if not exists idx_test_sessions_user_created_at on public.test_sessions(user_id, created_at desc);
create index if not exists idx_test_sessions_referral_code on public.test_sessions(referral_code);
create index if not exists idx_test_sessions_completed_at on public.test_sessions(completed_at desc);

alter table public.event_log
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists event_source text not null default 'web';

create index if not exists idx_event_log_user_created_at on public.event_log(user_id, created_at desc);
create index if not exists idx_event_log_session_created_at on public.event_log(session_id, created_at desc);

create table if not exists public.compare_sets (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.compare_set_items (
  id uuid primary key default gen_random_uuid(),
  compare_set_id uuid not null references public.compare_sets(id) on delete cascade,
  session_id uuid not null references public.test_sessions(id) on delete cascade,
  label text,
  created_at timestamptz not null default timezone('utc', now()),
  unique(compare_set_id, session_id)
);

create index if not exists idx_compare_set_items_compare_set on public.compare_set_items(compare_set_id);
create index if not exists idx_compare_set_items_session on public.compare_set_items(session_id);

create trigger set_updated_at_compare_sets
before update on public.compare_sets
for each row
execute procedure public.set_updated_at();

alter table public.compare_sets enable row level security;
alter table public.compare_set_items enable row level security;

create policy "compare_sets_select_public"
  on public.compare_sets
  for select
  to anon, authenticated
  using (true);

create policy "compare_sets_insert_public"
  on public.compare_sets
  for insert
  to anon, authenticated
  with check (true);

create policy "compare_set_items_select_public"
  on public.compare_set_items
  for select
  to anon, authenticated
  using (true);

create policy "compare_set_items_insert_public"
  on public.compare_set_items
  for insert
  to anon, authenticated
  with check (true);

create or replace view public.v_type_distribution_7d as
select
  sr.type_code,
  count(*)::int as sample_count
from public.session_results sr
join public.test_sessions ts on ts.id = sr.session_id
where ts.created_at >= timezone('utc', now()) - interval '7 days'
group by sr.type_code
order by sample_count desc;

create or replace view public.v_funnel_7d as
with base as (
  select event_name, count(*)::int as sample_count
  from public.event_log
  where created_at >= timezone('utc', now()) - interval '7 days'
  group by event_name
)
select * from base
where event_name in ('landing_view', 'session_created', 'session_scored', 'share_click')
order by event_name;
