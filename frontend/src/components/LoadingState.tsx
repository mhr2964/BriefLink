import { StatePanel } from './StatePanel';

interface LoadingStateProps {
  title?: string;
  detail?: string;
}

export function LoadingState({
  title = 'Loading',
  detail = 'Please wait while we prepare this view.',
}: LoadingStateProps) {
  return <StatePanel title={title} detail={detail} />;
}