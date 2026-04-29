export type RuntimeConfig = {
  appOrigin: string | null;
  apiOrigin: string | null;
};

export const RUNTIME_ENV_KEYS = {
  appOrigin: 'VITE_APP_ORIGIN',
  apiOrigin: 'VITE_API_ORIGIN',
} as const;

function normalizeOrigin(value: string | undefined): string | null {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return null;
  }

  return trimmedValue.replace(/\/+$/, '');
}

export function getRuntimeConfig(): RuntimeConfig {
  const env = import.meta.env as Record<string, string | undefined>;

  return {
    appOrigin: normalizeOrigin(env[RUNTIME_ENV_KEYS.appOrigin]),
    apiOrigin: normalizeOrigin(env[RUNTIME_ENV_KEYS.apiOrigin]),
  };
}