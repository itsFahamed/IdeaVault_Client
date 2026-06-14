'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  HiOutlineMenuAlt3,
  HiX,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineLightBulb,
  HiOutlineChevronDown,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlinePlusCircle,
} from 'react-icons/hi'
import { useSession, signOut } from '@/lib/auth-client'
import { useTheme } from './ThemeProvider'
import toast from 'react-hot-toast'

const PUBLIC_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/ideas', label: 'Ideas' },
]

const PRIVATE_LINKS = [
  { href: '/add-idea', label: 'Add Idea' },
  { href: '/my-ideas', label: 'My Ideas' },
  { href: '/my-interactions', label: 'My Interactions' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  const isLoggedIn = !!session?.user
  const links = isLoggedIn ? [...PUBLIC_LINKS, ...PRIVATE_LINKS] : PUBLIC_LINKS

  useEffect(() => {
    setMenuOpen(false)
    setProfileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  const handleSignOut = async () => {
    await signOut()
    toast.success('You have been signed out.')
    router.push('/')
    router.refresh()
  }

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        borderColor: 'var(--outline)',
        backgroundColor: 'color-mix(in srgb, var(--paper) 85%, transparent)',
      }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: 'var(--brand)' }}
          >
            <HiOutlineLightBulb size={20} />
          </span>
          <span className="font-fraunces text-xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
            IdeaVault
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 font-space-grotesk text-sm font-medium transition-colors"
              style={{
                color: isActive(link.href) ? 'var(--brand)' : 'var(--ink)',
                backgroundColor: isActive(link.href)
                  ? 'color-mix(in srgb, var(--brand) 12%, transparent)'
                  : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
            style={{ borderColor: 'var(--outline)', color: 'var(--ink)' }}
          >
            {theme === 'dark' ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
          </button>

          {!isPending && !isLoggedIn && (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/login"
                className="rounded-full px-4 py-2 font-space-grotesk text-sm font-medium"
                style={{ color: 'var(--ink)' }}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full px-4 py-2 font-space-grotesk text-sm font-semibold text-white"
                style={{ backgroundColor: 'var(--brand)' }}
              >
                Register
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <div className="relative hidden sm:block" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border py-1 pl-1 pr-2 transition-colors"
                style={{ borderColor: 'var(--outline)' }}
              >
                <img
                  src={session.user.image || `https://i.pravatar.cc/100?u=${session.user.id}`}
                  alt={session.user.name || 'Profile'}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <HiOutlineChevronDown size={16} style={{ color: 'var(--muted)' }} />
              </button>
              {profileOpen && (
                <div
                  className="iv-card absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl iv-shadow"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <div className="border-b px-4 py-3" style={{ borderColor: 'var(--outline)' }}>
                    <p className="truncate font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                      {session.user.name}
                    </p>
                    <p className="truncate font-space-grotesk text-xs" style={{ color: 'var(--muted)' }}>
                      {session.user.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-3 font-space-grotesk text-sm hover:opacity-70"
                    style={{ color: 'var(--ink)' }}
                  >
                    <HiOutlineUser size={16} /> Profile Management
                  </Link>
                  <Link
                    href="/add-idea"
                    className="flex items-center gap-2 px-4 py-3 font-space-grotesk text-sm hover:opacity-70"
                    style={{ color: 'var(--ink)' }}
                  >
                    <HiOutlinePlusCircle size={16} /> Add Idea
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 border-t px-4 py-3 font-space-grotesk text-sm hover:opacity-70"
                    style={{ borderColor: 'var(--outline)', color: '#c0392b' }}
                  >
                    <HiOutlineLogout size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border lg:hidden"
            style={{ borderColor: 'var(--outline)', color: 'var(--ink)' }}
            aria-label="Menu"
          >
            {menuOpen ? <HiX size={18} /> : <HiOutlineMenuAlt3 size={18} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="border-t px-4 py-3 lg:hidden"
          style={{ borderColor: 'var(--outline)', backgroundColor: 'var(--paper)' }}
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 font-space-grotesk text-sm font-medium"
                style={{
                  color: isActive(link.href) ? 'var(--brand)' : 'var(--ink)',
                  backgroundColor: isActive(link.href)
                    ? 'color-mix(in srgb, var(--brand) 12%, transparent)'
                    : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 h-px" style={{ backgroundColor: 'var(--outline)' }} />
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="rounded-xl px-4 py-3 font-space-grotesk text-sm font-medium"
                  style={{ color: 'var(--ink)' }}
                >
                  Profile Management
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-xl px-4 py-3 text-left font-space-grotesk text-sm font-medium"
                  style={{ color: '#c0392b' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="flex-1 rounded-xl border px-4 py-3 text-center font-space-grotesk text-sm font-medium"
                  style={{ borderColor: 'var(--outline)', color: 'var(--ink)' }}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex-1 rounded-xl px-4 py-3 text-center font-space-grotesk text-sm font-semibold text-white"
                  style={{ backgroundColor: 'var(--brand)' }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
