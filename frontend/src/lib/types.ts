export interface HealthStatus {
  status: 'ok' | 'degraded' | 'down';
  checkedAt: string;
  message: string;
}

export interface BootstrapData {
  appName: string;
  workspaceName: string;
  userDisplayName: string;
  summary: string;
}

export interface ItemSummary {
  id: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  status: 'active' | 'draft' | 'archived';
}

export interface ItemDetail extends ItemSummary {
  description: string;
}

export interface HealthAdapter {
  getHealth(): Promise<HealthStatus>;
}

export interface BootstrapAdapter {
  getBootstrap(): Promise<BootstrapData>;
}

export interface ItemsAdapter {
  listItems(): Promise<ItemSummary[]>;
  getItem(itemId: string): Promise<ItemDetail>;
}

export interface AppAdapters {
  health: HealthAdapter;
  bootstrap: BootstrapAdapter;
  items: ItemsAdapter;
}