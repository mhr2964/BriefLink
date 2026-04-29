import { Link, useParams } from 'react-router-dom';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { SuccessState } from '../components/SuccessState';
import { adapters } from '../lib/adapters';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatDateTime } from '../lib/format';

export function ItemDetailPage() {
  const { itemId = '' } = useParams();
  const itemState = useAsyncData(() => adapters.items.getItem(itemId), [itemId]);

  if (itemState.status === 'loading') {
    return (
      <LoadingState
        title="Loading item detail"
        detail="Retrieving mocked detail data for this route."
      />
    );
  }

  if (itemState.status === 'error') {
    return <ErrorState detail={itemState.error ?? undefined} />;
  }

  if (itemState.status !== 'success') {
    return <LoadingState />;
  }

  const item = itemState.data;

  return (
    <div className="page-stack">
      <Link to="/items" className="back-link">
        ← Back to items
      </Link>
      <SuccessState title={item.title} detail={item.subtitle}>
        <dl className="data-grid">
          <div>
            <dt>Status</dt>
            <dd>{item.status}</dd>
          </div>
          <div>
            <dt>Updated</dt>
            <dd>{formatDateTime(item.updatedAt)}</dd>
          </div>
          <div className="data-grid__full">
            <dt>Description</dt>
            <dd>{item.description}</dd>
          </div>
        </dl>
      </SuccessState>
    </div>
  );
}