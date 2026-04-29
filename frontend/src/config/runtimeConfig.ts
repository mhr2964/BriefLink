type RuntimeConfig = {
  appOrigin: string;
  apiOrigin: string;
};

const DEFAULT_APP_ORIGIN = 'https://app.brieflink.app';
const DEFAULT_API_ORIGIN = 'https://api.brieflink.app';

function readEnvValue(value: string | undefined, fallback: string): string {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return fallback;
  }

  return trimmedValue.replace(/\/+$/, '');
}

export function getRuntimeConfig(): RuntimeConfig {
  const env = import.meta.env as Record<string, string | undefined>;

  return {
    appOrigin: readEnvValue(env.VITE_APP_ORIGIN, DEFAULT_APP_ORIGIN),
    apiOrigin: readEnvValue(env.VITE_API_ORIGIN, DEFAULT_API_ORIGIN),
  };
}