-- AE-16/AE-18/AE-21 hardening: stricter RLS + analytics views

-- Remove permissive public policies from user/session tables.
drop policy if exists "test_sessions_select_public" on public.test_sessions;
drop policy if exists "test_sessions_insert_public" on public.test_sessions;
drop policy if exists "test_sessions_update_public" on public.test_sessions;
drop policy if exists "session_answers_select_public" on public.session_answers;
drop policy if exists "session_answers_insert_public" on public.session_answers;
drop policy if exists "session_answers_update_public" on public.session_answers;
drop policy if exists "session_results_select_public" on public.session_results;
drop policy if exists "session_results_insert_public" on public.session_results;
drop policy if exists "session_results_update_public" on public.session_results;
drop policy if exists "share_cards_select_public" on public.share_cards;
drop policy if exists "share_cards_insert_public" on public.share_cards;
drop policy if exists "instruction_runs_select_public" on public.instruction_runs;
drop policy if exists "instruction_runs_insert_public" on public.instruction_runs;
drop policy if exists "event_log_insert_public" on public.event_log;
drop policy if exists "event_log_select_public" on public.event_log;

-- Keep metadata tables publicly readable for app bootstrap.
-- Restrict user/session data to authenticated owners only.
create policy "test_sessions_select_owner"
  on public.test_sessions
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "test_sessions_insert_owner"
  on public.test_sessions
  for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "test_sessions_update_owner"
  on public.test_sessions
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "session_answers_select_owner"
  on public.session_answers
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.test_sessions ts
      where ts.id = session_answers.session_id
        and ts.user_id = auth.uid()
    )
  );

create policy "session_answers_insert_owner"
  on public.session_answers
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.test_sessions ts
      where ts.id = session_answers.session_id
        and ts.user_id = auth.uid()
    )
  );

create policy "session_answers_update_owner"
  on public.session_answers
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.test_sessions ts
      where ts.id = session_answers.session_id
        and ts.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.test_sessions ts
      where ts.id = session_answers.session_id
        and ts.user_id = auth.uid()
    )
  );

create policy "session_results_select_owner"
  on public.session_results
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.test_sessions ts
      where ts.id = session_results.session_id
        and ts.user_id = auth.uid()
    )
  );

create policy "session_results_insert_owner"
  on public.session_results
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.test_sessions ts
      where ts.id = session_results.session_id
        and ts.user_id = auth.uid()
    )
  );

create policy "session_results_update_owner"
  on public.session_results
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.test_sessions ts
      where ts.id = session_results.session_id
        and ts.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.test_sessions ts
      where ts.id = session_results.session_id
        and ts.user_id = auth.uid()
    )
  );

create policy "share_cards_select_owner"
  on public.share_cards
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.test_sessions ts
      where ts.id = share_cards.session_id
        and ts.user_id = auth.uid()
    )
  );

create policy "share_cards_insert_owner"
  on public.share_cards
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.test_sessions ts
      where ts.id = share_cards.session_id
        and ts.user_id = auth.uid()
    )
  );

create policy "instruction_runs_select_owner"
  on public.instruction_runs
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.test_sessions ts
      where ts.id = instruction_runs.session_id
        and ts.user_id = auth.uid()
    )
  );

create policy "instruction_runs_insert_owner"
  on public.instruction_runs
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.test_sessions ts
      where ts.id = instruction_runs.session_id
        and ts.user_id = auth.uid()
    )
  );

create policy "event_log_select_owner"
  on public.event_log
  for select
  to authenticated
  using (
    session_id is null
    or exists (
      select 1
      from public.test_sessions ts
      where ts.id = event_log.session_id
        and ts.user_id = auth.uid()
    )
  );

create policy "event_log_insert_owner"
  on public.event_log
  for insert
  to authenticated
  with check (
    session_id is null
    or exists (
      select 1
      from public.test_sessions ts
      where ts.id = event_log.session_id
        and ts.user_id = auth.uid()
    )
  );

-- Funnel readout with conversion rates by stage for the last 7 days.
create or replace view public.v_funnel_7d as
with counts as (
  select
    coalesce(sum(case when event_name = 'landing_view' then 1 else 0 end), 0)::int as landing_view,
    coalesce(sum(case when event_name = 'session_created' then 1 else 0 end), 0)::int as session_created,
    coalesce(sum(case when event_name = 'session_scored' then 1 else 0 end), 0)::int as session_scored,
    coalesce(sum(case when event_name = 'share_click' then 1 else 0 end), 0)::int as share_click
  from public.event_log
  where created_at >= timezone('utc', now()) - interval '7 days'
), stages as (
  select 1 as stage_order, 'landing_view'::text as stage, landing_view as sample_count, null::int as previous_count, landing_view as start_count from counts
  union all
  select 2, 'session_created', session_created, landing_view, landing_view from counts
  union all
  select 3, 'session_scored', session_scored, session_created, landing_view from counts
  union all
  select 4, 'share_click', share_click, session_scored, landing_view from counts
)
select
  stage,
  stage_order,
  sample_count,
  case
    when previous_count is null or previous_count = 0 then null
    else round(sample_count::numeric / previous_count::numeric, 4)
  end as conversion_rate_from_previous,
  case
    when start_count = 0 then null
    else round(sample_count::numeric / start_count::numeric, 4)
  end as conversion_rate_from_start
from stages
order by stage_order;

-- Which type outputs get shared most often in the last 7 days.
create or replace view public.v_type_share_7d as
select
  coalesce(event_payload ->> 'typeCode', 'UNKNOWN') as type_code,
  count(*)::int as share_events
from public.event_log
where event_name = 'share_click'
  and created_at >= timezone('utc', now()) - interval '7 days'
group by coalesce(event_payload ->> 'typeCode', 'UNKNOWN')
order by share_events desc, type_code asc;
