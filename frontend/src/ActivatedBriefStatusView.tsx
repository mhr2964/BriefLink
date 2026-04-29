import React from 'react';
import { getRuntimeConfig } from './config/runtimeConfig';
import { getBriefDraftStore, type MonitoringStage } from './lib/briefDraftStore';

type StatusAreaState = 'ready' | 'loading' | 'empty' | 'error';

const defaultStatusAreaState: StatusAreaState = 'ready';
const retryStatusAreaState: StatusAreaState = 'ready';

function getReplyModuleContent(stage: MonitoringStage): {
  title: string;
  detail: string;
  badgeBackground: string;
  badgeColor: string;
  accent: string;
} {
  if (stage === 'first-reply-received') {
    return {
      title: 'First reply received',
      detail:
        'A first response has arrived, so the brief has moved from quiet distribution into active conversation.',
      badgeBackground: '#dcfce7',
      badgeColor: '#166534',
      accent: '#4ade80',
    };
  }

  return {
    title: 'Waiting for reply',
    detail:
      'Recipients have the brief and early attention is visible, but no one has replied yet.',
    badgeBackground: '#fef3c7',
    badgeColor: '#92400e',
    accent: '#f59e0b',
  };
}

function SurfaceCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        background: 'rgba(255,255,255,0.86)',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        borderRadius: 20,
        padding: 22,
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 14,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function ShareLinkPanel({
  shareLink,
  sharePath,
  copied,
  onCopyLink,
}: {
  shareLink: string | null;
  sharePath: string;
  copied: boolean;
  onCopyLink: () => void;
}) {
  const liveLinkLabel = shareLink ?? sharePath;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'grid', gap: 6 }}>
        <div style={{ fontSize: 13, color: '#64748b' }}>Live link</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', wordBreak: 'break-word' }}>
          {liveLinkLabel}
        </div>
        <div style={{ fontSize: 13, color: copied ? '#166534' : '#64748b' }}>
          {copied
            ? 'Link copied to clipboard'
            : shareLink
              ? 'Share the active brief link without reopening setup'
              : 'Set VITE_APP_ORIGIN to enable full hosted share-link copying'}
        </div>
      </div>

      <button
        type="button"
        onClick={onCopyLink}
        disabled={!shareLink}
        style={{
          borderRadius: 999,
          border: '1px solid rgba(15, 23, 42, 0.1)',
          background: shareLink ? '#0f172a' : '#cbd5e1',
          color: '#ffffff',
          padding: '10px 16px',
          fontSize: 14,
          cursor: shareLink ? 'pointer' : 'not-allowed',
        }}
      >
        Copy link
      </button>
    </div>
  );
}

function LiveConfirmationCard({
  statusLabel,
  sharedAtLabel,
  recipientSummary,
}: {
  statusLabel: string;
  sharedAtLabel: string;
  recipientSummary: string;
}) {
  return (
    <SurfaceCard title="Activated status">
      <div style={{ display: 'grid', gap: 14 }}>
        <div
          style={{
            display: 'inline-flex',
            width: 'fit-content',
            alignItems: 'center',
            gap: 10,
            borderRadius: 999,
            padding: '8px 12px',
            background: '#e0f2fe',
            color: '#0c4a6e',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: '#38bdf8',
            }}
          />
          {statusLabel}
        </div>

        <p style={{ margin: 0, color: '#475569', fontSize: 15, lineHeight: 1.7 }}>
          Your share link is active and recipients can open the brief now. This live confirmation
          stays visible after sharing so activation remains obvious without returning to setup.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 14,
          }}
        >
          <div
            style={{
              background: '#f8fafc',
              borderRadius: 14,
              padding: 14,
              border: '1px solid rgba(148, 163, 184, 0.18)',
            }}
          >
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Shared</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{sharedAtLabel}</div>
          </div>

          <div
            style={{
              background: '#f8fafc',
              borderRadius: 14,
              padding: 14,
              border: '1px solid rgba(148, 163, 184, 0.18)',
            }}
          >
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Recipients</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{recipientSummary}</div>
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}

function ReplyModuleCard({
  stage,
  primarySignal,
}: {
  stage: MonitoringStage;
  primarySignal: string;
}) {
  const replyContent = getReplyModuleContent(stage);

  return (
    <SurfaceCard title="Reply status">
      <div style={{ display: 'grid', gap: 14 }}>
        <div
          style={{
            display: 'inline-flex',
            width: 'fit-content',
            alignItems: 'center',
            gap: 10,
            borderRadius: 999,
            padding: '8px 12px',
            background: replyContent.badgeBackground,
            color: replyContent.badgeColor,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: replyContent.accent,
            }}
          />
          {replyContent.title}
        </div>

        <p style={{ margin: 0, color: '#475569', fontSize: 15, lineHeight: 1.7 }}>
          {replyContent.detail}
        </p>

        <div
          style={{
            borderLeft: `4px solid ${replyContent.accent}`,
            padding: '4px 0 4px 14px',
          }}
        >
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Signal</div>
          <div style={{ fontSize: 15, color: '#0f172a', lineHeight: 1.6 }}>{primarySignal}</div>
        </div>
      </div>
    </SurfaceCard>
  );
}

function LoadingStatusCard() {
  return (
    <SurfaceCard title="Activated status">
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ width: 160, height: 18, borderRadius: 999, background: '#e2e8f0' }} />
        <div style={{ width: '94%', height: 16, borderRadius: 999, background: '#e2e8f0' }} />
        <div style={{ width: '72%', height: 16, borderRadius: 999, background: '#e2e8f0' }} />
      </div>
    </SurfaceCard>
  );
}

function EmptyStatusCard() {
  return (
    <SurfaceCard title="Activated status">
      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>No live status yet</div>
        <p style={{ margin: 0, color: '#475569', fontSize: 15, lineHeight: 1.7 }}>
          The brief has been prepared, but activation details have not been recorded in this status
          area yet.
        </p>
      </div>
    </SurfaceCard>
  );
}

function ErrorStatusCard({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <SurfaceCard
      title="Activated status"
      action={
        <button
          type="button"
          onClick={onRetry}
          style={{
            borderRadius: 999,
            border: '1px solid rgba(15, 23, 42, 0.1)',
            background: '#ffffff',
            color: '#0f172a',
            padding: '8px 12px',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      }
    >
      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>
          Status temporarily unavailable
        </div>
        <p style={{ margin: 0, color: '#475569', fontSize: 15, lineHeight: 1.7 }}>
          We could not load the activated brief status just now. Retry to restore the live
          confirmation and reply details.
        </p>
      </div>
    </SurfaceCard>
  );
}

function StatusArea({
  state,
  onRetry,
}: {
  state: StatusAreaState;
  onRetry: () => void;
}) {
  const { monitoring } = getBriefDraftStore();

  if (state === 'loading') {
    return <LoadingStatusCard />;
  }

  if (state === 'empty') {
    return <EmptyStatusCard />;
  }

  if (state === 'error') {
    return <ErrorStatusCard onRetry={onRetry} />;
  }

  if (!monitoring) {
    return <EmptyStatusCard />;
  }

  const replyStage: MonitoringStage =
    monitoring.stage === 'first-reply-received' ? 'first-reply-received' : 'waiting-for-reply';

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <LiveConfirmationCard
        statusLabel={monitoring.activatedStatusLabel}
        sharedAtLabel={monitoring.sharedAtLabel}
        recipientSummary={monitoring.recipientSummary}
      />
      <ReplyModuleCard stage={replyStage} primarySignal={monitoring.primarySignal} />
    </div>
  );
}

export function ActivatedBriefStatusView({
  onBack,
  onOpenMonitoring,
}: {
  onBack: () => void;
  onOpenMonitoring: () => void;
}) {
  const { draft } = getBriefDraftStore();
  const [copied, setCopied] = React.useState(false);
  const [statusAreaState, setStatusAreaState] =
    React.useState<StatusAreaState>(defaultStatusAreaState);

  const { appOrigin } = getRuntimeConfig();
  const sharePath = `/brief/${draft.id}`;
  const shareLink = appOrigin ? `${appOrigin}${sharePath}` : null;

  const handleCopyLink = async () => {
    if (!shareLink) {
      setCopied(false);
      return;
    }

    const clipboard = globalThis.navigator?.clipboard;

    if (!clipboard) {
      setCopied(false);
      return;
    }

    await clipboard.writeText(shareLink);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f9fcfb 0%, #f1f7f4 56%, #edf3f1 100%)',
        padding: '40px 24px 64px',
        color: '#0f172a',
      }}
    >
      <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gap: 20 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'grid', gap: 10, maxWidth: 720 }}>
            <div
              style={{
                fontSize: 13,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#64748b',
              }}
            >
              Activated brief status
            </div>
            <h1 style={{ margin: 0, fontSize: 32, lineHeight: 1.1, fontWeight: 650 }}>
              {draft.title}
            </h1>
            <p style={{ margin: 0, color: '#475569', fontSize: 15, lineHeight: 1.7 }}>
              The brief is shared. Use this calm status view to confirm activation, copy the live
              link, and see whether replies have started.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onBack}
              style={{
                border: '1px solid rgba(15, 23, 42, 0.1)',
                background: 'rgba(255,255,255,0.86)',
                color: '#0f172a',
                borderRadius: 999,
                padding: '10px 16px',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Back to brief
            </button>
            <button
              type="button"
              onClick={onOpenMonitoring}
              style={{
                border: '1px solid rgba(15, 23, 42, 0.1)',
                background: '#ffffff',
                color: '#0f172a',
                borderRadius: 999,
                padding: '10px 16px',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Open monitoring
            </button>
          </div>
        </div>

        <SurfaceCard title="Post-share controls">
          <ShareLinkPanel
            shareLink={shareLink}
            sharePath={sharePath}
            copied={copied}
            onCopyLink={handleCopyLink}
          />
        </SurfaceCard>

        <StatusArea
          state={statusAreaState}
          onRetry={() => setStatusAreaState(retryStatusAreaState)}
        />
      </div>
    </main>
  );
}