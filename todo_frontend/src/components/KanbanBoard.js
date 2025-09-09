import React from 'react';

const columns = [
  { key: 'open', label: 'Open' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
];

// PUBLIC_INTERFACE
export default function KanbanBoard({ items, loading, error, onEdit, onToggleComplete }) {
  /** Simple Kanban board grouped by status. */
  if (loading) return <div className="status info">Loading tasks...</div>;
  if (error) return <div className="status error" role="alert">Error: {error.message || String(error)}</div>;
  if (!items || items.length === 0) return <div className="status empty">No tasks found</div>;

  const groups = columns.map((c) => ({ ...c, items: items.filter((t) => t.status === c.key) }));

  return (
    <div className="kanban" aria-label="Kanban board">
      {groups.map((col) => (
        <section className="kanban-col" key={col.key} aria-label={col.label}>
          <h3>{col.label}</h3>
          <div className="kanban-cards">
            {col.items.map((t) => {
              const isCompleted = t.status === 'completed';
              return (
                <article className="card" key={t.id}>
                  <header className="card-title">
                    <span className={isCompleted ? 'muted strike' : ''}>{t.title}</span>
                  </header>
                  {t.description ? <p className="card-desc">{t.description}</p> : null}
                  <footer className="card-actions">
                    <button className="btn small" onClick={() => onToggleComplete(t)}>
                      {isCompleted ? 'Undo' : 'Done'}
                    </button>
                    <button className="btn small" onClick={() => onEdit(t)}>Edit</button>
                  </footer>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
