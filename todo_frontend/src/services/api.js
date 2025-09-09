import { apiUrl, defaultJsonHeaders, parseJsonOrThrow } from '../config';

/**
 * API layer for communicating with the backend REST service for todos.
 * Assumed endpoints:
 * - GET    /todos?status=&q=&sort=&direction=
 * - POST   /todos
 * - GET    /todos/:id
 * - PUT    /todos/:id
 * - PATCH  /todos/:id
 * - DELETE /todos/:id
 * - PATCH  /todos/bulk (body: { ids, action: 'complete'|'incomplete'|'delete' })
 */

// PUBLIC_INTERFACE
export async function fetchTodos({ status, q, sort, direction } = {}) {
  /** Fetch a filtered/sorted list of todos from the backend. */
  const params = new URLSearchParams();
  if (status && status !== 'all') params.set('status', status);
  if (q) params.set('q', q);
  if (sort) params.set('sort', sort);
  if (direction) params.set('direction', direction);
  const url = apiUrl(`/todos${params.toString() ? `?${params.toString()}` : ''}`);
  const res = await fetch(url, { method: 'GET', headers: defaultJsonHeaders });
  return parseJsonOrThrow(res);
}

// PUBLIC_INTERFACE
export async function createTodo(todo) {
  /** Create a new todo. Expects todo with title, description?, dueDate?, priority?, status? */
  const res = await fetch(apiUrl('/todos'), {
    method: 'POST',
    headers: defaultJsonHeaders,
    body: JSON.stringify(todo),
  });
  return parseJsonOrThrow(res);
}

// PUBLIC_INTERFACE
export async function updateTodo(id, updates) {
  /** Update a todo by id using PUT (full update) or PATCH (partial). Here we use PATCH for flexibility. */
  const res = await fetch(apiUrl(`/todos/${id}`), {
    method: 'PATCH',
    headers: defaultJsonHeaders,
    body: JSON.stringify(updates),
  });
  return parseJsonOrThrow(res);
}

// PUBLIC_INTERFACE
export async function deleteTodo(id) {
  /** Delete a todo by id. */
  const res = await fetch(apiUrl(`/todos/${id}`), { method: 'DELETE', headers: defaultJsonHeaders });
  return parseJsonOrThrow(res);
}

// PUBLIC_INTERFACE
export async function bulkAction(ids, action) {
  /** Perform a bulk action on many todos (complete, incomplete, or delete). */
  const res = await fetch(apiUrl('/todos/bulk'), {
    method: 'PATCH',
    headers: defaultJsonHeaders,
    body: JSON.stringify({ ids, action }),
  });
  return parseJsonOrThrow(res);
}
