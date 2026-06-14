'use client'

import { ImSpinner2 } from 'react-icons/im'

export default function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <ImSpinner2 className="animate-spin text-3xl" style={{ color: 'var(--brand)' }} />
      <p className="font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
        {label}
      </p>
    </div>
  )
}
