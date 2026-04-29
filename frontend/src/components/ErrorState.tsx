import { StatePanel } from './StatePanel';

interface ErrorStateProps {
  title?: string;
  detail?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  detail = 'Please retry once the service contract is confirmed.',
}: ErrorStateProps) {
  return <StatePanel title={title} detail={detail} tone="error" />;
}