-- Upgrade the previous 0–5 guest table without deleting existing RSVPs.
begin;
alter table public.rsvps add column if not exists attendee_names text[] not null default '{}';
alter table public.rsvps drop constraint if exists rsvps_guests_check;
alter table public.rsvps add constraint rsvps_guests_check check (guests between 0 and 10);
-- NOT VALID preserves older responses which did not collect attendee names.
-- New inserts and updates must obey the new rule.
alter table public.rsvps drop constraint if exists rsvps_attendance_check;
alter table public.rsvps add constraint rsvps_attendance_check check (
 (attending and guests between 1 and 10 and cardinality(attendee_names) = guests)
 or (not attending and guests = 0 and cardinality(attendee_names) = 0)
) not valid;
alter table public.rsvps enable row level security;
revoke all on public.rsvps from anon, authenticated;
grant insert on public.rsvps to anon, authenticated;
grant usage on sequence public.rsvps_id_seq to anon, authenticated;
commit;
