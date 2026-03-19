/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_CDN_BASE_URL?: string;
  readonly VITE_CLIENT_AREA_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
