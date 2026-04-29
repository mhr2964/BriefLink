import { Link, useParams } from 'react-router-dom';
import { getDraft } from '../lib/briefDraftStore';

function toPoints(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.replace(/^[•*-]\s*/, ''));
}

export function PublicBriefPage() {
  const { slug = '' } = useParams();
  const draft = getDraft(slug);

  if (!draft || draft.status !== 'ready') {
    return (
      <section className="brief-reader brief-reader--empty">
        <p className="eyebrow">Shared brief</p>
        <h2 className="brief-page__title">We couldn’t find that brief</h2>
        <p className="brief-page__copy">
          The public read-view only shows ready briefs from local mock state in this prototype.
        </p>
        <div className="brief-banner brief-banner--error">
          Empty/error state: no published brief was found for this link.
        </div>
        <div className="brief-form__actions">
          <Link className="button button--secondary" to="/briefs/new">
            Create brief
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
        <p className="brief-reader__summary">{draft.objective}</p>
      </header>

      <section className="brief-reader__section">
        <h2>Audience</h2>
        <p>{draft.audience}</p>
      </section>

      <section className="brief-reader__section">
        <h2>Key points</h2>
        <ul className="brief-reader__list">
          {toPoints(draft.keyPoints).map((point, index) => (
            <li key={`${point}-${index}`}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="brief-reader__section">
        <h2>Next step</h2>
        <p>{draft.cta}</p>
      </section>

      <footer className="brief-reader__footer">
        <span className="brief-reader__meta">
          Prototype note: content is served from local mock storage.
        </span>
      </footer>
    </article>
  );
}