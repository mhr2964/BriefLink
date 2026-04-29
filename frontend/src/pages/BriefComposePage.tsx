import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildShareUrl, buildSlug, saveDraft } from '../lib/briefDraftStore';

type BriefFormState = {
  companyName: string;
  website: string;
  notes: string;
  goals: string;
  slug: string;
};

type FieldErrors = Partial<Record<keyof BriefFormState, string>>;

const initialState: BriefFormState = {
  companyName: '',
  website: '',
  notes: '',
  goals: '',
  slug: '',
};

function validateWebsite(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function validateForm(values: BriefFormState) {
  const errors: FieldErrors = {};

  if (!values.companyName.trim()) {
    errors.companyName = 'Add the company name you are preparing for.';
  }

  if (!values.website.trim()) {
    errors.website = 'Add the company website URL for the URL-based intake path.';
  } else if (!validateWebsite(values.website.trim())) {
    errors.website = 'Enter a valid http:// or https:// website URL.';
  }

  if (!values.notes.trim()) {
    errors.notes = 'Add operator notes to capture the available source context.';
  }

  if (!values.goals.trim()) {
    errors.goals = 'Add the prep goal for this generated brief.';
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
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success'>('idle');

  const slugPreview = useMemo(() => {
    const nextSlug = formState.slug.trim() || buildSlug(formState.companyName);
    return nextSlug ? buildShareUrl(nextSlug) : 'Add a company name or custom slug to preview';
  }, [formState.slug, formState.companyName]);

  function updateField(field: keyof BriefFormState, value: string) {
    setFormState((current) => {
      const nextState = { ...current, [field]: value };

      if (field === 'companyName' && !slugEdited) {
        nextState.slug = buildSlug(value);
      }

      return nextState;
    });

    setFieldErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleCompanyNameChange(event: ChangeEvent<HTMLInputElement>) {
    updateField('companyName', event.target.value);
  }

  function handleSlugChange(event: ChangeEvent<HTMLInputElement>) {
    setSlugEdited(true);
    updateField('slug', buildSlug(event.target.value));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState('loading');

    const normalizedState = {
      companyName: formState.companyName.trim(),
      website: formState.website.trim(),
      notes: formState.notes.trim(),
      goals: formState.goals.trim(),
      slug: buildSlug(formState.slug || formState.companyName),
    };

    const errors = validateForm(normalizedState);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmissionState('idle');
      return;
    }

    const savedDraft = saveDraft(normalizedState);
    setSubmissionState('success');
    navigate(`/briefs/${savedDraft.slug}/success`);
  }

  const hasValidationErrors = Object.keys(fieldErrors).length > 0;

  return (
    <section className="brief-page brief-page--compose">
      <div className="brief-page__intro">
        <p className="eyebrow">Ingestion</p>
        <h2 className="brief-page__title">Create an account brief</h2>
        <p className="brief-page__copy">
          This MVP shell supports a low-friction intake path: company URL plus manual operator
          notes. File upload and external system sync are intentionally excluded because they are
          not supported by visible artifacts.
        </p>
      </div>

      <div className="ingestion-mode-grid">
        <div className="brief-card ingestion-mode ingestion-mode--active">
          <span className="brief-card__label">Supported now</span>
          <h3>URL + manual notes</h3>
          <p className="brief-page__copy">
            Capture a company website, working notes, and prep goals, then generate a readable
            account brief.
          </p>
        </div>
        <div className="brief-card ingestion-mode">
          <span className="brief-card__label">Not in this MVP shell</span>
          <h3>Upload or sync sources</h3>
          <p className="brief-page__copy">
            Automated ingestion from scattered systems is not shown in the current contract-backed
            prototype.
          </p>
        </div>
      </div>

      {submissionState === 'loading' ? (
        <div className="brief-banner brief-banner--info" aria-live="polite">
          Generating your brief from the provided source inputs…
        </div>
      ) : null}

      {submissionState === 'success' ? (
        <div className="brief-banner brief-banner--info" aria-live="polite">
          Brief generated successfully. Opening the readable brief view…
        </div>
      ) : null}

      {hasValidationErrors ? (
        <div className="brief-banner brief-banner--error" role="alert">
          Please resolve the highlighted fields before continuing.
        </div>
      ) : null}

      <form className="brief-form" onSubmit={handleSubmit} noValidate>
        <label className="brief-field">
          <span className="brief-field__label">Company name</span>
          <input
            className="brief-field__input"
            name="companyName"
            value={formState.companyName}
            onChange={handleCompanyNameChange}
            placeholder="Northstar Health"
            aria-invalid={fieldErrors.companyName ? 'true' : 'false'}
          />
          {fieldErrors.companyName ? (
            <span className="brief-field__error">{fieldErrors.companyName}</span>
          ) : null}
        </label>

        <label className="brief-field">
          <span className="brief-field__label">Company website</span>
          <input
            className="brief-field__input"
            name="website"
            value={formState.website}
            onChange={(event) => updateField('website', event.target.value)}
            placeholder="https://northstarhealth.example"
            aria-invalid={fieldErrors.website ? 'true' : 'false'}
          />
          {fieldErrors.website ? (
            <span className="brief-field__error">{fieldErrors.website}</span>
          ) : null}
        </label>

        <label className="brief-field">
          <span className="brief-field__label">Operator notes</span>
          <textarea
            className="brief-field__textarea"
            name="notes"
            value={formState.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder="Summarize current company context, available proof, timing, stakeholders, and anything that matters before outreach or a meeting."
            rows={6}
            aria-invalid={fieldErrors.notes ? 'true' : 'false'}
          />
          {fieldErrors.notes ? <span className="brief-field__error">{fieldErrors.notes}</span> : null}
        </label>

        <label className="brief-field">
          <span className="brief-field__label">Prep goal</span>
          <textarea
            className="brief-field__textarea"
            name="goals"
            value={formState.goals}
            onChange={(event) => updateField('goals', event.target.value)}
            placeholder="Prepare the team for the first partner call and highlight the biggest concerns to address before sharing externally."
            rows={4}
            aria-invalid={fieldErrors.goals ? 'true' : 'false'}
          />
          {fieldErrors.goals ? <span className="brief-field__error">{fieldErrors.goals}</span> : null}
        </label>

        <label className="brief-field">
          <span className="brief-field__label">Share link slug</span>
          <input
            className="brief-field__input"
            name="slug"
            value={formState.slug}
            onChange={handleSlugChange}
            placeholder="northstar-health-brief"
            aria-invalid={fieldErrors.slug ? 'true' : 'false'}
          />
          <span className="brief-field__hint">Preview: {slugPreview}</span>
          {fieldErrors.slug ? <span className="brief-field__error">{fieldErrors.slug}</span> : null}
        </label>

        <div className="brief-form__actions">
          <button className="button button--primary" type="submit">
            Generate brief
          </button>
        </div>
      </form>
    </section>
  );
}