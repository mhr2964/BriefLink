import { useEffect, useState } from 'react';

type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: string | null;
}

const initialState = {
  status: 'idle',
  data: null,
  error: null,
} as const;

export function useAsyncData<T>(load: () => Promise<T>, deps: readonly unknown[]) {
  const [state, setState] = useState<AsyncState<T>>(initialState);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    async function run() {
      setState({ status: 'loading', data: null, error: null });

      try {
        const data = await load();

        if (!controller.signal.aborted && isActive) {
          setState({ status: 'success', data, error: null });
        }
      } catch (error) {
        if (!controller.signal.aborted && isActive) {
          setState({
            status: 'error',
            data: null,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    }

    void run();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, deps);

  return state;
}