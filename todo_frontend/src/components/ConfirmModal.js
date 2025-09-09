import React from 'react';
import Modal from './Modal';

// PUBLIC_INTERFACE
export default function ConfirmModal({ open, title = 'Confirm', message, onConfirm, onCancel }) {
  /** Confirmation dialog modal. */
  if (!open) return null;
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p>{message}</p>
      <div className="actions">
        <button className="btn danger" onClick={onConfirm}>Confirm</button>
        <button className="btn ghost" onClick={onCancel}>Cancel</button>
      </div>
    </Modal>
  );
}
