export type BriefDraftStatus = 'draft' | 'ready' | 'shared';
export type MonitoringStage = 'live' | 'waiting-for-reply' | 'first-reply-received';

export type BriefDraft = {
  id: string;
  title: string;
  summary: string;
  audience: string;
  goals: string[];
  tone: string;
  status: BriefDraftStatus;
};

export type MonitoringTimelineItem = {
  id: string;
  label: string;
  detail: string;
  timestampLabel: string;
};

export type MonitoringGuidance = {
  id: string;
  title: string;
  detail: string;
};

export type ActivatedBriefMonitoring = {
  briefId: string;
  stage: MonitoringStage;
  stageLabel: string;
  sharedAtLabel: string;
  activatedStatusLabel: string;
  primarySignal: string;
  recipientSummary: string;
  timeline: MonitoringTimelineItem[];
  guidance: MonitoringGuidance[];
};

export type BriefDraftStore = {
  draft: BriefDraft;
  monitoring: ActivatedBriefMonitoring | null;
};

const defaultDraft: BriefDraft = {
  id: 'brief-001',
  title: 'Q2 customer story campaign',
  summary:
    'A concise brief for launching a customer evidence campaign across sales and lifecycle marketing.',
  audience: 'Sales and lifecycle leads',
  goals: ['Align narrative', 'Improve reuse', 'Speed up stakeholder review'],
  tone: 'Calm and clear',
  status: 'shared',
};

const defaultActivatedBriefMonitoring: ActivatedBriefMonitoring = {
  briefId: 'brief-001',
  stage: 'first-reply-received',
  stageLabel: 'First reply received',
  sharedAtLabel: 'Shared 18 minutes ago',
  activatedStatusLabel: 'Brief is live',
  primarySignal: 'One recipient has replied with a request for two extra customer examples.',
  recipientSummary:
    '12 recipients received the brief. Early engagement is concentrated in the core sales group.',
  timeline: [
    {
      id: 'timeline-1',
      label: 'Brief is live',
      detail: 'The share link was activated for the selected recipients.',
      timestampLabel: '18 minutes ago',
    },
    {
      id: 'timeline-2',
      label: 'Waiting for reply',
      detail: 'The first opens arrived and the brief began circulating quietly.',
      timestampLabel: '11 minutes ago',
    },
    {
      id: 'timeline-3',
      label: 'First reply received',
      detail:
        'A sales manager replied asking for two additional examples before forwarding it.',
      timestampLabel: '4 minutes ago',
    },
  ],
  guidance: [
    {
      id: 'guidance-1',
      title: 'Respond while attention is fresh',
      detail:
        'A short reply with the requested examples should help the brief keep moving without broadening the thread.',
    },
    {
      id: 'guidance-2',
      title: 'Keep the audience tight',
      detail:
        'The current group is engaged enough to learn from before sending the brief wider.',
    },
  ],
};

const store: BriefDraftStore = {
  draft: defaultDraft,
  monitoring: defaultActivatedBriefMonitoring,
};

export function getBriefDraftStore(): BriefDraftStore {
  return store;
}