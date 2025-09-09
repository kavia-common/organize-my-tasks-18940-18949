import React, { createContext, useContext, useReducer, useMemo } from 'react';

// Action types
export const ACTIONS = {
  LOAD_START: 'LOAD_START',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_ERROR: 'LOAD_ERROR',
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  REMOVE: 'REMOVE',
  BULK_UPDATE: 'BULK_UPDATE',
  SET_FILTERS: 'SET_FILTERS',
  SET_SORT: 'SET_SORT',
  SET_VIEW: 'SET_VIEW',
  SET_SELECTION: 'SET_SELECTION',
};

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null,

  // UI controls
  filters: { status: 'all', q: '' },
  sort: { field: 'createdAt', direction: 'desc' },
  view: 'list', // 'list' | 'kanban'
  selectedIds: new Set(),
};

// Reducer
function todosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_START:
      return { ...state, loading: true, error: null };
    case ACTIONS.LOAD_SUCCESS:
      return { ...state, loading: false, items: action.payload, error: null, selectedIds: new Set() };
    case ACTIONS.LOAD_ERROR:
      return { ...state, loading: false, error: action.error };
    case ACTIONS.ADD:
      return { ...state, items: [action.payload, ...state.items] };
    case ACTIONS.UPDATE: {
      const items = state.items.map((t) => (t.id === action.payload.id ? { ...t, ...action.payload } : t));
      return { ...state, items };
    }
    case ACTIONS.REMOVE:
      return { ...state, items: state.items.filter((t) => t.id !== action.id) };
    case ACTIONS.BULK_UPDATE: {
      const map = action.payload.reduce((acc, t) => (acc.set(t.id, t), acc), new Map());
      const items = state.items
        .map((t) => (map.has(t.id) ? map.get(t.id) : t))
        .filter(Boolean);
      return { ...state, items, selectedIds: new Set() };
    }
    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.filters } };
    case ACTIONS.SET_SORT:
      return { ...state, sort: { ...state.sort, ...action.sort } };
    case ACTIONS.SET_VIEW:
      return { ...state, view: action.view };
    case ACTIONS.SET_SELECTION:
      return { ...state, selectedIds: new Set(action.ids) };
    default:
      return state;
  }
}

const TodosStateContext = createContext(undefined);
const TodosDispatchContext = createContext(undefined);

// PUBLIC_INTERFACE
export function TodosProvider({ children }) {
  /** Context provider that exposes todos state and dispatch. */
  const [state, dispatch] = useReducer(todosReducer, initialState);

  const value = useMemo(() => state, [state]);
  return (
    <TodosStateContext.Provider value={value}>
      <TodosDispatchContext.Provider value={dispatch}>{children}</TodosDispatchContext.Provider>
    </TodosStateContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useTodosState() {
  /** Access the todos state. */
  const ctx = useContext(TodosStateContext);
  if (ctx === undefined) throw new Error('useTodosState must be used within TodosProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function useTodosDispatch() {
  /** Access the todos dispatch function. */
  const ctx = useContext(TodosDispatchContext);
  if (ctx === undefined) throw new Error('useTodosDispatch must be used within TodosProvider');
  return ctx;
}
