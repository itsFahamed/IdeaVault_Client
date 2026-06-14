export const CATEGORIES = [
  'Tech',
  'Health',
  'AI',
  'Education',
  'Finance',
  'Sustainability',
  'Commerce',
  'Social',
]

export const CATEGORY_STYLES = {
  Tech: { bg: 'rgba(31, 124, 124, 0.14)', text: '#1f7c7c' },
  Health: { bg: 'rgba(220, 107, 47, 0.14)', text: '#b6511b' },
  AI: { bg: 'rgba(120, 80, 200, 0.14)', text: '#6d4fb0' },
  Education: { bg: 'rgba(36, 120, 200, 0.14)', text: '#1f6dc0' },
  Finance: { bg: 'rgba(40, 150, 90, 0.14)', text: '#1f8a52' },
  Sustainability: { bg: 'rgba(90, 150, 40, 0.16)', text: '#4e7a1e' },
  Commerce: { bg: 'rgba(200, 80, 120, 0.14)', text: '#b0426a' },
  Social: { bg: 'rgba(200, 140, 30, 0.16)', text: '#9a6c10' },
}

export function categoryStyle(category) {
  return CATEGORY_STYLES[category] ?? { bg: 'rgba(92, 83, 73, 0.14)', text: '#5c5349' }
}

export function timeAgo(dateStr) {
  const date = new Date(dateStr)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const intervals = [
    [31536000, 'year'],
    [2592000, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
  ]
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs)
    if (count >= 1) {
      return `${count} ${label}${count > 1 ? 's' : ''} ago`
    }
  }
  return 'just now'
}

export const MOCK_IDEAS = [
  {
    id: '1',
    user_id: 'u1',
    author_name: 'Sana Karim',
    author_image: 'https://i.pravatar.cc/100?u=sana',
    title: 'AI-Powered Interview Coach',
    short_description: 'A coach that prepares candidates with tailored mock interviews and real-time feedback.',
    detailed_description:
      'Job seekers struggle to practice realistic interviews without expensive coaching. This platform uses conversational AI to simulate role-specific interviews, score answers, and suggest improvements based on hiring manager rubrics.',
    category: 'AI',
    tags: ['career', 'education', 'saas'],
    image_url: 'https://picsum.photos/seed/interviewcoach/800/500',
    estimated_budget: '$15,000 – $40,000',
    target_audience: 'Early-career professionals and bootcamp graduates',
    problem_statement: 'Candidates lack affordable, personalized interview practice.',
    proposed_solution: 'Adaptive AI mock interviews with scoring and actionable feedback.',
    likes: 124,
    comment_count: 18,
    created_at: '2026-05-28T10:00:00Z',
    updated_at: '2026-05-28T10:00:00Z',
  },
  {
    id: '2',
    user_id: 'u2',
    author_name: 'Marcus Patel',
    author_image: 'https://i.pravatar.cc/100?u=marcus',
    title: 'Health Reminder Wearable',
    short_description: 'A discreet wearable that schedules micro health tasks throughout the day.',
    detailed_description:
      'Chronic condition patients forget small but critical daily habits. This wearable pairs gentle haptic nudges with a companion app to track hydration, medication timing, and short movement breaks.',
    category: 'Health',
    tags: ['hardware', 'wellness'],
    image_url: 'https://picsum.photos/seed/healthwear/800/500',
    estimated_budget: '$80,000 – $200,000',
    target_audience: 'Adults managing hypertension and diabetes',
    problem_statement: 'Daily health routines are easy to miss without gentle reminders.',
    proposed_solution: 'Low-friction wearable nudges tied to clinician-approved plans.',
    likes: 98,
    comment_count: 11,
    created_at: '2026-05-25T14:30:00Z',
    updated_at: '2026-05-25T14:30:00Z',
  },
  {
    id: '3',
    user_id: 'u3',
    author_name: 'Lina Rodriguez',
    author_image: 'https://i.pravatar.cc/100?u=lina',
    title: 'EduGamify for Emerging Markets',
    short_description: 'Gamified learning paths for in-demand skills on low-bandwidth devices.',
    detailed_description:
      'Students in emerging markets need job-ready skills but face unreliable internet. EduGamify delivers bite-sized lessons offline-first, with peer challenges and employer-backed skill badges.',
    category: 'Education',
    tags: ['edtech', 'mobile'],
    image_url: 'https://picsum.photos/seed/edugamify/800/500',
    estimated_budget: '$25,000 – $60,000',
    target_audience: '18–25 year olds seeking first tech roles',
    problem_statement: 'Quality skills training is inaccessible on slow connections.',
    proposed_solution: 'Offline-first gamified curriculum with verifiable credentials.',
    likes: 76,
    comment_count: 9,
    created_at: '2026-05-22T09:15:00Z',
    updated_at: '2026-05-22T09:15:00Z',
  },
  {
    id: '4',
    user_id: 'u4',
    author_name: 'Omar Adeyemi',
    author_image: 'https://i.pravatar.cc/100?u=omar',
    title: 'Local Services SMS Marketplace',
    short_description: 'Connects micro-entrepreneurs with local demand through SMS-first booking.',
    detailed_description:
      'Many small service providers lack smartphones or stable data. Customers text a local number to request plumbers, tailors, or tutors; the platform routes jobs and handles simple payments via mobile money.',
    category: 'Commerce',
    tags: ['sms', 'marketplace'],
    image_url: 'https://picsum.photos/seed/smsmarket/800/500',
    estimated_budget: '$10,000 – $30,000',
    target_audience: 'Urban neighborhoods with high mobile money adoption',
    problem_statement: 'Informal workers miss customers who cannot find them online.',
    proposed_solution: 'SMS-based discovery and booking with escrow payments.',
    likes: 64,
    comment_count: 7,
    created_at: '2026-05-20T16:45:00Z',
    updated_at: '2026-05-20T16:45:00Z',
  },
  {
    id: '5',
    user_id: 'u5',
    author_name: 'Priya Menon',
    author_image: 'https://i.pravatar.cc/100?u=priya',
    title: 'SaaS Cost Optimizer',
    short_description: 'Analyze SaaS billing and recommend concrete savings for growing teams.',
    detailed_description:
      'Startups accumulate overlapping tools without visibility. This dashboard ingests invoices and usage signals, flags redundant seats, and suggests downgrade or bundle opportunities with one-click export for finance teams.',
    category: 'Finance',
    tags: ['b2b', 'analytics'],
    image_url: 'https://picsum.photos/seed/saasopt/800/500',
    estimated_budget: '$20,000 – $50,000',
    target_audience: 'Finance ops at 20–200 person startups',
    problem_statement: 'SaaS sprawl silently drains runway.',
    proposed_solution: 'Automated spend audit with actionable recommendations.',
    likes: 52,
    comment_count: 14,
    created_at: '2026-05-18T11:20:00Z',
    updated_at: '2026-05-18T11:20:00Z',
  },
  {
    id: '6',
    user_id: 'u6',
    author_name: 'Ethan Clarke',
    author_image: 'https://i.pravatar.cc/100?u=ethan',
    title: 'Green Supply Chain Tracker',
    short_description: 'Trace supplier emissions and surface greener sourcing alternatives.',
    detailed_description:
      'Brands face pressure to report Scope 3 emissions but lack supplier data. This platform collects supplier disclosures, estimates gaps, and recommends certified alternatives with cost impact modeling.',
    category: 'Sustainability',
    tags: ['climate', 'supply-chain'],
    image_url: 'https://picsum.photos/seed/greensupply/800/500',
    estimated_budget: '$50,000 – $120,000',
    target_audience: 'Sustainability leads at consumer goods companies',
    problem_statement: 'Scope 3 reporting is fragmented and unreliable.',
    proposed_solution: 'Unified supplier emissions ledger with swap recommendations.',
    likes: 47,
    comment_count: 6,
    created_at: '2026-05-15T08:00:00Z',
    updated_at: '2026-05-15T08:00:00Z',
  },
  {
    id: '7',
    user_id: 'u7',
    author_name: 'Ava Nguyen',
    author_image: 'https://i.pravatar.cc/100?u=ava',
    title: 'Neighborhood Skill Swap',
    short_description: 'Hyperlocal barter network where residents trade skills instead of cash.',
    detailed_description:
      'Freelancers in tight communities want to exchange design, tutoring, and repair work without formal marketplaces taking a cut. Skill Swap uses reputation scores and time-credit wallets to keep exchanges fair.',
    category: 'Social',
    tags: ['community', 'marketplace'],
    image_url: 'https://picsum.photos/seed/skillswap/800/500',
    estimated_budget: '$8,000 – $20,000',
    target_audience: 'Urban renters and gig workers',
    problem_statement: 'Cashless skill exchange lacks trust infrastructure.',
    proposed_solution: 'Reputation-backed time credits for local service barter.',
    likes: 39,
    comment_count: 5,
    created_at: '2026-05-12T13:10:00Z',
    updated_at: '2026-05-12T13:10:00Z',
  },
  {
    id: '8',
    user_id: 'u8',
    author_name: 'Diego Morales',
    author_image: 'https://i.pravatar.cc/100?u=diego',
    title: 'Remote Team Culture Pulse',
    short_description: 'Weekly async check-ins that surface team morale trends for managers.',
    detailed_description:
      'Distributed teams lose informal signals about burnout. Culture Pulse sends lightweight prompts, anonymizes sentiment, and highlights teams that need intervention before attrition spikes.',
    category: 'Tech',
    tags: ['hr-tech', 'remote'],
    image_url: 'https://picsum.photos/seed/culturepulse/800/500',
    estimated_budget: '$12,000 – $35,000',
    target_audience: 'People ops at remote-first companies',
    problem_statement: 'Managers lack early warning on distributed team burnout.',
    proposed_solution: 'Privacy-preserving morale analytics with suggested playbooks.',
    likes: 33,
    comment_count: 4,
    created_at: '2026-05-10T17:30:00Z',
    updated_at: '2026-05-10T17:30:00Z',
  },
  {
    id: '9',
    user_id: 'u9',
    author_name: 'Carmen Silva',
    author_image: 'https://i.pravatar.cc/100?u=carmen',
    title: 'Micro-Grant Matcher for Student Founders',
    short_description: 'Matches student startups with small grants and campus mentors.',
    detailed_description:
      'Student founders miss micro-grants buried across university portals. The matcher aggregates opportunities, auto-fills applications, and pairs teams with alumni mentors by industry fit.',
    category: 'Education',
    tags: ['funding', 'students'],
    image_url: 'https://picsum.photos/seed/microgrant/800/500',
    estimated_budget: '$5,000 – $15,000',
    target_audience: 'University entrepreneurship centers',
    problem_statement: 'Grant discovery is fragmented for student teams.',
    proposed_solution: 'Centralized grant feed with mentor matching.',
    likes: 28,
    comment_count: 3,
    created_at: '2026-05-08T10:45:00Z',
    updated_at: '2026-05-08T10:45:00Z',
  },
]

export const MOCK_COMMENTS = {
  '1': [
    {
      id: 'c1',
      user_id: 'u10',
      user_name: 'Ava Nguyen',
      text: 'Consider adding industry-specific question banks — that would differentiate you from generic chatbots.',
      created_at: '2026-05-29T09:00:00Z',
    },
    {
      id: 'c2',
      user_id: 'u11',
      user_name: 'Ben Okonkwo',
      text: 'How would you validate willingness to pay before building the full coaching engine?',
      created_at: '2026-05-29T11:30:00Z',
    },
  ],
  '2': [
    {
      id: 'c3',
      user_id: 'u12',
      user_name: 'Carmen Silva',
      text: 'Partnering with clinics early could help with trust and adherence data.',
      created_at: '2026-05-26T08:15:00Z',
    },
  ],
}

export function getIdeaById(id) {
  return MOCK_IDEAS.find((idea) => idea.id === id)
}

export function getTrendingIdeas(limit = 6) {
  return [...MOCK_IDEAS].sort((a, b) => b.likes - a.likes).slice(0, limit)
}
