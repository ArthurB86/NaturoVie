-- Profils utilisateurs
create table if not exists profils (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade unique,
  age int, genre text, taille int, poids numeric,
  activite text, sommeil text,
  problemes text, allergies text, objectifs text,
  updated_at timestamptz default now()
);
alter table profils enable row level security;
create policy "users own their profil" on profils using (auth.uid() = user_id);

-- Plans nutritionnels
create table if not exists nutrition_plans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  titre text not null,
  duree int default 7,
  objectif text,
  content text,
  status text default 'actif',
  created_at timestamptz default now()
);
alter table nutrition_plans enable row level security;
create policy "users own their plans" on nutrition_plans using (auth.uid() = user_id);

-- Cures détox
create table if not exists cures (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  nom text not null,
  content text,
  status text default 'actif',
  created_at timestamptz default now()
);
alter table cures enable row level security;
create policy "users own their cures" on cures using (auth.uid() = user_id);

-- Évolution / journal santé
create table if not exists evolution (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  date date default current_date,
  poids numeric, eau numeric,
  energie int, humeur int, sommeil int, digestion int,
  notes text,
  created_at timestamptz default now()
);
alter table evolution enable row level security;
create policy "users own their evolution" on evolution using (auth.uid() = user_id);

-- Posts communauté (publics en lecture)
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  author text,
  titre text not null,
  categorie text,
  contenu text,
  likes int default 0,
  created_at timestamptz default now()
);
alter table posts enable row level security;
create policy "posts are public" on posts for select using (true);
create policy "users own their posts" on posts for insert using (auth.uid() = user_id);
create policy "users can update their posts" on posts for update using (auth.uid() = user_id);

-- Imports Strava
create table if not exists strava_imports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  filename text,
  imported_at timestamptz default now()
);
alter table strava_imports enable row level security;
create policy "users own their imports" on strava_imports using (auth.uid() = user_id);
