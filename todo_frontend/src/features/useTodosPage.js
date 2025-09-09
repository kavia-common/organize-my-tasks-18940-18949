import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo, bulkAction } from '../services/api';
import { ACTIONS, useTodosDispatch, useTodosState } from '../state/todosContext';

export default function useTodosPage() {
  const state = useTodosState();
  const dispatch = useTodosDispatch();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const selectedCount = state.selectedIds.size;

  const load = useCallback(async () => {
    dispatch({ type: ACTIONS.LOAD_START });
    try {
      const data = await fetchTodos({
        status: state.filters.status,
        q: state.filters.q,
        sort: state.sort.field,
        direction: state.sort.direction,
      });
      dispatch({ type: ACTIONS.LOAD_SUCCESS, payload: data || [] });
    } catch (err) {
      dispatch({ type: ACTIONS.LOAD_ERROR, error: err });
    }
  }, [dispatch, state.filters.status, state.filters.q, state.sort.field, state.sort.direction]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filters.status, state.filters.q, state.sort.field, state.sort.direction]);

  const filteredItems = useMemo(() => state.items, [state.items]); // server filters already applied

  const toggleSelect = (id, checked) => {
    const next = new Set(state.selectedIds);
    if (checked) next.add(id);
    else next.delete(id);
    dispatch({ type: ACTIONS.SET_SELECTION, ids: Array.from(next) });
  };

  const toggleAll = (checked) => {
    if (checked) {
      dispatch({ type: ACTIONS.SET_SELECTION, ids: filteredItems.map((t) => t.id) });
    } else {
      dispatch({ type: ACTIONS.SET_SELECTION, ids: [] });
    }
  };

  const openAdd = () => setAddOpen(true);
  const closeAdd = () => setAddOpen(false);

  const openEdit = (todo) => {
    setEditing(todo);
    setEditOpen(true);
  };
  const closeEdit = () => {
    setEditing(null);
    setEditOpen(false);
  };

  const requestDelete = (todo) => {
    setPendingDelete(todo);
    setConfirmOpen(true);
  };
  const cancelDelete = () => {
    setPendingDelete(null);
    setConfirmOpen(false);
  };

  const submitAdd = async (form) => {
    const created = await createTodo(form);
    dispatch({ type: ACTIONS.ADD, payload: created });
    closeAdd();
  };

  const submitEdit = async (form) => {
    const updated = await updateTodo(editing.id, form);
    dispatch({ type: ACTIONS.UPDATE, payload: updated });
    closeEdit();
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    await deleteTodo(pendingDelete.id);
    dispatch({ type: ACTIONS.REMOVE, id: pendingDelete.id });
    cancelDelete();
  };

  const toggleComplete = async (todo) => {
    const nextStatus = todo.status === 'completed' ? 'open' : 'completed';
    const updated = await updateTodo(todo.id, { status: nextStatus });
    dispatch({ type: ACTIONS.UPDATE, payload: updated });
  };

  const doBulk = async (action) => {
    const ids = Array.from(state.selectedIds);
    if (ids.length === 0) return;
    const updated = await bulkAction(ids, action);
    dispatch({ type: ACTIONS.BULK_UPDATE, payload: updated });
  };

  const setFilters = (filters) => dispatch({ type: ACTIONS.SET_FILTERS, filters });
  const setSort = (sort) => dispatch({ type: ACTIONS.SET_SORT, sort });
  const setView = (view) => dispatch({ type: ACTIONS.SET_VIEW, view });
  const clearSelection = () => dispatch({ type: ACTIONS.SET_SELECTION, ids: [] });

  return {
    state,
    items: filteredItems,
    addOpen,
    editOpen,
    confirmOpen,
    editing,
    pendingDelete,
    selectedCount,

    actions: {
      load,
      openAdd,
      closeAdd,
      openEdit,
      closeEdit,
      requestDelete,
      cancelDelete,
      submitAdd,
      submitEdit,
      confirmDelete,
      toggleComplete,
      toggleSelect,
      toggleAll,
      doBulk,
      setFilters,
      setSort,
      setView,
      clearSelection,
    },
  };
}
