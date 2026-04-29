import { StatePanel } from './StatePanel';

interface EmptyStateProps {
  title?: string;
  detail?: string;
}

export function EmptyState({
  title = 'Nothing here yet',
  detail = 'Content will appear once data is available.',
}: EmptyStateProps) {
  return <StatePanel title={title} detail={detail} />;
}