-- ✅ Create profiles table if it doesn't exist
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text,
  last_name text,
  quiz_completed boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ✅ Add quiz_completed column if the table exists already
alter table public.profiles
  add column if not exists quiz_completed boolean default false;

-- ✅ Enable RLS
alter table public.profiles enable row level security;

-- ✅ RLS Policies — allow authenticated users to manage only their own profile
create policy if not exists "Allow user to SELECT own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy if not exists "Allow user to INSERT own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy if not exists "Allow user to UPDATE own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
