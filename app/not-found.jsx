'use client'

import Link from 'next/link'
import { HiOutlineLightBulb } from 'react-icons/hi'
import PageTitle from '@/components/PageTitle'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <PageTitle title="Page Not Found — IdeaVault" />
      <span
        className="flex h-16 w-16 items-center justify-center rounded-2xl text-white"
        style={{ backgroundColor: 'var(--brand)' }}
      >
        <HiOutlineLightBulb size={32} />
      </span>
      <h1 className="mt-6 font-fraunces text-5xl font-bold" style={{ color: 'var(--ink)' }}>
        404
      </h1>
      <p className="mt-3 max-w-md font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
        The page you are looking for does not exist or may have been moved. Head back home and keep exploring startup ideas.
      </p>
      <Link href="/" className="iv-btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  )
}
