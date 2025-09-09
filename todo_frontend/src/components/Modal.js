import React, { useEffect } from 'react';

// PUBLIC_INTERFACE
export default function Modal({ title, open, onClose, children }) {
  /** Accessible modal dialog. */
  useEffect(() => {
    function onEsc(e) {
      if (e.key === 'Escape') onClose?.();
    }
    if (open) {
      document.addEventListener('keydown', onEsc);
    }
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title || 'Dialog'}>
      <div className="modal">
        {title ? <h2 className="modal-title">{title}</h2> : null}
        <div className="modal-body">{children}</div>
        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose} aria-label="Close dialog">Close</button>
        </div>
      </div>
      <div className="modal-scrim" onClick={onClose} aria-hidden="true" />
    </div>
  );
}
