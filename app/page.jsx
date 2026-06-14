'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { HiOutlineSparkles, HiOutlineArrowRight, HiOutlineLightBulb, HiOutlineChatAlt2, HiOutlineTrendingUp, HiOutlineUserGroup, HiOutlineFlag } from 'react-icons/hi'
import IdeaCard from '@/components/IdeaCard'
import Spinner from '@/components/Spinner'
import PageTitle from '@/components/PageTitle'
import { getTrendingIdeas } from '@/lib/api'

const SLIDES = [
  {
    eyebrow: 'Where ideas find their people',
    title: 'Turn a spark into a startup.',
    text: 'Share your boldest concepts, gather honest feedback from founders, and refine ideas until they are ready to build.',
    image: 'https://picsum.photos/seed/ideavaultbanner1/1600/900',
  },
  {
    eyebrow: 'Validate before you build',
    title: 'Test the idea, not your savings.',
    text: 'Post a concept in minutes and let the community pressure-test the problem, the audience, and the solution.',
    image: 'https://picsum.photos/seed/ideavaultbanner2/1600/900',
  },
  {
    eyebrow: 'Build in good company',
    title: 'Discover what founders are dreaming up.',
    text: 'Explore trending ideas across tech, health, AI, climate, and more — and find your next collaborator.',
    image: 'https://picsum.photos/seed/ideavaultbanner3/1600/900',
  },
]

const STEPS = [
  {
    icon: HiOutlineLightBulb,
    title: 'Share',
    text: 'Post your startup idea with the problem, audience, and proposed solution.',
  },
  {
    icon: HiOutlineChatAlt2,
    title: 'Discuss',
    text: 'Get structured comments and questions from a community of builders.',
  },
  {
    icon: HiOutlineFlag,
    title: 'Refine',
    text: 'Iterate on feedback, track trending concepts, and shape something real.',
  },
]

function Banner() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="relative h-[460px] overflow-hidden rounded-[2rem] iv-shadow sm:h-[520px]">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.title}
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                opacity: i === active ? 1 : 0,
                pointerEvents: i === active ? 'auto' : 'none',
              }}
            >
              <img src={slide.image} alt="" className="h-full w-full object-cover" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(120deg, rgba(29,26,22,0.86) 0%, rgba(29,26,22,0.55) 45%, rgba(220,107,47,0.35) 100%)',
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-14">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-space-grotesk text-xs font-semibold text-white backdrop-blur-sm">
                    <HiOutlineSparkles size={14} /> {slide.eyebrow}
                  </span>
                  <h1 className="mt-5 font-fraunces text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-xl font-space-grotesk text-base leading-relaxed text-white/85 sm:text-lg">
                    {slide.text}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href="/ideas"
                      className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-space-grotesk text-sm font-semibold text-white transition-transform hover:scale-105"
                      style={{ backgroundColor: 'var(--brand)' }}
                    >
                      Explore Ideas <HiOutlineArrowRight size={18} />
                    </Link>
                    <Link
                      href="/add-idea"
                      className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-space-grotesk text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                    >
                      Share Your Idea
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-6 left-8 z-10 flex gap-2 sm:left-14">
            {SLIDES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActive(i)}
                className="h-2 rounded-full transition-all"
                style={{
                  width: i === active ? 28 : 8,
                  backgroundColor: i === active ? 'var(--brand)' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [trending, setTrending] = useState([])

  useEffect(() => {
    let active = true
    getTrendingIdeas()
      .then((ideas) => {
        if (active) setTrending(ideas)
      })
      .catch(() => {
        if (active) setTrending([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <PageTitle title="IdeaVault — Share & Validate Startup Ideas" />
      <Banner />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-space-grotesk text-sm font-semibold" style={{ color: 'var(--brand)' }}>
              <HiOutlineTrendingUp size={18} /> Trending Now
            </div>
            <h2 className="mt-1 font-fraunces text-3xl font-bold" style={{ color: 'var(--ink)' }}>
              Hot startup ideas this week
            </h2>
          </div>
          <Link href="/ideas" className="hidden font-space-grotesk text-sm font-semibold sm:inline" style={{ color: 'var(--brand)' }}>
            View all →
          </Link>
        </div>

        {loading ? (
          <Spinner label="Loading trending ideas…" />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-fraunces text-3xl font-bold" style={{ color: 'var(--ink)' }}>
            How IdeaVault works
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
            From first draft to community-backed concept in three simple steps.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="iv-card rounded-2xl p-6 text-center iv-shadow"
              style={{ backgroundColor: 'var(--card)' }}
            >
              <span
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                style={{ backgroundColor: 'var(--brand)' }}
              >
                <step.icon size={22} />
              </span>
              <h3 className="mt-4 font-fraunces text-xl font-semibold" style={{ color: 'var(--ink)' }}>
                {step.title}
              </h3>
              <p className="mt-2 font-space-grotesk text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mx-4 mb-16 rounded-[2rem] px-8 py-14 text-center sm:mx-6 lg:mx-8"
        style={{ backgroundColor: 'color-mix(in srgb, var(--brand) 12%, var(--card))' }}
      >
        <HiOutlineUserGroup className="mx-auto" size={36} style={{ color: 'var(--brand)' }} />
        <h2 className="mt-4 font-fraunces text-3xl font-bold" style={{ color: 'var(--ink)' }}>
          Join 2,400+ founders validating ideas
        </h2>
        <p className="mx-auto mt-3 max-w-lg font-space-grotesk text-sm" style={{ color: 'var(--muted)' }}>
          Share your concept, get thoughtful feedback, and discover collaborators who care about building the future.
        </p>
        <Link href="/register" className="iv-btn-primary mt-6 inline-block">
          Create your free account
        </Link>
      </section>
    </>
  )
}
