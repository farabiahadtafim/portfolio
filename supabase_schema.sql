-- ==========================================================
-- HEADLESS CMS SUPABASE SCHEMA & STORAGE INITIALIZATION
-- Run this script inside Supabase Dashboard > SQL Editor
-- ==========================================================

-- 1. Site Settings Table
create table if not exists public.site_settings (
  id text primary key default 'default',
  hero_title text not null default 'PORTFOLIO',
  hero_subtitle text default 'Packaging & Brand Identity Designer',
  main_image_url text default '/image/Portfolio-Page-Main-Image.webp',
  bg_color text default '#141316',
  showcase_images text[] default array[]::text[],
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Seed initial site settings row
insert into public.site_settings (id, hero_title, hero_subtitle, main_image_url, bg_color)
values ('default', 'PORTFOLIO', 'Packaging & Brand Identity Designer', '/image/Portfolio-Page-Main-Image.webp', '#141316')
on conflict (id) do nothing;

-- 2. Projects Table (Used in 3D Curved Showcase & Selected Works)
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Branding',
  accent_color text not null default '#b8a6c9',
  image_url text,
  order_index integer not null default 0,
  is_active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Seed initial projects matching current showcase
insert into public.projects (title, category, accent_color, order_index, is_active)
values
  ('Lavender Vision', 'Brand Identity', '#b8a6c9', 0, true),
  ('Sand Gold Brand', 'Packaging Design', '#d7a56d', 1, true),
  ('Slate Teal Web', 'Digital Product', '#5d8d9a', 2, true),
  ('Terracotta App', 'UI/UX Design', '#c96b57', 3, true),
  ('Muted Olive UI', 'Visual Systems', '#8c9b6b', 4, true),
  ('Peach Layout', 'Editorial Layout', '#e29578', 5, true)
on conflict do nothing;

-- 3. Enable Row Level Security (RLS)
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;

-- 4. RLS Policies: Public read access
create policy "Allow public read on site_settings"
  on public.site_settings for select
  using (true);

create policy "Allow public read on projects"
  on public.projects for select
  using (true);

-- 5. RLS Policies: Authenticated Admin access for mutations
create policy "Allow authenticated admin all on site_settings"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);

create policy "Allow authenticated admin all on projects"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

-- 6. Enable Realtime Publications for instant sync
alter publication supabase_realtime add table public.site_settings;
alter publication supabase_realtime add table public.projects;

-- 7. Main (Home) Page Tables
create table if not exists public.home_settings (
  id text primary key default 'default',
  hero_headline_top text not null default 'THINK',
  hero_headline_bottom text not null default 'CREATIVELY',
  hero_tagline text default 'I help brands turn\nideas into structured,\nmeaningful experiences',
  hero_avatar_url text default '/image/tafim-cartoon-head.webp',
  hero_cta_text text default 'Book a call with me',
  client_count text default '99+ Happy clients',
  bio_title text default 'Product Label & Packaging Designer | Visualizer',
  about_photo_url text default '/Brand Identity & Packaging Designer Portfolio _ UI_UX Designer_files/pYrkmWKg9iMIMEQDan7ESNhHlA.webp',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

insert into public.home_settings (id, hero_headline_top, hero_headline_bottom, hero_tagline, hero_avatar_url, hero_cta_text)
values ('default', 'THINK', 'CREATIVELY', 'I help brands turn\nideas into structured,\nmeaningful experiences', '/image/tafim-cartoon-head.webp', 'Book a call with me')
on conflict (id) do nothing;

create table if not exists public.home_projects (
  id text primary key,
  title text not null,
  category text not null,
  tags jsonb default '[]'::jsonb,
  image text not null,
  link text default '#',
  order_index integer default 0
);

create table if not exists public.home_services (
  id text primary key,
  title text not null,
  description text not null,
  tags jsonb default '[]'::jsonb
);

create table if not exists public.home_testimonials (
  id text primary key,
  name text not null,
  role text not null,
  quote text not null,
  avatar text
);

create table if not exists public.home_faqs (
  number text primary key,
  question text not null,
  answer text not null
);

alter table public.home_settings enable row level security;
alter table public.home_projects enable row level security;
alter table public.home_services enable row level security;
alter table public.home_testimonials enable row level security;
alter table public.home_faqs enable row level security;

create policy "Allow public read on home_settings" on public.home_settings for select using (true);
create policy "Allow public read on home_projects" on public.home_projects for select using (true);
create policy "Allow public read on home_services" on public.home_services for select using (true);
create policy "Allow public read on home_testimonials" on public.home_testimonials for select using (true);
create policy "Allow public read on home_faqs" on public.home_faqs for select using (true);

create policy "Allow auth admin all on home_settings" on public.home_settings for all to authenticated using (true) with check (true);
create policy "Allow auth admin all on home_projects" on public.home_projects for all to authenticated using (true) with check (true);
create policy "Allow auth admin all on home_services" on public.home_services for all to authenticated using (true) with check (true);
create policy "Allow auth admin all on home_testimonials" on public.home_testimonials for all to authenticated using (true) with check (true);
create policy "Allow auth admin all on home_faqs" on public.home_faqs for all to authenticated using (true) with check (true);

alter publication supabase_realtime add table public.home_settings;
alter publication supabase_realtime add table public.home_projects;

-- 8. Cloud Storage Bucket Setup for portfolio-assets
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

create policy "Public can read portfolio assets"
  on storage.objects for select
  using (bucket_id = 'portfolio-assets');

create policy "Authenticated users can upload portfolio assets"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio-assets');

create policy "Authenticated users can update portfolio assets"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio-assets');

create policy "Authenticated users can delete portfolio assets"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio-assets');

