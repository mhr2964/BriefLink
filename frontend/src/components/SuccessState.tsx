import type { ReactNode } from 'react';
import { StatePanel } from './StatePanel';

interface SuccessStateProps {
  title: string;
  detail?: string;
  children?: ReactNode;
}

export function SuccessState({ title, detail, children }: SuccessStateProps) {
  return (
    <StatePanel title={title} detail={detail} tone="success">
      {children}
    </StatePanel>
  );
}