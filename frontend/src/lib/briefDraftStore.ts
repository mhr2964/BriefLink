export type BriefStatus = 'draft' | 'ready';

export type BriefDraft = {
  title: string;
  audience: string;
  objective: string;
  keyPoints: string;
  cta: string;
  slug: string;
  shareUrl: string;
  status: BriefStatus;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = 'brieflink-prototype-briefs';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isValidStatus(value: unknown): value is BriefStatus {
  return value === 'draft' || value === 'ready';
}

function normalizeDraft(value: unknown): BriefDraft | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = typeof value.title === 'string' ? value.title : null;
  const audience = typeof value.audience === 'string' ? value.audience : null;
  const objective = typeof value.objective === 'string' ? value.objective : null;
  const keyPoints = typeof value.keyPoints === 'string' ? value.keyPoints : null;
  const cta = typeof value.cta === 'string' ? value.cta : null;
  const slug = typeof value.slug === 'string' ? value.slug : null;
  const shareUrl = typeof value.shareUrl === 'string' ? value.shareUrl : null;
  const status = isValidStatus(value.status) ? value.status : null;
  const createdAt = typeof value.createdAt === 'string' ? value.createdAt : null;
  const updatedAt = typeof value.updatedAt === 'string' ? value.updatedAt : null;

  if (
    !title ||
    !audience ||
    !objective ||
    !keyPoints ||
    !cta ||
    !slug ||
    !shareUrl ||
    !status ||
    !createdAt ||
    !updatedAt
  ) {
    return null;
  }

  return {
    title,
    audience,
    objective,
    keyPoints,
    cta,
    slug,
    shareUrl,
    status,
    createdAt,
    updatedAt,
  };
}

function readStore(): Record<string, BriefDraft> {
  if (typeof window === 'undefined') {
    return {};
  }

  const rawStore = window.localStorage.getItem(STORAGE_KEY);
  if (!rawStore) {
    return {};
  }

  try {
    const parsedStore: unknown = JSON.parse(rawStore);
    if (!isRecord(parsedStore)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsedStore)
        .map(([key, value]) => [key, normalizeDraft(value)] as const)
        .filter((entry): entry is [string, BriefDraft] => entry[1] !== null),
    );
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, BriefDraft>) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function buildSlug(input: string) {
  const normalized = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || 'untitled-brief';
}

export function normalizeSlug(input: string) {
  return buildSlug(input);
}

export function buildShareUrl(slug: string) {
  if (typeof window === 'undefined') {
    return `/b/${slug}`;
  }

  return `${window.location.origin}/b/${slug}`;
}

function buildUniqueSlug(preferredSlug: string, store: Record<string, BriefDraft>) {
  if (!store[preferredSlug]) {
    return preferredSlug;
  }

  let suffix = 2;
  let candidate = `${preferredSlug}-${suffix}`;

  while (store[candidate]) {
    suffix += 1;
    candidate = `${preferredSlug}-${suffix}`;
  }

  return candidate;
}

export function saveDraft(
  draft: Omit<BriefDraft, 'shareUrl' | 'createdAt' | 'updatedAt'>,
  options?: { preserveExistingSlug?: boolean },
) {
  const store = readStore();
  const normalizedRequestedSlug = normalizeSlug(draft.slug);
  const existingDraft = store[normalizedRequestedSlug];
  const shouldPreserveExistingSlug = options?.preserveExistingSlug === true && existingDraft;
  const resolvedSlug = shouldPreserveExistingSlug
    ? normalizedRequestedSlug
    : buildUniqueSlug(normalizedRequestedSlug, store);
  const existingResolvedDraft = store[resolvedSlug];
  const createdAt = existingResolvedDraft?.createdAt ?? new Date().toISOString();

  const savedDraft: BriefDraft = {
    ...draft,
    slug: resolvedSlug,
    shareUrl: buildShareUrl(resolvedSlug),
    createdAt,
    updatedAt: new Date().toISOString(),
  };

  store[resolvedSlug] = savedDraft;
  writeStore(store);
  return savedDraft;
}

export function getDraft(slug: string) {
  const store = readStore();
  const normalizedSlug = normalizeSlug(slug);
  return store[normalizedSlug] ?? null;
}

export function markDraftReady(slug: string) {
  const draft = getDraft(slug);
  if (!draft) {
    return null;
  }

  return saveDraft(
    {
      ...draft,
      status: 'ready',
    },
    { preserveExistingSlug: true },
  );
}