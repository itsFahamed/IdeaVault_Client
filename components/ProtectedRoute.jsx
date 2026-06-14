'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import Spinner from './Spinner'

export default function ProtectedRoute({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (isPending) return
    if (!session?.user) {
      const callbackUrl = encodeURIComponent(pathname)
      router.replace(`/login?callbackUrl=${callbackUrl}`)
    }
  }, [isPending, session, router, pathname])

  if (isPending) {
    return <Spinner label="Checking your session…" />
  }

  if (!session?.user) {
    return <Spinner label="Redirecting to login…" />
  }

  return children
}
