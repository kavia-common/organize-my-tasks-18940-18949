import React, { useEffect, useState } from 'react';

const empty = { title: '', description: '', dueDate: '', priority: 'normal', status: 'open' };

// PUBLIC_INTERFACE
export default function TodoForm({ initialValue, onCancel, onSubmit }) {
  /** Form for creating or editing a todo. */
  const [form, setForm] = useState(initialValue || empty);
  const [errors, setErrors] = useState({});

  useEffect(() => setForm(initialValue || empty), [initialValue]);

  function validate(values) {
    const e = {};
    if (!values.title || !values.title.trim()) e.title = 'Title is required';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const eobj = validate(form);
    setErrors(eobj);
    if (Object.keys(eobj).length) return;
    onSubmit(form);
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'err-title' : undefined}
          required
        />
        {errors.title && (
          <span role="alert" id="err-title" className="error">
            {errors.title}
          </span>
        )}
      </label>

      <label className="grow">
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Task details"
          rows={3}
        />
      </label>

      <div className="row">
        <label>
          Due Date
          <input name="dueDate" type="date" value={form.dueDate || ''} onChange={handleChange} />
        </label>
        <label>
          Priority
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </label>
        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <div className="actions">
        <button className="btn primary" type="submit">Save</button>
        <button className="btn ghost" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
