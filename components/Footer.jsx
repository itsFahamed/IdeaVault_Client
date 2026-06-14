'use client'

import Link from 'next/link'
import { HiOutlineLightBulb, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { CATEGORIES } from '@/lib/ideas-data'

function XLogo({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="X" role="img">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t" style={{ borderColor: 'var(--outline)', backgroundColor: 'var(--card)' }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              <HiOutlineLightBulb size={20} />
            </span>
            <span className="font-fraunces text-xl font-bold" style={{ color: 'var(--ink)' }}>
              IdeaVault
            </span>
          </Link>
          <p className="mt-4 max-w-xs font-space-grotesk text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            A community where founders share startup ideas, gather honest feedback, and refine concepts together.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border"
              style={{ borderColor: 'var(--outline)', color: 'var(--ink)' }}
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="flex h-9 w-9 items-center justify-center rounded-full border"
              style={{ borderColor: 'var(--outline)', color: 'var(--ink)' }}
            >
              <XLogo />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border"
              style={{ borderColor: 'var(--outline)', color: 'var(--ink)' }}
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-space-grotesk text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--ink)' }}>
            Platform
          </h4>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/ideas" className="font-space-grotesk text-sm hover:opacity-70" style={{ color: 'var(--muted)' }}>
                All Ideas
              </Link>
            </li>
            <li>
              <Link href="/add-idea" className="font-space-grotesk text-sm hover:opacity-70" style={{ color: 'var(--muted)' }}>
                Add Idea
              </Link>
            </li>
            <li>
              <Link href="/my-ideas" className="font-space-grotesk text-sm hover:opacity-70" style={{ color: 'var(--muted)' }}>
                My Ideas
              </Link>
            </li>
            <li>
              <Link href="/my-interactions" className="font-space-grotesk text-sm hover:opacity-70" style={{ color: 'var(--muted)' }}>
                My Interactions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-space-grotesk text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--ink)' }}>
            Categories
          </h4>
          <ul className="mt-4 space-y-2.5">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat}>
                <Link
                  href={`/ideas?category=${encodeURIComponent(cat)}`}
                  className="font-space-grotesk text-sm hover:opacity-70"
                  style={{ color: 'var(--muted)' }}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-space-grotesk text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--ink)' }}>
            Contact
          </h4>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2 font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
              <HiOutlineMail className="mt-0.5 shrink-0" size={16} />
              hello@ideavault.app
            </li>
            <li className="flex items-start gap-2 font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
              <HiOutlineLocationMarker className="mt-0.5 shrink-0" size={16} />
              San Francisco, CA
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t py-6 text-center" style={{ borderColor: 'var(--outline)' }}>
        <p className="font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
          © {new Date().getFullYear()} IdeaVault. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
