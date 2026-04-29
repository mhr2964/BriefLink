import { Link, useParams } from 'react-router-dom';
import { getDraft } from '../lib/briefDraftStore';

export function BriefSuccessPage() {
  const { slug = '' } = useParams();
  const draft = getDraft(slug);

  if (!draft) {
    return (
      <section className="brief-page brief-page--empty">
        <p className="eyebrow">Generated brief</p>
        <h2 className="brief-page__title">We couldn’t find that brief</h2>
        <p className="brief-page__copy">
          This MVP shell keeps generated briefs in local browser state, so unknown links return a
          recovery message instead of a live backend result.
        </p>
        <div className="brief-banner brief-banner--error">
          Empty/error state: no generated brief was found for this view.
        </div>
        <div className="brief-form__actions">
          <Link className="button button--primary" to="/">
            Back to dashboard
          </Link>
          <Link className="button button--secondary" to="/briefs/new">
            Start another ingestion
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="brief-page brief-page--success">
      <div className="brief-page__intro">
        <p className="eyebrow">Generated brief</p>
        <h2 className="brief-page__title">{draft.title}</h2>
        <p className="brief-page__copy">
          Review the generated account brief below, then open the shared read view or start another
          ingestion.
        </p>
      </div>

      <div className="brief-card">
        <div className="brief-card__grid">
          <section className="brief-card__section">
            <span className="brief-card__label">Company</span>
            <p>{draft.companyName}</p>
          </section>
          <section className="brief-card__section">
            <span className="brief-card__label">Website</span>
            <p>{draft.website}</p>
          </section>
        </div>

        <section className="brief-card__section">
          <span className="brief-card__label">Account brief</span>
          <p>{draft.accountBrief}</p>
        </section>

        <section className="brief-card__section">
          <span className="brief-card__label">Risk flags</span>
          <ul className="brief-card__list">
            {draft.riskFlags.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </section>

        <section className="brief-card__section">
          <span className="brief-card__label">Prep notes</span>
          <ul className="brief-card__list">
            {draft.prepNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <section className="brief-card__section">
          <span className="brief-card__label">Source inputs</span>
          <p>
            <strong>Notes:</strong> {draft.notes}
          </p>
          <p>
            <strong>Goal:</strong> {draft.goals}
          </p>
        </section>
      </div>

      <div className="success-panel__linkbox">
        <span className="success-panel__linklabel">Shared brief link</span>
        <a href={draft.shareUrl} className="success-panel__link">
          {draft.shareUrl}
        </a>
      </div>

      <div className="brief-form__actions">
        <Link className="button button--primary" to={`/b/${draft.slug}`}>
          Open shared brief
        </Link>
        <Link className="button button--secondary" to="/">
          Back to dashboard
        </Link>
        <Link className="button button--secondary" to="/briefs/new">
          Start another ingestion
        </Link>
      </div>
    </section>
  );
}