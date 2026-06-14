'use client'

import { useEffect, useState } from 'react'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import toast from 'react-hot-toast'
import ProtectedRoute from '@/components/ProtectedRoute'
import Spinner from '@/components/Spinner'
import PageTitle from '@/components/PageTitle'
import ConfirmModal from '@/components/ConfirmModal'
import IdeaCard from '@/components/IdeaCard'
import { getMyIdeas, updateIdea, deleteIdea } from '@/lib/api'

function MyIdeasContent() {
  const [loading, setLoading] = useState(true)
  const [ideas, setIdeas] = useState([])
  const [editing, setEditing] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editShort, setEditShort] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const loadIdeas = () => {
    setLoading(true)
    getMyIdeas()
      .then(setIdeas)
      .catch((err) => toast.error(err.message || 'Failed to load your ideas'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadIdeas()
  }, [])

  const openEdit = (idea) => {
    setEditing(idea)
    setEditTitle(idea.title)
    setEditShort(idea.short_description)
  }

  const saveEdit = async () => {
    if (!editing || submitting) return
    setSubmitting(true)
    try {
      const updated = await updateIdea(editing.id, {
        title: editTitle,
        short_description: editShort,
      })
      setIdeas((prev) => prev.map((i) => (i.id === editing.id ? updated : i)))
      setEditing(null)
      toast.success('Idea updated.')
    } catch (err) {
      toast.error(err.message || 'Failed to update idea')
    } finally {
      setSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget || submitting) return
    setSubmitting(true)
    try {
      await deleteIdea(deleteTarget.id)
      setIdeas((prev) => prev.filter((i) => i.id !== deleteTarget.id))
      setDeleteTarget(null)
      toast.success('Idea deleted.')
    } catch (err) {
      toast.error(err.message || 'Failed to delete idea')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageTitle title="My Ideas — IdeaVault" />
      <h1 className="font-fraunces text-3xl font-bold" style={{ color: 'var(--ink)' }}>
        My Ideas
      </h1>
      <p className="mt-2 font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
        Manage the startup concepts you have shared with the community.
      </p>

      {loading ? (
        <Spinner label="Loading your ideas…" />
      ) : ideas.length === 0 ? (
        <p className="py-16 text-center font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
          You have not posted any ideas yet.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <div key={idea.id} className="relative">
              <IdeaCard idea={idea} />
              <div className="absolute right-4 top-4 flex gap-2">
                <button type="button" onClick={() => openEdit(idea)} className="rounded-full bg-white/90 p-2 shadow" aria-label="Edit idea">
                  <HiOutlinePencil size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(idea)}
                  className="rounded-full bg-white/90 p-2 shadow"
                  style={{ color: '#c0392b' }}
                  aria-label="Delete idea"
                >
                  <HiOutlineTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="iv-card w-full max-w-lg rounded-2xl p-6 iv-shadow" style={{ backgroundColor: 'var(--card)' }}>
            <h3 className="font-fraunces text-xl font-semibold" style={{ color: 'var(--ink)' }}>
              Update Idea
            </h3>
            <div className="mt-4 space-y-3">
              <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="iv-input" placeholder="Title" />
              <textarea value={editShort} onChange={(e) => setEditShort(e.target.value)} className="iv-input" rows={3} placeholder="Short description" />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setEditing(null)} className="iv-btn-outline">
                Cancel
              </button>
              <button type="button" onClick={saveEdit} className="iv-btn-primary" disabled={submitting}>
                {submitting ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete idea?"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default function MyIdeasPage() {
  return (
    <ProtectedRoute>
      <MyIdeasContent />
    </ProtectedRoute>
  )
}
