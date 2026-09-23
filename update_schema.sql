ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS showcase_images text[];
ALTER TABLE public.home_settings ADD COLUMN IF NOT EXISTS carousel_images text[];
