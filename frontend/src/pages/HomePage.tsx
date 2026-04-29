import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { SuccessState } from '../components/SuccessState';
import { adapters } from '../lib/adapters';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatDateTime } from '../lib/format';

export function HomePage() {
  const bootstrapState = useAsyncData(() => adapters.bootstrap.getBootstrap(), []);
  const healthState = useAsyncData(() => adapters.health.getHealth(), []);

  if (bootstrapState.status === 'loading' || healthState.status === 'loading') {
    return (
      <LoadingState
        title="Preparing workspace"
        detail="Gathering bootstrap and service health information."
      />
    );
  }

  if (bootstrapState.status === 'error') {
    return <ErrorState detail={bootstrapState.error ?? undefined} />;
  }

  if (healthState.status === 'error') {
    return <ErrorState detail={healthState.error ?? undefined} />;
  }

  if (bootstrapState.status !== 'success' || healthState.status !== 'success') {
    return <LoadingState />;
  }

  const bootstrap = bootstrapState.data;
  const health = healthState.data;

  return (
    <div className="page-stack">
      <SuccessState
        title={`Welcome back, ${bootstrap.userDisplayName}`}
        detail={bootstrap.summary}
      >
        <dl className="data-grid">
          <div>
            <dt>Application</dt>
            <dd>{bootstrap.appName}</dd>
          </div>
          <div>
            <dt>Workspace</dt>
            <dd>{bootstrap.workspaceName}</dd>
          </div>
          <div>
            <dt>Service health</dt>
            <dd>{health.status}</dd>
          </div>
          <div>
            <dt>Last checked</dt>
            <dd>{formatDateTime(health.checkedAt)}</dd>
          </div>
        </dl>
        <p className="supporting-text">{health.message}</p>
      </SuccessState>
    </div>
  );
}