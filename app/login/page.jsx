'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { HiOutlineLightBulb } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { authClient } from '@/lib/auth-client'
import GoogleIcon from '@/components/GoogleIcon'
import PageTitle from '@/components/PageTitle'

function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await authClient.signIn.email({ email, password })

    if (error) {
      toast.error(error.message ?? 'Incorrect email or password.')
      setLoading(false)
      return
    }

    toast.success('Welcome back!')
    window.location.href = callbackUrl
  }

  const onGoogle = async () => {
    setGoogleLoading(true)
    try {
      await authClient.signIn.social({ provider: 'google', callbackURL: callbackUrl })
    } catch {
      toast.error('Google sign-in failed. Please try again.')
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
            Welcome back
          </h1>
          <p className="mt-1 font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
            Sign in to keep sharing and shaping ideas.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
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
              Password
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="iv-input"
              placeholder="Your password"
            />
          </label>

          <div className="text-right">
            <span
              className="cursor-pointer font-space-grotesk text-xs"
              style={{ color: 'var(--muted)' }}
              title="Password reset is not available in this version"
            >
              Forgot password?
            </span>
          </div>

          <button type="submit" disabled={loading} className="iv-btn-primary w-full">
            {loading ? 'Signing in…' : 'Login'}
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
          New here?{' '}
          <Link
            href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="font-semibold"
            style={{ color: 'var(--brand)' }}
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <PageTitle title="Login — IdeaVault" />
      <LoginForm />
    </Suspense>
  )
}
