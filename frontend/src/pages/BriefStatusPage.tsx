import { Link, useParams } from 'react-router-dom';
import { getDraft, getPrototypeSignals } from '../lib/briefDraftStore';

export function BriefStatusPage() {
  const { slug = '' } = useParams();
  const draft = getDraft(slug);

  if (!draft || draft.status !== 'ready') {
    return (
      <section className="brief-page brief-page--empty">
        <p className="eyebrow">Status</p>
        <h2 className="brief-page__title">We couldn’t load this brief status</h2>
        <p className="brief-page__copy">
          This prototype uses local mock state, so missing data and unknown links return a generic
          recovery message.
        </p>
        <div className="brief-banner brief-banner--error">
          Empty/error state: no ready brief was found for this status screen.
        </div>
        <div className="brief-form__actions">
          <Link className="button button--primary" to="/briefs/new">
            Create brief
          </Link>
        </div>
      </section>
    );
  }

  const signals = getPrototypeSignals(draft);

  return (
    <section className="brief-page brief-page--success">
      <div className="success-panel">
        <p className="eyebrow">Status</p>
        <h2 className="brief-page__title">Post-share activity at a glance</h2>
        <p className="brief-page__copy">
          This creator-facing view adds lightweight visibility into what happened after the brief
          was shared.
        </p>

        <div className="success-panel__linkbox">
          <span className="success-panel__linklabel">Current brief</span>
          <span className="success-panel__link">{draft.title}</span>
        </div>

        <div className="brief-banner brief-banner--info">
          Reply status: {signals.hasFirstReply ? 'first reply received.' : 'waiting for first reply.'}
        </div>

        <div className="brief-form__actions">
          <Link className="button button--primary" to={`/briefs/${draft.slug}/replies`}>
            {signals.hasFirstReply ? 'Review first reply' : 'Add first reply'}
          </Link>
          <Link className="button button--secondary" to={`/briefs/${draft.slug}/success`}>
            Back to share state
          </Link>
        </div>
      </div>
    </section>
  );
}