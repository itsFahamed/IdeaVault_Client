'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ProtectedRoute from '@/components/ProtectedRoute'
import PageTitle from '@/components/PageTitle'
import { useSession, authClient } from '@/lib/auth-client'

function ProfileContent() {
  const { data: session, refetch } = useSession()
  const user = session?.user
  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setPhoto(user.image || '')
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await authClient.updateUser({
        name,
        image: photo || null,
      })
      if (error) {
        toast.error(error.message || 'Failed to update profile')
      } else {
        await refetch()
        toast.success('Profile updated successfully.')
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:px-6 lg:px-8">
      <PageTitle title="Profile — IdeaVault" />
      <h1 className="font-fraunces text-3xl font-bold" style={{ color: 'var(--ink)' }}>
        Profile Management
      </h1>
      <p className="mt-2 font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
        Update your public profile information.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <img
          src={photo || `https://i.pravatar.cc/100?u=${user.id}`}
          alt={name}
          className="h-20 w-20 rounded-2xl object-cover"
        />
        <div>
          <p className="font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            {user.email}
          </p>
          <p className="font-space-grotesk text-xs" style={{ color: 'var(--muted)' }}>
            Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Display Name
          </span>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="iv-input" />
        </label>

        <label className="block">
          <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Photo URL
          </span>
          <input type="url" value={photo} onChange={(e) => setPhoto(e.target.value)} className="iv-input" placeholder="https://…" />
        </label>

        <button type="submit" disabled={loading} className="iv-btn-primary w-full">
          {loading ? 'Saving…' : 'Save Profile'}
        </button>
      </form>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
