'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import ProtectedRoute from '@/components/ProtectedRoute'
import PageTitle from '@/components/PageTitle'
import { CATEGORIES } from '@/lib/ideas-data'
import { createIdea } from '@/lib/api'
import { useRouter } from 'next/navigation'

function AddIdeaForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: '',
    short_description: '',
    detailed_description: '',
    category: 'Tech',
    tags: '',
    image_url: '',
    estimated_budget: '',
    target_audience: '',
    problem_statement: '',
    proposed_solution: '',
  })

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    try {
      const idea = await createIdea(form)
      toast.success('Idea submitted successfully!')
      router.push(`/ideas/${idea.id}`)
    } catch (err) {
      toast.error(err.message || 'Failed to submit idea')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <PageTitle title="Add Idea — IdeaVault" />
      <h1 className="font-fraunces text-3xl font-bold" style={{ color: 'var(--ink)' }}>
        Share a startup idea
      </h1>
      <p className="mt-2 font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
        Describe your concept so the community can help you validate and refine it.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Idea Title *
          </span>
          <input required value={form.title} onChange={update('title')} className="iv-input" placeholder="e.g. AI-Powered Interview Coach" />
        </label>

        <label className="block">
          <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Short Description *
          </span>
          <textarea required value={form.short_description} onChange={update('short_description')} className="iv-input" rows={2} placeholder="One-line pitch" />
        </label>

        <label className="block">
          <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Detailed Description *
          </span>
          <textarea required value={form.detailed_description} onChange={update('detailed_description')} className="iv-input" rows={4} placeholder="Explain the concept in depth" />
        </label>

        <label className="block">
          <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Category *
          </span>
          <select required value={form.category} onChange={update('category')} className="iv-input">
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Tags (optional)
          </span>
          <input value={form.tags} onChange={update('tags')} className="iv-input" placeholder="saas, b2b, mobile (comma-separated)" />
        </label>

        <label className="block">
          <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Image URL *
          </span>
          <input required type="url" value={form.image_url} onChange={update('image_url')} className="iv-input" placeholder="https://…" />
        </label>

        <label className="block">
          <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Estimated Budget (optional)
          </span>
          <input value={form.estimated_budget} onChange={update('estimated_budget')} className="iv-input" placeholder="$10,000 – $30,000" />
        </label>

        <label className="block">
          <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Target Audience *
          </span>
          <input required value={form.target_audience} onChange={update('target_audience')} className="iv-input" placeholder="Who benefits most?" />
        </label>

        <label className="block">
          <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Problem Statement *
          </span>
          <textarea required value={form.problem_statement} onChange={update('problem_statement')} className="iv-input" rows={3} />
        </label>

        <label className="block">
          <span className="mb-1.5 block font-space-grotesk text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Proposed Solution *
          </span>
          <textarea required value={form.proposed_solution} onChange={update('proposed_solution')} className="iv-input" rows={3} />
        </label>

        <button type="submit" disabled={submitting} className="iv-btn-primary w-full">
          {submitting ? 'Submitting…' : 'Submit Idea'}
        </button>
      </form>
    </div>
  )
}

export default function AddIdeaPage() {
  return (
    <ProtectedRoute>
      <AddIdeaForm />
    </ProtectedRoute>
  )
}
