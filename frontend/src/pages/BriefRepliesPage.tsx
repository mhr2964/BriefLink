import { FormEvent, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDraft, getPrototypeSignals, submitFirstReply } from '../lib/briefDraftStore';

const INITIAL_REPLY_FORM = {
  fromName: '',
  fromRole: '',
  message: '',
};

export function BriefRepliesPage() {
  const { slug = '' } = useParams();
  const [replyDraft, setReplyDraft] = useState(INITIAL_REPLY_FORM);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackTone, setFeedbackTone] = useState<'info' | 'error'>('info');
  const [refreshKey, setRefreshKey] = useState(0);

  const draft = useMemo(() => getDraft(slug), [slug, refreshKey]);

  if (!draft || draft.status !== 'ready') {
    return (
      <section className="brief-page brief-page--empty">
        <p className="eyebrow">Replies</p>
        <h2 className="brief-page__title">We couldn’t load this reply view</h2>
        <p className="brief-page__copy">
          This prototype uses local mock state, so missing data and unknown links return a generic
          recovery message.
        </p>
        <div className="brief-banner brief-banner--error">
          Empty/error state: no ready brief reply screen was found.
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
  const firstReply = signals.firstReply;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = submitFirstReply(draft.slug, replyDraft);

    if (!result.ok) {
      setFeedbackTone('error');
      setFeedbackMessage(result.error);
      return;
    }

    setFeedbackTone('info');
    setFeedbackMessage('First reply received and saved in this prototype.');
    setReplyDraft(INITIAL_REPLY_FORM);
    setRefreshKey((currentValue) => currentValue + 1);
  }

  return (
    <section className="brief-page brief-page--success">
      <div className="success-panel">
        <p className="eyebrow">Replies</p>
        <h2 className="brief-page__title">First reply visibility</h2>
        <p className="brief-page__copy">
          This additive creator view shows the current reply state and lets you submit the first
          prototype reply.
        </p>

        {feedbackMessage ? (
          <div
            className={`brief-banner ${feedbackTone === 'error' ? 'brief-banner--error' : 'brief-banner--info'}`}
          >
            {feedbackMessage}
          </div>
        ) : null}

        {firstReply ? (
          <>
            <div className="success-panel__linkbox">
              <span className="success-panel__linklabel">First reply from</span>
              <span className="success-panel__link">
                {firstReply.fromName} · {firstReply.fromRole}
              </span>
            </div>
            <div className="brief-banner brief-banner--info">
              Received at: {new Date(firstReply.receivedAt).toLocaleString()}
            </div>
            <p className="brief-page__copy">“{firstReply.message}”</p>
          </>
        ) : (
          <div className="brief-banner brief-banner--info">
            No reply has been received yet in this prototype.
          </div>
        )}

        {!firstReply ? (
          <form className="brief-form" onSubmit={handleSubmit}>
            <label className="brief-form__field">
              <span>Name</span>
              <input
                value={replyDraft.fromName}
                onChange={(event) =>
                  setReplyDraft((currentValue) => ({
                    ...currentValue,
                    fromName: event.target.value,
                  }))
                }
              />
            </label>

            <label className="brief-form__field">
              <span>Role</span>
              <input
                value={replyDraft.fromRole}
                onChange={(event) =>
                  setReplyDraft((currentValue) => ({
                    ...currentValue,
                    fromRole: event.target.value,
                  }))
                }
              />
            </label>

            <label className="brief-form__field">
              <span>Reply</span>
              <textarea
                rows={4}
                value={replyDraft.message}
                onChange={(event) =>
                  setReplyDraft((currentValue) => ({
                    ...currentValue,
                    message: event.target.value,
                  }))
                }
              />
            </label>

            <div className="brief-form__actions">
              <button className="button button--primary" type="submit">
                Save first reply
              </button>
            </div>
          </form>
        ) : null}

        <div className="brief-form__actions">
          <Link className="button button--secondary" to={`/briefs/${draft.slug}/status`}>
            Back to status
          </Link>
          <Link className="button button--secondary" to={`/briefs/${draft.slug}/success`}>
            Back to share state
          </Link>
        </div>
      </div>
    </section>
  );
}