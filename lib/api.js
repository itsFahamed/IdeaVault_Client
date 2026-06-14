const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

async function getAuthHeaders() {
  if (typeof window === 'undefined') return {}
  try {
    let token = localStorage.getItem('ideavault_token')
    if (!token) {
      const res = await fetch('/api/auth/token')
      if (res.ok) {
        const data = await res.json()
        if (data.jwt) {
          token = data.jwt
          localStorage.setItem('ideavault_token', token)
        }
      }
    }
    if (token) {
      return { Authorization: `Bearer ${token}` }
    }
  } catch (err) {
    console.error('Error getting auth headers:', err)
  }
  return {}
}


export async function apiFetch(path, options = {}) {
  const authHeaders = await getAuthHeaders()
  const headers = {
    'Content-Type': 'application/json',
    ...authHeaders,
    ...options.headers,
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    data = null
  }

  return { res, data }
}

export async function getTrendingIdeas() {
  const { res, data } = await apiFetch('/ideas/trending')
  if (!res.ok) throw new Error(data?.error || 'Failed to load trending ideas')
  return data.ideas || []
}

export async function getIdeas(params = {}) {
  const query = new URLSearchParams()
  if (params.search) query.set('search', params.search)
  if (params.category) query.set('category', params.category)
  if (params.from) query.set('from', params.from)
  if (params.to) query.set('to', params.to)
  const qs = query.toString()
  const { res, data } = await apiFetch(`/ideas${qs ? `?${qs}` : ''}`)
  if (!res.ok) throw new Error(data?.error || 'Failed to load ideas')
  return data.ideas || []
}

export async function getIdeaById(id) {
  const { res, data } = await apiFetch(`/ideas/${id}`)
  if (!res.ok) throw new Error(data?.error || 'Failed to load idea')
  return data
}

export async function createIdea(payload) {
  const { res, data } = await apiFetch('/ideas', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(data?.error || 'Failed to create idea')
  return data.idea
}

export async function getMyIdeas() {
  const { res, data } = await apiFetch('/my-ideas')
  if (!res.ok) throw new Error(data?.error || 'Failed to load your ideas')
  return data.ideas || []
}

export async function updateIdea(id, payload) {
  const { res, data } = await apiFetch(`/ideas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(data?.error || 'Failed to update idea')
  return data.idea
}

export async function deleteIdea(id) {
  const { res, data } = await apiFetch(`/ideas/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(data?.error || 'Failed to delete idea')
  return data
}

export async function createComment(idea_id, comment_text) {
  const { res, data } = await apiFetch('/comments', {
    method: 'POST',
    body: JSON.stringify({ idea_id, comment_text }),
  })
  if (!res.ok) throw new Error(data?.error || 'Failed to add comment')
  return data.comment
}

export async function updateComment(id, comment_text) {
  const { res, data } = await apiFetch(`/comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ comment_text }),
  })
  if (!res.ok) throw new Error(data?.error || 'Failed to update comment')
  return data.comment
}

export async function deleteComment(id) {
  const { res, data } = await apiFetch(`/comments/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(data?.error || 'Failed to delete comment')
  return data
}

export async function getMyInteractions() {
  const { res, data } = await apiFetch('/my-interactions')
  if (!res.ok) throw new Error(data?.error || 'Failed to load interactions')
  return data.interactions || []
}
