'use client'

import Link from 'next/link'
import { FiHeart, FiMessageCircle } from 'react-icons/fi'
import { categoryStyle } from '@/lib/ideas-data'

export default function IdeaCard({ idea }) {
  const style = categoryStyle(idea.category)

  return (
    <article
      className="iv-card flex h-full flex-col overflow-hidden rounded-2xl iv-shadow transition-transform hover:-translate-y-1"
      style={{ backgroundColor: 'var(--card)' }}
    >
      {idea.image_url && (
        <img
          src={idea.image_url}
          alt=""
          className="h-40 w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className="rounded-full px-3 py-1 font-space-grotesk text-xs font-semibold"
            style={{ backgroundColor: style.bg, color: style.text }}
          >
            {idea.category}
          </span>
          <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--muted)' }}>
            <span className="flex items-center gap-1">
              <FiHeart size={14} /> {idea.likes}
            </span>
            {idea.comment_count != null && (
              <span className="flex items-center gap-1">
                <FiMessageCircle size={14} /> {idea.comment_count}
              </span>
            )}
          </div>
        </div>
        <h3 className="font-fraunces text-lg font-semibold leading-snug" style={{ color: 'var(--ink)' }}>
          {idea.title}
        </h3>
        <p className="mt-2 flex-1 font-space-grotesk text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          {idea.short_description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="font-space-grotesk text-xs" style={{ color: 'var(--muted)' }}>
            By {idea.author_name}
          </span>
          <Link
            href={`/ideas/${idea.id}`}
            className="rounded-full px-4 py-2 font-space-grotesk text-xs font-semibold text-white"
            style={{ backgroundColor: 'var(--brand)' }}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}
