declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_PETFINDER_KEY: string;
  readonly VITE_PETFINDER_SECRET: string;
  readonly VITE_KOFI_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
