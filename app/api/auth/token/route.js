import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(request) {
  const session = await auth.api.getSession({ headers: request.headers })

  if (!session?.user || !session?.session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const jwtToken = jwt.sign(
    {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
    },
    process.env.JWT_SECRET || 'qR3fG8jK2mL5nP9sT4vW7xZ1yC6vB3nN',
    { expiresIn: '7d' }
  )

  return NextResponse.json({
    jwt: jwtToken,
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    },
  })
}

