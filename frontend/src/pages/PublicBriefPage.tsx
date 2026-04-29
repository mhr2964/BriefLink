import { Link, useParams } from 'react-router-dom';
import { getDraft } from '../lib/briefDraftStore';

export function PublicBriefPage() {
  const { slug = '' } = useParams();
  const draft = getDraft(slug);

  if (!draft || draft.status !== 'ready') {
    return (
      <section className="brief-reader brief-reader--empty">
        <p className="eyebrow">Shared brief</p>
        <h2 className="brief-page__title">We couldn’t find that brief</h2>
        <p className="brief-page__copy">
          The public read view only shows locally generated ready briefs in this MVP shell.
        </p>
        <div className="brief-banner brief-banner--error">
          Empty/error state: no published brief was found for this link.
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
    <article className="brief-reader">
      <header className="brief-reader__header">
        <p className="eyebrow">Shared brief</p>
        <h1 className="brief-reader__title">{draft.title}</h1>
        <p className="brief-reader__summary">{draft.accountBrief}</p>
      </header>

      <section className="brief-reader__section">
        <h2>Company</h2>
        <p>{draft.companyName}</p>
      </section>

      <section className="brief-reader__section">
        <h2>Website</h2>
        <p>{draft.website}</p>
      </section>

      <section className="brief-reader__section">
        <h2>Risk flags</h2>
        <ul className="brief-reader__list">
          {draft.riskFlags.map((flag) => (
            <li key={flag}>{flag}</li>
          ))}
        </ul>
      </section>

      <section className="brief-reader__section">
        <h2>Prep notes</h2>
        <ul className="brief-reader__list">
          {draft.prepNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="brief-reader__section">
        <h2>Original intake goal</h2>
        <p>{draft.goals}</p>
      </section>

      <footer className="brief-reader__footer">
        <span className="brief-reader__meta">
          This prototype share view is generated from local browser state.
        </span>
        <div className="brief-form__actions">
          <Link className="button button--secondary" to="/">
            Back to dashboard
          </Link>
          <Link className="button button--secondary" to="/briefs/new">
            Start another ingestion
          </Link>
        </div>
      </footer>
    </article>
  );
}