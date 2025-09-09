import React from 'react';

// PUBLIC_INTERFACE
export default function Header({ onAddClick }) {
  /** App header with title and add button. */
  return (
    <header className="header">
      <h1 className="title" aria-label="Organize My Tasks">Organize My Tasks</h1>
      <button className="btn primary" onClick={onAddClick} aria-label="Add new task">+ Add Task</button>
    </header>
  );
}
