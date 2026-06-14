'use client'

import { useEffect, useState } from 'react'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import toast from 'react-hot-toast'
import ProtectedRoute from '@/components/ProtectedRoute'
import Spinner from '@/components/Spinner'
import PageTitle from '@/components/PageTitle'
import { categoryStyle, timeAgo } from '@/lib/ideas-data'
import { useSession } from '@/lib/auth-client'
import { getIdeaById, createComment, updateComment, deleteComment } from '@/lib/api'

function IdeaDetailContent({ params }) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [idea, setIdea] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const userId = session?.user?.id

  useEffect(() => {
    let active = true
    setLoading(true)
    getIdeaById(params.id)
      .then((data) => {
        if (!active) return
        setIdea(data.idea)
        setComments(data.comments || [])
      })
      .catch((err) => {
        if (active) toast.error(err.message || 'Failed to load idea')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [params.id])

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || submitting) return
    setSubmitting(true)
    try {
      const comment = await createComment(params.id, newComment.trim())
      setComments((prev) => [comment, ...prev])
      setNewComment('')
      toast.success('Comment added.')
    } catch (err) {
      toast.error(err.message || 'Failed to add comment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSaveEdit = async (id) => {
    if (!editText.trim() || submitting) return
    setSubmitting(true)
    try {
      const comment = await updateComment(id, editText.trim())
      setComments((prev) => prev.map((c) => (c.id === id ? comment : c)))
      setEditingId(null)
      setEditText('')
      toast.success('Comment updated.')
    } catch (err) {
      toast.error(err.message || 'Failed to update comment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (submitting) return
    setSubmitting(true)
    try {
      await deleteComment(id)
      setComments((prev) => prev.filter((c) => c.id !== id))
      toast.success('Comment deleted.')
    } catch (err) {
      toast.error(err.message || 'Failed to delete comment')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Spinner label="Loading idea details…" />

  if (!idea) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-fraunces text-2xl font-bold" style={{ color: 'var(--ink)' }}>
          Idea not found
        </h1>
        <p className="mt-2 font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
          This idea may have been removed or the link is incorrect.
        </p>
      </div>
    )
  }

  const style = categoryStyle(idea.category)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <PageTitle title={`${idea.title} — IdeaVault`} />

      {idea.image_url && (
        <img src={idea.image_url} alt="" className="mb-8 h-64 w-full rounded-2xl object-cover iv-shadow" />
      )}

      <div className="flex flex-wrap items-center gap-3">
        <span
          className="rounded-full px-3 py-1 font-space-grotesk text-xs font-semibold"
          style={{ backgroundColor: style.bg, color: style.text }}
        >
          {idea.category}
        </span>
        <span className="font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
          By {idea.author_name}
        </span>
      </div>

      <h1 className="mt-4 font-fraunces text-4xl font-bold" style={{ color: 'var(--ink)' }}>
        {idea.title}
      </h1>
      <p className="mt-3 font-space-grotesk text-lg" style={{ color: 'var(--muted)' }}>
        {idea.short_description}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="iv-card rounded-2xl p-5" style={{ backgroundColor: 'var(--card)' }}>
          <h2 className="font-fraunces text-lg font-semibold" style={{ color: 'var(--ink)' }}>
            Problem Statement
          </h2>
          <p className="mt-2 font-space-grotesk text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            {idea.problem_statement}
          </p>
        </section>
        <section className="iv-card rounded-2xl p-5" style={{ backgroundColor: 'var(--card)' }}>
          <h2 className="font-fraunces text-lg font-semibold" style={{ color: 'var(--ink)' }}>
            Proposed Solution
          </h2>
          <p className="mt-2 font-space-grotesk text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            {idea.proposed_solution}
          </p>
        </section>
      </div>

      <section className="mt-6 iv-card rounded-2xl p-5" style={{ backgroundColor: 'var(--card)' }}>
        <h2 className="font-fraunces text-lg font-semibold" style={{ color: 'var(--ink)' }}>
          Full Description
        </h2>
        <p className="mt-2 font-space-grotesk text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          {idea.detailed_description}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <span className="font-space-grotesk text-xs font-semibold uppercase" style={{ color: 'var(--muted)' }}>
              Target Audience
            </span>
            <p className="font-space-grotesk text-sm" style={{ color: 'var(--ink)' }}>
              {idea.target_audience}
            </p>
          </div>
          {idea.estimated_budget && (
            <div>
              <span className="font-space-grotesk text-xs font-semibold uppercase" style={{ color: 'var(--muted)' }}>
                Estimated Budget
              </span>
              <p className="font-space-grotesk text-sm" style={{ color: 'var(--ink)' }}>
                {idea.estimated_budget}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-fraunces text-2xl font-bold" style={{ color: 'var(--ink)' }}>
          Comments & Discussion
        </h2>

        <form onSubmit={handleAddComment} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your feedback on this idea…"
            rows={3}
            className="iv-input"
          />
          <button type="submit" disabled={submitting} className="iv-btn-primary mt-3">
            {submitting ? 'Posting…' : 'Post Comment'}
          </button>
        </form>

        <ul className="mt-6 space-y-4">
          {comments.length === 0 ? (
            <li className="font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
              No comments yet. Be the first to share feedback.
            </li>
          ) : (
            comments.map((comment) => {
              const isOwner = comment.user_id === userId
              const isEditing = editingId === comment.id
              const displayText = comment.text || comment.comment_text

              return (
                <li key={comment.id} className="iv-card rounded-2xl p-4" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                        {comment.user_name || comment.author_name}
                      </p>
                      <p className="font-space-grotesk text-xs" style={{ color: 'var(--muted)' }}>
                        {timeAgo(comment.created_at)}
                      </p>
                    </div>
                    {isOwner && !isEditing && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(comment.id)
                            setEditText(displayText)
                          }}
                          className="rounded-lg p-2 hover:opacity-70"
                          aria-label="Edit comment"
                        >
                          <HiOutlinePencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(comment.id)}
                          className="rounded-lg p-2 hover:opacity-70"
                          style={{ color: '#c0392b' }}
                          aria-label="Delete comment"
                        >
                          <HiOutlineTrash size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="mt-3">
                      <textarea value={editText} onChange={(e) => setEditText(e.target.value)} className="iv-input" rows={2} />
                      <div className="mt-2 flex gap-2">
                        <button type="button" onClick={() => handleSaveEdit(comment.id)} className="iv-btn-primary" disabled={submitting}>
                          Save
                        </button>
                        <button type="button" onClick={() => setEditingId(null)} className="iv-btn-outline">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 font-space-grotesk text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {displayText}
                    </p>
                  )}
                </li>
              )
            })
          )}
        </ul>
      </section>
    </div>
  )
}

export default function IdeaDetailPage({ params }) {
  return (
    <ProtectedRoute>
      <IdeaDetailContent params={params} />
    </ProtectedRoute>
  )
}
