export type BriefDraftStatus = 'draft' | 'ready' | 'shared';

export type BriefDraft = {
  id: string;
  slug: string;
  title: string;
  shareUrl: string;
  status: BriefDraftStatus;
  companyName: string;
  website: string;
  notes: string;
  goals: string;
  accountBrief: string;
  riskFlags: string[];
  prepNotes: string[];
};

type DraftInput = {
  companyName: string;
  website: string;
  notes: string;
  goals: string;
  slug?: string;
};

type DraftRecord = Record<string, BriefDraft>;

const STORAGE_KEY = 'brieflink-brief-drafts';
const SHARE_BASE_PATH = '/b/';

function getStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
}

function createFallbackDrafts(): DraftRecord {
  const seed = createReadyDraft({
    companyName: 'Northstar Health',
    website: 'https://northstarhealth.example',
    notes:
      'Series B health operations company expanding into enterprise accounts. Team needs a fast meeting-prep brief before partner outreach.',
    goals: 'Prepare leadership for partner outreach and surface likely risks before the first meeting.',
    slug: 'northstar-health-brief',
  });

  return {
    [seed.slug]: seed,
  };
}

function readDrafts(): DraftRecord {
  const storage = getStorage();

  if (!storage) {
    return createFallbackDrafts();
  }

  const rawValue = storage.getItem(STORAGE_KEY);

  if (!rawValue) {
    const fallbackDrafts = createFallbackDrafts();
    storage.setItem(STORAGE_KEY, JSON.stringify(fallbackDrafts));
    return fallbackDrafts;
  }

  try {
    const parsed = JSON.parse(rawValue) as DraftRecord;
    return parsed && typeof parsed === 'object' ? parsed : createFallbackDrafts();
  } catch {
    return createFallbackDrafts();
  }
}

function writeDrafts(drafts: DraftRecord) {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.setItem(STORAGE_KEY, JSON.stringify(drafts));
}

export function buildSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/https?:\/\//g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export function buildShareUrl(slug: string): string {
  return `${window.location.origin}${SHARE_BASE_PATH}${slug}`;
}

function buildRiskFlags(notes: string, goals: string): string[] {
  const normalizedSource = `${notes} ${goals}`.toLowerCase();
  const flags: string[] = [];

  if (normalizedSource.includes('enterprise')) {
    flags.push('Enterprise stakeholder alignment may slow approvals.');
  }

  if (normalizedSource.includes('partner')) {
    flags.push('Partner-facing messaging may need legal or procurement review.');
  }

  if (normalizedSource.includes('series b')) {
    flags.push('Recent growth-stage changes could create moving ownership across teams.');
  }

  if (flags.length === 0) {
    flags.push('Limited source material provided; validate assumptions before external sharing.');
  }

  return flags;
}

function buildPrepNotes(companyName: string, website: string): string[] {
  return [
    `Confirm the latest positioning and proof points on ${website}.`,
    `Open the meeting by anchoring on ${companyName}'s current priorities and desired outcome.`,
    'Bring one concrete next-step recommendation so the brief leads into action.',
  ];
}

function createReadyDraft(input: DraftInput): BriefDraft {
  const slug = buildSlug(input.slug || input.companyName || input.website || 'brief');
  const trimmedCompanyName = input.companyName.trim();
  const trimmedWebsite = input.website.trim();
  const trimmedNotes = input.notes.trim();
  const trimmedGoals = input.goals.trim();

  return {
    id: `brief-${slug}`,
    slug,
    title: `${trimmedCompanyName} account brief`,
    shareUrl: buildShareUrl(slug),
    status: 'ready',
    companyName: trimmedCompanyName,
    website: trimmedWebsite,
    notes: trimmedNotes,
    goals: trimmedGoals,
    accountBrief: `${trimmedCompanyName} appears to be a strong fit for a prep-first outreach motion. Use this brief to align on company context, surface likely concerns early, and walk into the next conversation already prepared.`,
    riskFlags: buildRiskFlags(trimmedNotes, trimmedGoals),
    prepNotes: buildPrepNotes(trimmedCompanyName, trimmedWebsite),
  };
}

export function saveDraft(input: DraftInput): BriefDraft {
  const drafts = readDrafts();
  const draft = createReadyDraft(input);

  drafts[draft.slug] = draft;
  writeDrafts(drafts);

  return draft;
}

export function getDraft(slug: string): BriefDraft | null {
  const drafts = readDrafts();
  return drafts[slug] ?? null;
}

export function listDrafts(): BriefDraft[] {
  return Object.values(readDrafts());
}