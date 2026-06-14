'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import ProtectedRoute from '@/components/ProtectedRoute'
import Spinner from '@/components/Spinner'
import PageTitle from '@/components/PageTitle'
import { timeAgo } from '@/lib/ideas-data'
import { getMyInteractions } from '@/lib/api'

function MyInteractionsContent() {
  const [loading, setLoading] = useState(true)
  const [interactions, setInteractions] = useState([])

  useEffect(() => {
    getMyInteractions()
      .then(setInteractions)
      .catch((err) => toast.error(err.message || 'Failed to load interactions'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <PageTitle title="My Interactions — IdeaVault" />
      <h1 className="font-fraunces text-3xl font-bold" style={{ color: 'var(--ink)' }}>
        My Interactions
      </h1>
      <p className="mt-2 font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
        Ideas you have commented on and engaged with.
      </p>

      {loading ? (
        <Spinner label="Loading your interactions…" />
      ) : interactions.length === 0 ? (
        <p className="py-16 text-center font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
          You have not commented on any ideas yet.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {interactions.map((item) => (
            <li key={item.comment.id} className="iv-card rounded-2xl p-5 iv-shadow" style={{ backgroundColor: 'var(--card)' }}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/ideas/${item.idea.id}`}
                    className="font-fraunces text-lg font-semibold hover:opacity-80"
                    style={{ color: 'var(--ink)' }}
                  >
                    {item.idea.title}
                  </Link>
                  <p className="mt-1 font-space-grotesk text-xs" style={{ color: 'var(--muted)' }}>
                    By {item.idea.author_name} · {timeAgo(item.comment.created_at)}
                  </p>
                </div>
                <Link
                  href={`/ideas/${item.idea.id}`}
                  className="rounded-full px-4 py-2 font-space-grotesk text-xs font-semibold text-white"
                  style={{ backgroundColor: 'var(--brand)' }}
                >
                  View Idea
                </Link>
              </div>
              <p
                className="mt-3 rounded-xl p-3 font-space-grotesk text-sm leading-relaxed"
                style={{ backgroundColor: 'color-mix(in srgb, var(--brand) 8%, transparent)', color: 'var(--muted)' }}
              >
                &ldquo;{item.comment.comment_text}&rdquo;
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function MyInteractionsPage() {
  return (
    <ProtectedRoute>
      <MyInteractionsContent />
    </ProtectedRoute>
  )
}
