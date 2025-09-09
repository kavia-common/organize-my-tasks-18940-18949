import React from 'react';

// PUBLIC_INTERFACE
export default function SortControl({ value, onChange }) {
  /** Sort controls for field and direction. */
  const { field, direction } = value;
  return (
    <div className="sort-control" role="group" aria-label="Sort todos">
      <label>
        Sort by
        <select value={field} onChange={(e) => onChange({ field: e.target.value })} aria-label="Sort field">
          <option value="createdAt">Created</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
      <label>
        Direction
        <select value={direction} onChange={(e) => onChange({ direction: e.target.value })} aria-label="Sort direction">
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </label>
    </div>
  );
}
