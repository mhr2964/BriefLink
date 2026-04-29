import React from 'react';
import { ActivatedBriefMonitoringView } from './ActivatedBriefMonitoringView';
import { ActivatedBriefStatusView } from './ActivatedBriefStatusView';
import { getBriefDraftStore, type MonitoringStage } from './lib/briefDraftStore';

type AppRoute = 'brief' | 'status' | 'monitoring';

const monitoringStageOrder: MonitoringStage[] = [
  'live',
  'waiting-for-reply',
  'first-reply-received',
];

function getMonitoringStageLabel(stage: MonitoringStage): string {
  if (stage === 'live') {
    return 'Live';
  }

  if (stage === 'waiting-for-reply') {
    return 'Waiting for reply';
  }

  return 'First reply received';
}

function BriefHome({
  currentRoute,
  onShareBrief,
  onOpenStatus,
  onOpenMonitoring,
}: {
  currentRoute: AppRoute;
  onShareBrief: () => void;
  onOpenStatus: () => void;
  onOpenMonitoring: () => void;
}) {
  const { draft, monitoring } = getBriefDraftStore();
  const activeStageIndex = monitoring ? monitoringStageOrder.indexOf(monitoring.stage) : -1;

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fcfefe 0%, #f4f8f7 54%, #edf3f1 100%)',
        padding: '40px 24px 64px',
        color: '#0f172a',
      }}
    >
      <div style={{ maxWidth: 920, margin: '0 auto', display: 'grid', gap: 20 }}>
        <section
          style={{
            background: 'rgba(255,255,255,0.84)',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            borderRadius: 20,
            padding: 24,
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
            display: 'grid',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                fontSize: 13,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#64748b',
              }}
            >
              Shared brief
            </div>
            <div style={{ fontSize: 13, color: '#64748b' }}>Current route: {currentRoute}</div>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.1, fontWeight: 650 }}>
              {draft.title}
            </h1>
            <p style={{ margin: 0, color: '#475569', fontSize: 15, lineHeight: 1.7 }}>
              {draft.summary}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 12,
            }}
          >
            <div
              style={{
                background: '#f8fafc',
                borderRadius: 14,
                padding: 16,
                border: '1px solid rgba(148, 163, 184, 0.18)',
              }}
            >
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Audience</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{draft.audience}</div>
            </div>
            <div
              style={{
                background: '#f8fafc',
                borderRadius: 14,
                padding: 16,
                border: '1px solid rgba(148, 163, 184, 0.18)',
              }}
            >
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>
                Monitoring stage
              </div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                {monitoring ? monitoring.stageLabel : 'Not active yet'}
              </div>
            </div>
          </div>

          <div
            style={{
              background: '#f8fafc',
              borderRadius: 16,
              padding: 16,
              border: '1px solid rgba(148, 163, 184, 0.18)',
              display: 'grid',
              gap: 12,
            }}
          >
            <div style={{ fontSize: 13, color: '#64748b' }}>Monitoring progression</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 10,
              }}
            >
              {monitoringStageOrder.map((stage, index) => {
                const isActive = monitoring?.stage === stage;
                const isReached = index <= activeStageIndex;

                return (
                  <div
                    key={stage}
                    style={{
                      borderRadius: 14,
                      padding: 12,
                      border: '1px solid rgba(148, 163, 184, 0.18)',
                      background: isActive
                        ? '#ecfeff'
                        : isReached
                          ? '#f8fafc'
                          : 'rgba(255,255,255,0.8)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        color: '#64748b',
                        marginBottom: 6,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Stage {index + 1}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
                      {getMonitoringStageLabel(stage)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onShareBrief}
              style={{
                border: '1px solid rgba(15, 23, 42, 0.1)',
                background: '#0f172a',
                color: '#ffffff',
                borderRadius: 999,
                padding: '10px 16px',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Open shared brief
            </button>
            <button
              type="button"
              onClick={onOpenStatus}
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
              Open share status
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
              Open reply monitoring
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export function App() {
  const [route, setRoute] = React.useState<AppRoute>('brief');

  if (route === 'status') {
    return (
      <ActivatedBriefStatusView
        onBack={() => setRoute('brief')}
        onOpenMonitoring={() => setRoute('monitoring')}
      />
    );
  }

  if (route === 'monitoring') {
    return <ActivatedBriefMonitoringView onBack={() => setRoute('brief')} />;
  }

  return (
    <BriefHome
      currentRoute={route}
      onShareBrief={() => setRoute('status')}
      onOpenStatus={() => setRoute('status')}
      onOpenMonitoring={() => setRoute('monitoring')}
    />
  );
}