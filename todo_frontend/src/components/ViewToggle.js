import React from 'react';

// PUBLIC_INTERFACE
export default function ViewToggle({ view, onChange }) {
  /** Toggle between list and kanban views. */
  return (
    <div className="view-toggle" role="group" aria-label="Toggle view">
      <button
        className={`btn ${view === 'list' ? 'active' : ''}`}
        onClick={() => onChange('list')}
        aria-pressed={view === 'list'}
      >
        List
      </button>
      <button
        className={`btn ${view === 'kanban' ? 'active' : ''}`}
        onClick={() => onChange('kanban')}
        aria-pressed={view === 'kanban'}
      >
        Kanban
      </button>
    </div>
  );
}
