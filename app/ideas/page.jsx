'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { HiOutlineSearch, HiOutlineFilter } from 'react-icons/hi'
import toast from 'react-hot-toast'
import IdeaCard from '@/components/IdeaCard'
import Spinner from '@/components/Spinner'
import PageTitle from '@/components/PageTitle'
import { CATEGORIES } from '@/lib/ideas-data'
import { getIdeas } from '@/lib/api'

function IdeasPageContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [ideas, setIdeas] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setCategory(cat)
  }, [searchParams])

  useEffect(() => {
    let active = true
    setLoading(true)
    getIdeas({
      search,
      category,
      from: dateFrom,
      to: dateTo,
    })
      .then((data) => {
        if (active) setIdeas(data)
      })
      .catch((err) => {
        if (active) {
          setIdeas([])
          toast.error(err.message || 'Failed to load ideas')
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [search, category, dateFrom, dateTo])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageTitle title="All Ideas — IdeaVault" />
      <h1 className="font-fraunces text-3xl font-bold" style={{ color: 'var(--ink)' }}>
        Explore startup ideas
      </h1>
      <p className="mt-2 font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
        Browse concepts from founders across tech, health, AI, and more.
      </p>

      <div
        className="iv-card mt-8 grid gap-4 rounded-2xl p-5 sm:grid-cols-2 lg:grid-cols-4"
        style={{ backgroundColor: 'var(--card)' }}
      >
        <label className="relative block sm:col-span-2">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted)' }} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by idea title…"
            className="iv-input pl-10"
          />
        </label>
        <label>
          <span className="mb-1 flex items-center gap-1 font-space-grotesk text-xs font-semibold" style={{ color: 'var(--muted)' }}>
            <HiOutlineFilter size={14} /> Category
          </span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="iv-input">
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label>
            <span className="mb-1 block font-space-grotesk text-xs font-semibold" style={{ color: 'var(--muted)' }}>
              From
            </span>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="iv-input" />
          </label>
          <label>
            <span className="mb-1 block font-space-grotesk text-xs font-semibold" style={{ color: 'var(--muted)' }}>
              To
            </span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="iv-input" />
          </label>
        </div>
      </div>

      {loading ? (
        <Spinner label="Loading ideas…" />
      ) : ideas.length === 0 ? (
        <p className="py-16 text-center font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
          No ideas match your filters. Try adjusting search or category.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function IdeasPage() {
  return (
    <Suspense fallback={<Spinner label="Loading ideas…" />}>
      <IdeasPageContent />
    </Suspense>
  )
}
