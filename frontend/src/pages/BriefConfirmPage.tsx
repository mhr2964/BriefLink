import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDraft, markDraftReady } from '../lib/briefDraftStore';

function renderBulletList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item, index) => <li key={`${item}-${index}`}>{item.replace(/^[•*-]\s*/, '')}</li>);
}

export function BriefConfirmPage() {
  const navigate = useNavigate();
  const { slug = '' } = useParams();
  const draft = getDraft(slug);

  if (!draft) {
    return (
      <section className="brief-page brief-page--empty">
        <p className="eyebrow">Review</p>
        <h2 className="brief-page__title">We couldn’t find that brief</h2>
        <p className="brief-page__copy">
          This prototype uses local mock state, so missing data and unknown links return a generic
          recovery message.
        </p>
        <div className="brief-banner brief-banner--error">
          Empty/error state: no saved brief was found for this confirmation link.
        </div>
        <div className="brief-form__actions">
          <Link className="button button--primary" to="/briefs/new">
            Create brief
          </Link>
        </div>
      </section>
    );
  }

  function handleConfirmShare() {
    const savedDraft = markDraftReady(slug);

    if (!savedDraft) {
      return;
    }

    navigate(`/briefs/${savedDraft.slug}/success`);
  }

  return (
    <section className="brief-page brief-page--confirm">
      <div className="brief-page__intro">
        <p className="eyebrow">Review</p>
        <h2 className="brief-page__title">Confirm and share</h2>
        <p className="brief-page__copy">
          Review the brief once, then confirm to move into the share state. Backend publish logic is
          still represented with local mock state in this prototype.
        </p>
      </div>

      <div className="brief-card">
        <div className="brief-card__section">
          <span className="brief-card__label">Title</span>
          <h3>{draft.title}</h3>
        </div>

        <div className="brief-card__grid">
          <div className="brief-card__section">
            <span className="brief-card__label">Audience</span>
            <p>{draft.audience}</p>
          </div>
          <div className="brief-card__section">
            <span className="brief-card__label">Call to action</span>
            <p>{draft.cta}</p>
          </div>
        </div>

        <div className="brief-card__section">
          <span className="brief-card__label">Objective</span>
          <p>{draft.objective}</p>
        </div>

        <div className="brief-card__section">
          <span className="brief-card__label">Key points</span>
          <ul className="brief-card__list">{renderBulletList(draft.keyPoints)}</ul>
        </div>

        <div className="brief-card__section">
          <span className="brief-card__label">Link preview</span>
          <p>{draft.shareUrl}</p>
        </div>
      </div>

      <div className="brief-form__actions">
        <Link className="button button--secondary" to="/briefs/new">
          Create brief
        </Link>
        <button className="button button--primary" type="button" onClick={handleConfirmShare}>
          Confirm and share
        </button>
      </div>
    </section>
  );
}