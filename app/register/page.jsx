'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { HiOutlineLightBulb, HiOutlineCheck } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { authClient } from '@/lib/auth-client'
import GoogleIcon from '@/components/GoogleIcon'
import PageTitle from '@/components/PageTitle'

function Rule({ ok, label }) {
  return (
    <span
      className="inline-flex items-center gap-1 font-space-grotesk text-xs"
      style={{ color: ok ? 'var(--teal)' : 'var(--muted)' }}
    >
      <HiOutlineCheck size={13} /> {label}
    </span>
  )
}

function RegisterForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const hasLength = password.length >= 6
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const passwordValid = hasLength && hasUpper && hasLower

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!passwordValid) {
      toast.error('Password must be at least 6 characters and include uppercase and lowercase letters.')
      return
    }

    setLoading(true)
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      image: photo || undefined,
    })

    if (error) {
      toast.error(error.message ?? 'Could not create your account.')
      setLoading(false)
      return
    }

    toast.success('Account created successfully!')
    window.location.href = callbackUrl
  }

  const onGoogle = async () => {
    setGoogleLoading(true)
    try {
      await authClient.signIn.social({ provider: 'google', callbackURL: callbackUrl })
    } catch {
      toast.error('Google sign-up failed. Please try again.')
      setGoogleLoading(false)
    }
  }

  return (
    <main className="flex min-h-[80vh] w-full items-center justify-center px-4 py-12">
      <div className="iv-card w-full max-w-md rounded-3xl p-8 iv-shadow" style={{ backgroundColor: 'var(--card)' }}>
        <div className="flex flex-col items-center text-center">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
            style={{ backgroundColor: 'var(--brand)' }}
          >
            <HiOutlineLightBulb size={24} />
          </span>
          <h1 className="mt-4 font-fraunces text-3xl font-bold" style={{ color: 'var(--ink)' }}>
            Join IdeaVault
          </h1>
          <p className="mt-1 font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
            Create an account to share and validate ideas.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
              Name
            </span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="iv-input"
              placeholder="Ada Lovelace"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="iv-input"
              placeholder="you@email.com"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
              Photo URL
            </span>
            <input
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="iv-input"
              placeholder="https://… (optional)"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
              Password
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="iv-input"
              placeholder="Create a password"
            />
          </label>

          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Rule ok={hasLength} label="6+ characters" />
            <Rule ok={hasUpper} label="Uppercase" />
            <Rule ok={hasLower} label="Lowercase" />
          </div>

          <button type="submit" disabled={loading} className="iv-btn-primary w-full">
            {loading ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--outline)' }} />
          <span className="font-space-grotesk text-xs" style={{ color: 'var(--muted)' }}>
            or
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--outline)' }} />
        </div>

        <button
          type="button"
          onClick={onGoogle}
          disabled={googleLoading}
          className="iv-btn-outline flex w-full items-center justify-center gap-2 disabled:opacity-50"
        >
          <GoogleIcon /> {googleLoading ? 'Connecting…' : 'Continue with Google'}
        </button>

        <p className="mt-6 text-center font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
          Already have an account?{' '}
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="font-semibold"
            style={{ color: 'var(--brand)' }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <PageTitle title="Register — IdeaVault" />
      <RegisterForm />
    </Suspense>
  )
}
