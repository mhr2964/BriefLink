import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { adapters } from '../lib/adapters';
import { useAsyncData } from '../hooks/useAsyncData';
import { listDrafts } from '../lib/briefDraftStore';
import { formatDateTime } from '../lib/format';

export function HomePage() {
  const bootstrapState = useAsyncData(() => adapters.bootstrap.getBootstrap(), []);
  const healthState = useAsyncData(() => adapters.health.getHealth(), []);
  const recentBriefs = listDrafts();

  if (bootstrapState.status === 'loading' || healthState.status === 'loading') {
    return (
      <LoadingState
        title="Preparing dashboard"
        detail="Loading workspace context and service health for the MVP shell."
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
      <section className="brief-page dashboard-shell">
        <div className="brief-page__intro">
          <p className="eyebrow">Dashboard</p>
          <h2 className="brief-page__title">Walk into every client meeting already briefed</h2>
          <p className="brief-page__copy">
            Start with a company URL and operator notes, then generate a readable account brief you
            can review and share before outreach, meetings, and handoffs.
          </p>
        </div>

        <div className="dashboard-hero">
          <div className="brief-card">
            <span className="brief-card__label">Primary action</span>
            <h3 className="dashboard-hero__title">Start a new account ingestion</h3>
            <p className="brief-page__copy">
              The current MVP supports URL-led manual intake only. File upload and external source
              sync are not shown because they are not supported by visible artifacts.
            </p>
            <div className="brief-form__actions">
              <Link className="button button--primary" to="/briefs/new">
                Start ingestion
              </Link>
            </div>
          </div>

          <div className="brief-card dashboard-health">
            <span className="brief-card__label">Workspace status</span>
            <dl className="data-grid">
              <div>
                <dt>Workspace</dt>
                <dd>{bootstrap.workspaceName}</dd>
              </div>
              <div>
                <dt>Operator</dt>
                <dd>{bootstrap.userDisplayName}</dd>
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
          </div>
        </div>

        <section className="dashboard-section">
          <div className="dashboard-section__header">
            <div>
              <p className="eyebrow">Recent briefs</p>
              <h3 className="dashboard-section__title">Generated briefs ready for review</h3>
            </div>
          </div>

          {recentBriefs.length === 0 ? (
            <EmptyState
              title="No briefs yet"
              detail="Create your first ingestion to generate a shareable account brief."
            />
          ) : (
            <div className="dashboard-brief-list">
              {recentBriefs.map((brief) => (
                <article className="brief-card dashboard-brief-card" key={brief.id}>
                  <div className="dashboard-brief-card__header">
                    <div>
                      <span className="brief-card__label">{brief.status}</span>
                      <h4 className="dashboard-brief-card__title">{brief.title}</h4>
                    </div>
                  </div>
                  <p className="brief-page__copy">{brief.accountBrief}</p>
                  <div className="brief-form__actions">
                    <Link className="button button--secondary" to={`/briefs/${brief.slug}/success`}>
                      View generated brief
                    </Link>
                    <Link className="button button--secondary" to={`/b/${brief.slug}`}>
                      Open shared view
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  );
}