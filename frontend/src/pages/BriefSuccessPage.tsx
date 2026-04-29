import { Link, useParams } from 'react-router-dom';
import { getDraft } from '../lib/briefDraftStore';

export function BriefSuccessPage() {
  const { slug = '' } = useParams();
  const draft = getDraft(slug);

  if (!draft) {
    return (
      <section className="brief-page brief-page--empty">
        <p className="eyebrow">Share</p>
        <h2 className="brief-page__title">We couldn’t find that brief</h2>
        <p className="brief-page__copy">
          This prototype uses local mock state, so missing data and unknown links return a generic
          recovery message.
        </p>
        <div className="brief-banner brief-banner--error">
          Empty/error state: no ready brief was found for this share screen.
        </div>
        <div className="brief-form__actions">
          <Link className="button button--primary" to="/briefs/new">
            Create brief
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="brief-page brief-page--success">
      <div className="success-panel">
        <p className="eyebrow">Ready</p>
        <h2 className="brief-page__title">Your brief is ready to share</h2>
        <p className="brief-page__copy">
          This is the primary share state in the frontend-only prototype. Copy-to-clipboard,
          analytics emission, and backend publish behavior remain integration seams.
        </p>

        <div className="success-panel__linkbox">
          <span className="success-panel__linklabel">Share link</span>
          <a href={draft.shareUrl} className="success-panel__link">
            {draft.shareUrl}
          </a>
        </div>

        <div className="brief-banner brief-banner--info">
          Prototype note: activation maps to this share-ready state after confirm/share.
        </div>

        <div className="brief-form__actions">
          <button className="button button--primary" type="button">
            Copy link
          </button>
          <Link className="button button--secondary" to={`/b/${draft.slug}`}>
            Open brief
          </Link>
        </div>
      </div>
    </section>
  );
}