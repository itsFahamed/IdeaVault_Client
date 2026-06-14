'use client'

import { useEffect } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { useSession } from '@/lib/auth-client'

function AuthSync() {
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (isPending) return

    if (session?.user) {
      const localToken = localStorage.getItem('ideavault_token')
      if (!localToken) {
        fetch('/api/auth/token')
          .then((res) => {
            if (res.ok) return res.json()
            throw new Error('Failed to fetch token')
          })
          .then((data) => {
            if (data.jwt) {
              localStorage.setItem('ideavault_token', data.jwt)
            }
          })
          .catch((err) => {
            console.error('Error syncing auth token:', err)
          })
      }
    } else {
      localStorage.removeItem('ideavault_token')
    }
  }, [session, isPending])

  return null
}

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthSync />
      {children}
    </ThemeProvider>
  )
}

