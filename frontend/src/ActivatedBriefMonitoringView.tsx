import React from 'react';
import {
  getBriefDraftStore,
  type MonitoringStage,
  type MonitoringTimelineItem,
} from './lib/briefDraftStore';

function stageTone(stage: MonitoringStage) {
  if (stage === 'live') {
    return {
      badgeBackground: '#e0f2fe',
      badgeColor: '#0c4a6e',
      accent: '#38bdf8',
      helper: 'The brief has been shared and is now available to recipients.',
    };
  }

  if (stage === 'waiting-for-reply') {
    return {
      badgeBackground: '#fef3c7',
      badgeColor: '#92400e',
      accent: '#f59e0b',
      helper: 'Recipients are viewing the brief, but no reply has arrived yet.',
    };
  }

  return {
    badgeBackground: '#dcfce7',
    badgeColor: '#166534',
    accent: '#4ade80',
    helper: 'The first response has arrived and the brief is now in active conversation.',
  };
}

function TimelineItem({
  item,
  isCurrent,
  accent,
}: {
  item: MonitoringTimelineItem;
  isCurrent: boolean;
  accent: string;
}) {
  return (
    <article
      style={{
        display: 'grid',
        gridTemplateColumns: '18px minmax(0, 1fr)',
        gap: 14,
        alignItems: 'start',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 12,
          height: 12,
          borderRadius: 999,
          marginTop: 4,
          background: isCurrent ? accent : '#cbd5e1',
          boxShadow: isCurrent ? `0 0 0 4px ${accent}22` : 'none',
        }}
      />
      <div
        style={{
          paddingBottom: 18,
          borderBottom: '1px solid rgba(148, 163, 184, 0.18)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
            alignItems: 'baseline',
          }}
        >
          <strong style={{ fontSize: 15, color: '#0f172a' }}>{item.label}</strong>
          <span style={{ fontSize: 13, color: '#64748b' }}>{item.timestampLabel}</span>
        </div>
        <p
          style={{
            margin: '8px 0 0',
            color: '#475569',
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          {item.detail}
        </p>
      </div>
    </article>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        background: 'rgba(255,255,255,0.84)',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        borderRadius: 20,
        padding: 22,
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
      }}
    >
      <h2
        style={{
          margin: '0 0 14px',
          fontSize: 16,
          fontWeight: 600,
          color: '#0f172a',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ActivatedBriefMonitoringView({
  onBack,
}: {
  onBack: () => void;
}) {
  const { draft, monitoring } = getBriefDraftStore();

  if (!monitoring) {
    return (
      <main
        style={{
          minHeight: '100vh',
          background:
            'linear-gradient(180deg, #f8fbff 0%, #f3f7f5 48%, #eef4f1 100%)',
          padding: '40px 24px 64px',
          color: '#0f172a',
        }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gap: 20 }}>
          <button
            type="button"
            onClick={onBack}
            style={{
              justifySelf: 'start',
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

          <Panel title="Activated brief monitoring">
            <p style={{ margin: 0, color: '#475569', fontSize: 15, lineHeight: 1.7 }}>
              This brief is shared, but monitoring becomes useful once it reaches a live state.
            </p>
          </Panel>
        </div>
      </main>
    );
  }

  const tone = stageTone(monitoring.stage);

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #f8fbff 0%, #f3f7f5 48%, #eef4f1 100%)',
        padding: '40px 24px 64px',
        color: '#0f172a',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gap: 20 }}>
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
              Activated brief monitoring
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 32,
                lineHeight: 1.1,
                fontWeight: 650,
              }}
            >
              {draft.title}
            </h1>
            <p
              style={{
                margin: 0,
                color: '#475569',
                fontSize: 15,
                lineHeight: 1.7,
              }}
            >
              {draft.summary}
            </p>
          </div>

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
        </div>

        <Panel title="Current state">
          <div style={{ display: 'grid', gap: 16 }}>
            <div
              style={{
                display: 'inline-flex',
                width: 'fit-content',
                alignItems: 'center',
                gap: 10,
                borderRadius: 999,
                padding: '8px 12px',
                background: tone.badgeBackground,
                color: tone.badgeColor,
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
                  background: tone.accent,
                }}
              />
              {monitoring.stageLabel}
            </div>

            <div style={{ color: '#475569', fontSize: 15, lineHeight: 1.7 }}>{tone.helper}</div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Shared</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{monitoring.sharedAtLabel}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Recipients</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{monitoring.recipientSummary}</div>
              </div>
            </div>

            <div
              style={{
                borderLeft: `4px solid ${tone.accent}`,
                padding: '4px 0 4px 14px',
              }}
            >
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Primary signal</div>
              <div style={{ fontSize: 16, lineHeight: 1.6 }}>{monitoring.primarySignal}</div>
            </div>
          </div>
        </Panel>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.45fr) minmax(280px, 1fr)',
            gap: 20,
          }}
        >
          <Panel title="Progression">
            <div style={{ display: 'grid', gap: 18 }}>
              {monitoring.timeline.map((item) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  isCurrent={item.label === monitoring.stageLabel}
                  accent={tone.accent}
                />
              ))}
            </div>
          </Panel>

          <Panel title="Recommended next step">
            <div style={{ display: 'grid', gap: 12 }}>
              {monitoring.guidance.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#f8fafc',
                    borderRadius: 14,
                    padding: 14,
                    border: '1px solid rgba(148, 163, 184, 0.18)',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
                    {item.title}
                  </div>
                  <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </main>
  );
}