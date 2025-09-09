import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
export default function Filters({ value, onChange }) {
  /** Filters panel for status and search query. */
  const [status, setStatus] = useState(value.status || 'all');
  const [q, setQ] = useState(value.q || '');

  useEffect(() => {
    setStatus(value.status || 'all');
    setQ(value.q || '');
  }, [value]);

  function handleApply(e) {
    e.preventDefault();
    onChange({ status, q });
  }

  return (
    <form className="filters" onSubmit={handleApply} aria-label="Filters">
      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <label className="grow">
        Search
        <input
          type="search"
          placeholder="Search tasks..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search tasks"
        />
      </label>

      <button className="btn" type="submit" aria-label="Apply filters">Apply</button>
    </form>
  );
}
