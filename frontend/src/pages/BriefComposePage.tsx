import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildShareUrl, buildSlug, saveDraft } from '../lib/briefDraftStore';

type BriefFormState = {
  title: string;
  audience: string;
  objective: string;
  keyPoints: string;
  cta: string;
  slug: string;
};

type FieldErrors = Partial<Record<keyof BriefFormState, string>>;

const initialState: BriefFormState = {
  title: '',
  audience: '',
  objective: '',
  keyPoints: '',
  cta: '',
  slug: '',
};

function validateForm(values: BriefFormState) {
  const errors: FieldErrors = {};

  if (!values.title.trim()) {
    errors.title = 'Add a concise title so the brief has a clear anchor.';
  }

  if (!values.audience.trim()) {
    errors.audience = 'Name the audience to keep the message grounded.';
  }

  if (!values.objective.trim()) {
    errors.objective = 'Add the primary objective for this brief.';
  }

  if (!values.keyPoints.trim()) {
    errors.keyPoints = 'Capture at least one key point to share.';
  }

  if (!values.cta.trim()) {
    errors.cta = 'Add a next step so readers know what to do.';
  }

  if (!values.slug.trim()) {
    errors.slug = 'Choose a short link slug.';
  } else if (!/^[a-z0-9-]+$/.test(buildSlug(values.slug))) {
    errors.slug = 'Use lowercase letters, numbers, and hyphens only.';
  }

  return errors;
}

export function BriefComposePage() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<BriefFormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [slugEdited, setSlugEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slugPreview = useMemo(() => {
    const nextSlug = formState.slug.trim() || buildSlug(formState.title);
    return buildShareUrl(nextSlug);
  }, [formState.slug, formState.title]);

  function updateField(field: keyof BriefFormState, value: string) {
    setFormState((current) => {
      const nextState = { ...current, [field]: value };

      if (field === 'title' && !slugEdited) {
        nextState.slug = buildSlug(value);
      }

      return nextState;
    });

    setFieldErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    updateField('title', event.target.value);
  }

  function handleSlugChange(event: ChangeEvent<HTMLInputElement>) {
    setSlugEdited(true);
    updateField('slug', buildSlug(event.target.value));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const normalizedState = {
      ...formState,
      title: formState.title.trim(),
      audience: formState.audience.trim(),
      objective: formState.objective.trim(),
      keyPoints: formState.keyPoints.trim(),
      cta: formState.cta.trim(),
      slug: buildSlug(formState.slug || formState.title),
    };

    const errors = validateForm(normalizedState);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    const savedDraft = saveDraft({
      ...normalizedState,
      status: 'draft',
    });

    navigate(`/briefs/${savedDraft.slug}/confirm`);
  }

  const hasValidationErrors = Object.keys(fieldErrors).length > 0;

  return (
    <section className="brief-page brief-page--compose">
      <div className="brief-page__intro">
        <p className="eyebrow">Compose</p>
        <h2 className="brief-page__title">Create brief</h2>
        <p className="brief-page__copy">
          Gather the essentials now. The prototype keeps drafts in local browser storage until
          backend persistence is connected.
        </p>
      </div>

      {isSubmitting ? (
        <div className="brief-banner brief-banner--info" aria-live="polite">
          Saving your brief draft…
        </div>
      ) : null}

      {hasValidationErrors ? (
        <div className="brief-banner brief-banner--error" role="alert">
          Please resolve the highlighted fields before continuing.
        </div>
      ) : null}

      <form className="brief-form" onSubmit={handleSubmit} noValidate>
        <label className="brief-field">
          <span className="brief-field__label">Title</span>
          <input
            className="brief-field__input"
            name="title"
            value={formState.title}
            onChange={handleTitleChange}
            placeholder="Q2 launch brief"
            aria-invalid={fieldErrors.title ? 'true' : 'false'}
          />
          {fieldErrors.title ? <span className="brief-field__error">{fieldErrors.title}</span> : null}
        </label>

        <label className="brief-field">
          <span className="brief-field__label">Audience</span>
          <input
            className="brief-field__input"
            name="audience"
            value={formState.audience}
            onChange={(event) => updateField('audience', event.target.value)}
            placeholder="Sales leadership"
            aria-invalid={fieldErrors.audience ? 'true' : 'false'}
          />
          {fieldErrors.audience ? (
            <span className="brief-field__error">{fieldErrors.audience}</span>
          ) : null}
        </label>

        <label className="brief-field">
          <span className="brief-field__label">Objective</span>
          <textarea
            className="brief-field__textarea"
            name="objective"
            value={formState.objective}
            onChange={(event) => updateField('objective', event.target.value)}
            placeholder="Align on the message, timing, and approval path."
            rows={4}
            aria-invalid={fieldErrors.objective ? 'true' : 'false'}
          />
          {fieldErrors.objective ? (
            <span className="brief-field__error">{fieldErrors.objective}</span>
          ) : null}
        </label>

        <label className="brief-field">
          <span className="brief-field__label">Key points</span>
          <textarea
            className="brief-field__textarea"
            name="keyPoints"
            value={formState.keyPoints}
            onChange={(event) => updateField('keyPoints', event.target.value)}
            placeholder={'• Launch date\n• Target segment\n• Risks to watch'}
            rows={5}
            aria-invalid={fieldErrors.keyPoints ? 'true' : 'false'}
          />
          {fieldErrors.keyPoints ? (
            <span className="brief-field__error">{fieldErrors.keyPoints}</span>
          ) : null}
        </label>

        <label className="brief-field">
          <span className="brief-field__label">Call to action</span>
          <input
            className="brief-field__input"
            name="cta"
            value={formState.cta}
            onChange={(event) => updateField('cta', event.target.value)}
            placeholder="Review and confirm by Thursday"
            aria-invalid={fieldErrors.cta ? 'true' : 'false'}
          />
          {fieldErrors.cta ? <span className="brief-field__error">{fieldErrors.cta}</span> : null}
        </label>

        <label className="brief-field">
          <span className="brief-field__label">Link slug</span>
          <input
            className="brief-field__input"
            name="slug"
            value={formState.slug}
            onChange={handleSlugChange}
            placeholder="q2-launch-brief"
            aria-invalid={fieldErrors.slug ? 'true' : 'false'}
          />
          <span className="brief-field__hint">Preview: {slugPreview}</span>
          {fieldErrors.slug ? <span className="brief-field__error">{fieldErrors.slug}</span> : null}
        </label>

        <div className="brief-form__actions">
          <button className="button button--primary" type="submit">
            Create brief
          </button>
        </div>
      </form>
    </section>
  );
}