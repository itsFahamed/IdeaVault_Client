'use client'

import { HiOutlineX } from 'react-icons/hi'

export default function ConfirmModal({ open, title, message, confirmLabel = 'Confirm', onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="iv-card w-full max-w-md rounded-2xl p-6 iv-shadow"
        style={{ backgroundColor: 'var(--card)' }}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-fraunces text-xl font-semibold" style={{ color: 'var(--ink)' }}>
            {title}
          </h3>
          <button type="button" onClick={onCancel} aria-label="Close">
            <HiOutlineX size={20} />
          </button>
        </div>
        <p className="mt-3 font-space-grotesk text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          {message}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="iv-btn-outline">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full px-6 py-3 font-space-grotesk text-sm font-semibold text-white"
            style={{ backgroundColor: '#c0392b' }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
