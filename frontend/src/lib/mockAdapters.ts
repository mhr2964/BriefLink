import type {
  AppAdapters,
  BootstrapData,
  HealthStatus,
  ItemDetail,
  ItemSummary,
} from './types';

const MOCK_DELAY_MS = 220;

const bootstrapData: BootstrapData = {
  appName: 'BriefLink',
  workspaceName: 'Prototype Workspace',
  userDisplayName: 'Alex',
  summary: 'A calm shell for validating route structure and adapter boundaries.',
};

const healthStatus: HealthStatus = {
  status: 'ok',
  checkedAt: '2026-04-29T09:00:00.000Z',
  message: 'Mock services responding normally.',
};

const itemDetails: ItemDetail[] = [
  {
    id: 'item-001',
    title: 'First intake brief',
    subtitle: 'Initial prospect summary',
    updatedAt: '2026-04-28T15:10:00.000Z',
    status: 'active',
    description:
      'A placeholder item representing the first intake brief in the prototype workspace.',
  },
  {
    id: 'item-002',
    title: 'Follow-up notes',
    subtitle: 'Conversation highlights',
    updatedAt: '2026-04-27T11:45:00.000Z',
    status: 'draft',
    description:
      'A draft item capturing follow-up notes and next-step placeholders for the shell.',
  },
  {
    id: 'item-003',
    title: 'Archived concept',
    subtitle: 'Retained for reference',
    updatedAt: '2026-04-24T08:30:00.000Z',
    status: 'archived',
    description:
      'An archived placeholder that helps demonstrate varied state styling in the list and detail views.',
  },
];

function wait<T>(value: T, delayMs = MOCK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(value), delayMs);
  });
}

async function getHealth(): Promise<HealthStatus> {
  return wait(healthStatus);
}

async function getBootstrap(): Promise<BootstrapData> {
  return wait(bootstrapData);
}

async function listItems(): Promise<ItemSummary[]> {
  const summaries = itemDetails.map(({ description, ...summary }) => summary);
  return wait(summaries);
}

async function getItem(itemId: string): Promise<ItemDetail> {
  const item = itemDetails.find((entry) => entry.id === itemId);

  if (!item) {
    throw new Error(`Item not found: ${itemId}`);
  }

  return wait(item);
}

export const mockAdapters: AppAdapters = {
  health: { getHealth },
  bootstrap: { getBootstrap },
  items: { listItems, getItem },
};