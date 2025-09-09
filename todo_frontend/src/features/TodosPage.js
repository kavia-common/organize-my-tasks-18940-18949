import React from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import SortControl from '../components/SortControl';
import ViewToggle from '../components/ViewToggle';
import BulkActionsBar from '../components/BulkActionsBar';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import KanbanBoard from '../components/KanbanBoard';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import useTodosPage from './useTodosPage';
import { useTodosState } from '../state/todosContext';

// PUBLIC_INTERFACE
export default function TodosPage() {
  /** High-level feature container for the Todos experience. */
  const state = useTodosState(); // must be called unconditionally within provider
  const {
    items,
    addOpen,
    editOpen,
    confirmOpen,
    editing,
    selectedCount,
    actions,
  } = useTodosPage();

  return (
    <div className="container">
      <Header onAddClick={actions.openAdd} />

      <div className="toolbar">
        <Filters value={state.filters} onChange={actions.setFilters} />
        <div className="toolbar-right">
          <SortControl value={state.sort} onChange={actions.setSort} />
          <ViewToggle view={state.view} onChange={actions.setView} />
        </div>
      </div>

      <BulkActionsBar
        selectedCount={selectedCount}
        onComplete={() => actions.doBulk('complete')}
        onIncomplete={() => actions.doBulk('incomplete')}
        onDelete={() => actions.doBulk('delete')}
        onClearSelection={actions.clearSelection}
      />

      {state.view === 'kanban' ? (
        <KanbanBoard
          items={items}
          loading={state.loading}
          error={state.error}
          onEdit={actions.openEdit}
          onToggleComplete={actions.toggleComplete}
        />
      ) : (
        <TodoList
          items={items}
          loading={state.loading}
          error={state.error}
          selectedIds={state.selectedIds}
          onToggleSelect={actions.toggleSelect}
          onToggleAll={actions.toggleAll}
          onEdit={actions.openEdit}
          onDelete={actions.requestDelete}
          onToggleComplete={actions.toggleComplete}
        />
      )}

      <Modal open={addOpen} onClose={actions.closeAdd} title="Add Task">
        <TodoForm onCancel={actions.closeAdd} onSubmit={actions.submitAdd} />
      </Modal>

      <Modal open={editOpen} onClose={actions.closeEdit} title="Edit Task">
        <TodoForm initialValue={editing || undefined} onCancel={actions.closeEdit} onSubmit={actions.submitEdit} />
      </Modal>

      <ConfirmModal
        open={confirmOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={actions.confirmDelete}
        onCancel={actions.cancelDelete}
      />
    </div>
  );
}
