import type { ReactNode } from 'react';

interface StatePanelProps {
  title: string;
  detail?: string;
  tone?: 'neutral' | 'success' | 'error';
  children?: ReactNode;
}

export function StatePanel({
  title,
  detail,
  tone = 'neutral',
  children,
}: StatePanelProps) {
  return (
    <section className={`state-panel state-panel--${tone}`}>
      <div className="state-panel__content">
        <h2 className="state-panel__title">{title}</h2>
        {detail ? <p className="state-panel__detail">{detail}</p> : null}
        {children}
      </div>
    </section>
  );
}