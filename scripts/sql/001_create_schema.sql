-- Enable required extension if not present (Supabase typically has these)
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Profiles table linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

-- Services table (publicly readable)
create table if not exists public.services (
  id text primary key,
  title text not null,
  duration_minutes int not null,
  price_cents int not null
);

-- Appointments table
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_id text not null references public.services(id),
  date date not null,
  time text not null,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.appointments enable row level security;

-- Policies
do $$ begin
  -- profiles: user can view/update own row; insert via trigger on signup if desired
  create policy "select own profile" on public.profiles
    for select using (auth.uid() = id);
  create policy "update own profile" on public.profiles
    for update using (auth.uid() = id);
exception when duplicate_object then null end $$;

do $$ begin
  -- services: anyone can read; only service role can write
  create policy "read services" on public.services
    for select using (true);
exception when duplicate_object then null end $$;

do $$ begin
  -- appointments: user can read/insert own
  create policy "read own appts" on public.appointments
    for select using (auth.uid() = user_id);
  create policy "insert own appts" on public.appointments
    for insert with check (auth.uid() = user_id);
exception when duplicate_object then null end $$;

-- Seed services
insert into public.services (id, title, duration_minutes, price_cents) values
  ('reiki', 'Reiki Healing', 60, 9000),
  ('meditation', 'Meditation Guidance', 45, 7000),
  ('counseling', 'Spiritual Counseling', 60, 10000)
on conflict (id) do update set
  title = excluded.title,
  duration_minutes = excluded.duration_minutes,
  price_cents = excluded.price_cents;
