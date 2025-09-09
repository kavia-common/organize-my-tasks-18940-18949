import React from 'react';

// PUBLIC_INTERFACE
export default function TodoList({
  items,
  loading,
  error,
  selectedIds,
  onToggleSelect,
  onToggleAll,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  /** Renders a table-like list of todos with selection and row actions. */
  if (loading) return <div className="status info">Loading tasks...</div>;
  if (error) return <div className="status error" role="alert">Error: {error.message || String(error)}</div>;
  if (!items || items.length === 0) return <div className="status empty">No tasks found</div>;

  const allSelected = items.length > 0 && items.every((t) => selectedIds.has(t.id));

  return (
    <div className="todo-list" role="table" aria-label="Todo list">
      <div className="todo-row head" role="row">
        <div className="cell select" role="columnheader">
          <input
            type="checkbox"
            aria-label="Select all"
            checked={allSelected}
            onChange={(e) => onToggleAll(e.target.checked)}
          />
        </div>
        <div className="cell title" role="columnheader">Title</div>
        <div className="cell status" role="columnheader">Status</div>
        <div className="cell due" role="columnheader">Due</div>
        <div className="cell priority" role="columnheader">Priority</div>
        <div className="cell actions" role="columnheader">Actions</div>
      </div>
      {items.map((t) => {
        const isCompleted = t.status === 'completed';
        return (
          <div className="todo-row" role="row" key={t.id}>
            <div className="cell select" role="cell">
              <input
                type="checkbox"
                aria-label={`Select ${t.title}`}
                checked={selectedIds.has(t.id)}
                onChange={(e) => onToggleSelect(t.id, e.target.checked)}
              />
            </div>
            <div className={`cell title ${isCompleted ? 'muted strike' : ''}`} role="cell">{t.title}</div>
            <div className="cell status" role="cell">{t.status}</div>
            <div className="cell due" role="cell">{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '-'}</div>
            <div className="cell priority" role="cell">{t.priority || 'normal'}</div>
            <div className="cell actions" role="cell">
              <button className="btn small" onClick={() => onToggleComplete(t)}>
                {isCompleted ? 'Undo' : 'Done'}
              </button>
              <button className="btn small" onClick={() => onEdit(t)}>Edit</button>
              <button className="btn small danger" onClick={() => onDelete(t)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
