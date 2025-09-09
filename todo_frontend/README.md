# To-Do Frontend (React)

A lightweight React frontend for managing and organizing tasks. No routing and no third-party UI libraries; just React + fetch + Context API.

## Features

- Create, edit, delete todos
- Filters by status and search query
- Sorting by title, priority, created, due date
- Views: List and Kanban
- Bulk actions: complete, incomplete, delete
- Loading, error, and empty states
- Accessible forms and dialogs
- Dark/Light theme toggle

## Architecture

```
src/
  components/        # Reusable UI components
    BulkActionsBar.js
    ConfirmModal.js
    Filters.js
    Header.js
    KanbanBoard.js
    Modal.js
    SortControl.js
    TodoForm.js
    TodoList.js
  features/
    TodosPage.js     # Page container composing the app
    useTodosPage.js  # Hook with UI logic
  services/
    api.js           # REST API calls (fetch)
  state/
    todosContext.js  # Context + reducer for state
  config.js          # API base URL and helpers
  App.js
  App.css
  index.js
```

### State Management
- Global state with React Context + useReducer:
  - items, loading, error
  - filters { status, q }
  - sort { field, direction }
  - view 'list' | 'kanban'
  - selectedIds Set

### API Layer
- Uses fetch only. Endpoints expected:
  - GET /todos?status=&q=&sort=&direction=
  - POST /todos
  - PATCH /todos/:id
  - DELETE /todos/:id
  - PATCH /todos/bulk (body: { ids, action })

## Configuration

Set the API base URL via environment variable at build time:

- REACT_APP_API_BASE_URL: Base URL for the backend API.
  - Example: http://localhost:4000/api

You can create a .env.local (not committed) with:
```
REACT_APP_API_BASE_URL=http://localhost:4000/api
```

## Development

Install and start:

```
npm install
npm start
```

Run tests:

```
npm test
```

Build:

```
npm run build
```

## Usage

1. Start the backend at REACT_APP_API_BASE_URL (defaults to http://localhost:4000/api).
2. Start the frontend (npm start).
3. Add tasks with the “+ Add Task” button.
4. Use filters, sorting, and view toggle. Select multiple rows to apply bulk actions.

## Notes

- No router required; single-page experience.
- Minimal CSS in App.css for clarity and quick customization.
- All public functions are annotated with PUBLIC_INTERFACE comments.
