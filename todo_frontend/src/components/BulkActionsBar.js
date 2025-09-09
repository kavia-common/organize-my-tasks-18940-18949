import React from 'react';

// PUBLIC_INTERFACE
export default function BulkActionsBar({ selectedCount, onComplete, onIncomplete, onDelete, onClearSelection }) {
  /** A toolbar shown when items are selected that offers bulk actions. */
  if (selectedCount <= 0) return null;
  return (
    <div className="bulk-actions" role="region" aria-label="Bulk actions">
      <span>{selectedCount} selected</span>
      <div className="spacer" />
      <button className="btn" onClick={onComplete}>Mark Completed</button>
      <button className="btn" onClick={onIncomplete}>Mark Incomplete</button>
      <button className="btn danger" onClick={onDelete}>Delete</button>
      <button className="btn ghost" onClick={onClearSelection}>Clear</button>
    </div>
  );
}
