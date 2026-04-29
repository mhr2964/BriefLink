import { Link } from 'react-router-dom';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { adapters } from '../lib/adapters';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatDateTime } from '../lib/format';

export function ItemsPage() {
  const itemsState = useAsyncData(() => adapters.items.listItems(), []);

  if (itemsState.status === 'loading') {
    return (
      <LoadingState
        title="Loading items"
        detail="Fetching the latest mocked item summaries."
      />
    );
  }

  if (itemsState.status === 'error') {
    return <ErrorState detail={itemsState.error ?? undefined} />;
  }

  if (itemsState.status !== 'success') {
    return <LoadingState />;
  }

  if (itemsState.data.length === 0) {
    return (
      <EmptyState
        title="No items available"
        detail="Once the backend exposes item summaries, they will appear here."
      />
    );
  }

  return (
    <section className="page-stack">
      <div>
        <p className="eyebrow">Items</p>
        <h2 className="section-title">Mocked item summaries</h2>
      </div>
      <ul className="item-list">
        {itemsState.data.map((item) => (
          <li key={item.id} className="item-card">
            <div className="item-card__topline">
              <span className={`status-pill status-pill--${item.status}`}>{item.status}</span>
              <span className="muted-text">{formatDateTime(item.updatedAt)}</span>
            </div>
            <h3 className="item-card__title">
              <Link to={`/items/${item.id}`} className="item-card__link">
                {item.title}
              </Link>
            </h3>
            <p className="item-card__subtitle">{item.subtitle}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}